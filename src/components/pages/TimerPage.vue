<template lang="pug">
div(:class='{isScreen:$root.isScreen}')
  .title.digital-time.is-2 {{digitalTime}}
  .admin.box.columns(v-if="this.$root.isAdmin")
    .column
      input.input(:value="this.totalTime", disabled)
    .column
      button.button.is-light(@click="incrementTimer") ⬆
      button.button.is-light(@click="decrementTimer") ⬇
      button.button.is-light(@click="changeColor"): .colorIndicator(:color="color")
      button.start-button.button.is-primary( @click="toggleTimer")
        span.icon.playing(v-if='isPlaying'): i.fas.fa-pause
        span.icon(v-else): i.fas.fa-play
      button.button.is-danger(@click='endTimer'): span.icon: i.fas.fa-stop
  Timer(:time="totalTime", :timeElapsed="timeElapsed", :color="color")
</template>

<script>
import Timer from '@/components/Timer'
import padStart from 'lodash/padstart'
export default {
  name: 'TimerPage',
  created () {
    let self = this
    this.$root.socket.on('timerUpdate', function (data) {
      let totalTime = self.totalTime
      Object.assign(self.$data, data)
      if (self.$root.isAdmin) self.totalTime = totalTime
    })
    this.$root.socket.on('colorUpdate', function (data) {
      self.color = data.color
    })
  },
  data () {
    return {
      totalTime: 300,
      timeElapsed: 0,
      color: 'red',
      isPlaying: false
    }
  },
  methods: {
    startTimer () {
      this.timeElapsed = 0
      this.$root.socket.emit('setTimer', Math.floor(this.totalTime))
      this.$root.socket.emit('startTimer')
    },
    incrementTimer () {
      this.totalTime *= 2
      this.$root.socket.emit('setTimer', Math.floor(this.totalTime))
    },
    decrementTimer () {
      this.totalTime /= 2
      this.$root.socket.emit('setTimer', Math.floor(this.totalTime))
    },
    toggleTimer () {
      if (this.isPlaying) this.pauseTimer()
      else this.startTimer()
    },
    changeColor () {
      if (this.color === 'red') this.$root.socket.emit('setColor', {color: 'blue'})
      else this.$root.socket.emit('setColor', {color: 'red'})
    },
    pauseTimer () {
      this.$root.socket.emit('pauseTimer')
    },
    endTimer () {
      this.$root.socket.emit('endTimer')
    }
  },
  computed: {
    digitalTime () {
      let minutes = Math.floor((this.totalTime - this.timeElapsed) / 60)
      let seconds = (Math.floor(this.totalTime) - this.timeElapsed) % 60
      return padStart(minutes.toString(), 1, 0) +
      ':' +
      padStart(seconds.toString(), 2, 0)
    }
  },
  watch: {
  },
  components: {Timer}
}
</script>

<style scoped>
.digital-time{
  margin:20px;
}
.isScreen .digital-time{
  font-size: 4.5em;
}
.button{
  margin-right: 5px;
}
.admin.box{
  width: 600px;
  min-width:100px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.colorIndicator{
  border-radius: 50%;
  display: block;
  width:1em;
  height:1em;
  border: 1px solid black;
  transition: background 0.2s linear;
}
.colorIndicator[color="red"]{
  background: blue;
}
.colorIndicator[color="blue"]{
  background: red;
}
</style>
