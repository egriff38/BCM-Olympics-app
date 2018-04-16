<template lang='pug'>
  div#vote
    .box(v-if='$root.isAdmin')
      div(v-for='(value,key,index) in votes')
        span {{key}}
        input.input(:ref='key', :value='value' @keyup.enter='votes[key] = $event.target.value')
      button.button(@click='togglePoll') {{pollRunning?'End':'Start'}}
      button.button(@click='submit("red")') submit Red
      button.button(@click='submit("blue")') submit Blue
    #slider.box(v-else-if='pollRunning && !$root.isScreen && !voted')
      p Drag the slider to the score you want, then press vote!
      slider(@valueChange='value = $event')
      button.button(@click='vote()') Vote!
    .box(v-else-if='pollRunning && !$root.isScreen && voted') Thanks for voting!
    .box(v-else-if='$root.isScreen')
      .title Voting Time!
      .subtitle Give that act a score on a scale from 0 to 5

</template>

<script>
import slider from '@/components/slider'
export default {
  name: 'vote',
  mounted () {
    this.$root.socket.on('voteResultsUpdate', (votes) => { this.votes = votes })
    if (!this.$root.isAdmin) {
      this.$root.socket.on('votesOpened', () => {
        this.pollRunning = true
        this.voted = false
      })
      this.$root.socket.on('votesClosed', () => {
        this.pollRunning = false
        this.voted = false
      })
    }
  },
  data () {
    return {
      value: 0,
      pollRunning: false,
      voted: false,
      votes: {}
    }
  },
  methods: {
    togglePoll () {
      if (this.pollRunning) {
        this.$root.socket.emit('closeVote')
        this.pollRunning = false
      } else {
        this.$root.socket.emit('startVote')
        this.pollRunning = true
      }
    },
    vote () {
      this.$root.socket.emit('vote', this.value)
      this.voted = true
    },
    submit (color) {
      let value = Object.values(this.votes).reduce((p, n) => p + Number(n), 0)
      this.$root.socket.emit('setScore', [3, color, value])
      this.votes = {}
    }
  },
  components: {slider}
}
</script>

<style scoped>
#box{
  width:400px;
  height:400px;
}
.box{
  width:500px;
  margin: 2em auto;
}
#vote .input{
  width:80px;
}
#slider {
  width:800px;
}
.slider {
  width:40px;
  height: 40px;
  background: blue;
  position: absolute;
}
</style>
