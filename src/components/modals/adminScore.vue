<template lang='pug'>
modal#scoreBoard(popupID='scoreboard', ref='sbmodal')
  .card(v-if='$root.isScreen')
    .card-header: .title Scores
    .card-content
      .Teams
        .col: span Red
        .col: span Blue
      .Scores
        .col: span(:style='redBounce') {{tweenedRed}}
        .col: span(:style='blueBounce') {{tweenedBlue}}
  .card(v-else)
    .card-header Score Breakdown
    .card-content
      table.table
        thead: tr
          th Event
          th Red
          th Blue
        tbody(ref='tbody'): tr(v-for='(event,index) in events')
          th {{event.name}}
          td: input.input(:value='event.red' @keyup.enter='submit(index, "red", $event.target.value)', :data-key='"red "+index')
          td: input.input(:value='event.blue' @keyup.enter='submit(index, "blue", $event.target.value)', :data-key='"blue "+index')
        tfoot: tr
          th Total
          td {{red}}
          td {{blue}}
      button.button.is-success(@click='submitAll()') Submit
</template>

<script>
import modal from '@/components/modal'
import {TweenLite} from 'gsap'
import {clone} from 'lodash'

let TweenNumber = (tweenedVal) => function (newValue, oldValue) {
  if (!this.$root.isScreen) return
  let modal = this.$refs.sbmodal
  let self = this
  let obj = {tween: oldValue}

  modal.show()
  TweenLite.to(obj, Math.sqrt((newValue - oldValue) / 4), {tween: newValue, ease: 'power2'})
    .eventCallback('onUpdate', function () {
      self[tweenedVal] = Math.round(obj.tween)
      self[tweenedVal + 'Bounce'] = 1 + 0.2 * Math.abs(Math.sin(obj.tween * Math.PI))
    })
    .eventCallback('onComplete', function () {
      modal.hide(3)
    })
}

export default {
  name: 'adminScore',
  created () {
    this.$on('scoreUpdate', this.scoreUpdate.bind(this))
    this.$root.socket.on('scoreUpdate', (e) => this.$emit('scoreUpdate', e))
  },
  data () {
    let events = ['Audience', 'Mad Libz', 'Half-Life', 'Group Talent', 'MVP']
      .map((e) => ({name: e, red: 0, blue: 0}))
    return {
      events,
      tweenedRed: 0,
      tweenedRedBounce: 0,
      tweenedBlue: 0,
      tweenedBlueBounce: 0
    }
  },
  methods: {
    submit (...values) {
      this.$root.socket.emit('setScore', values)
    },
    scoreUpdate (events) {
      this.events = this.events.map((e, i) => Object.assign({}, e, events[i]))
    },
    submitAll () {
      let events = clone(this.events)
      let inputs = this.$refs.tbody.querySelectorAll('input').map(function (e) {
        let value = e.value
        let [color, index] = e.dataset['key'].split(' ')

        return [index, color, value]
      })
      for (let i = 0; i < inputs.length; i++) {
        let [index, color, value] = inputs[i]
        events[index][color] = value
      }
      this.$root.socket.emit('setFullScore', events)
    }
  },
  computed: {
    red () {
      return this.events.reduce((p, e) => p + Number(e.red), 0)
    },
    blue () {
      return this.events.reduce((p, e) => p + Number(e.blue), 0)
    },
    redBounce () {
      return {
        '--bounce': this.tweenedRedBounce
      }
    },
    blueBounce () {
      return {
        '--bounce': this.tweenedBlueBounce
      }
    }
  },
  watch: {
    red: TweenNumber('tweenedRed'),
    blue: TweenNumber('tweenedBlue')
  },
  components: {modal}
}
</script>

<style>
#scoreBoard td:nth-of-type(1){
  background: pink;
}
#scoreBoard td{
  background: lightblue;
}
#scoreBoard .modal-content{
  width: auto;
  border:1em solid white;
}
.isScreen #scoreBoard .modal-content {
  width: 40%;
  background: #ABE7FD;
}
.isScreen #scoreBoard .col{
  display: inline-block;
  width: 48%;
}
.isScreen #scoreBoard .col>span{
  display: inline-block;
  text-align: center;
  color: white;
  font-size: 3em;
  transform-origin: center;
  transform: scale(var(--bounce, 1))
}
.isScreen #scoreBoard .col:nth-of-type(1){
  background: red;
}
.isScreen #scoreBoard .col:nth-of-type(2){
  background: blue;
}
.isScreen #scoreBoard .card-header{
  text-align: center;
}
</style>
