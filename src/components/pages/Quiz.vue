<template lang="pug">
  div#Quiz
    .adminPanel.box(v-if='this.$root.isAdmin')
        .columns
            .column: input(type="number", v-model.number='bluePoints')
            .column: input(type="number", v-model.number='redPoints')
    #question.card
        .card-header: p Question number {{questionNo}}
        .card-content
            p.title {{question}}
    #answers.columns.is-2
        .column.card
            .card-content: p.title {{answer1}}
            .card-footer: button.vote.button.is-warning Vote!
        .column.card
            .card-content: p.title {{answer2}}
            .card-footer: button.vote.button.is-warning Vote!
    #results.columns
        .column: progress.progress.is-red.flip(:value='blueTweenPoints', :max='maxPoints')
        .column: progress.progress.is-blue(:value='redTweenPoints', :max='maxPoints')
</template>

<script>
import {TweenLite} from 'gsap'
export default {
  name: 'Quiz',
  data () {
    return {
      question: 'What\'s your favorite color?',
      answer1: 'red',
      answer2: 'blue',
      questionNo: 0,
      redPoints: 40,
      redTweenPoints: 40,
      bluePoints: 60,
      blueTweenPoints: 60
    }
  },
  computed: {
    maxPoints () {
      return this.redTweenPoints + this.blueTweenPoints
    }
  },
  watch: {
    redPoints (newVal) {
      TweenLite.to(this.$data, 0.5, { redTweenPoints: newVal })
    },
    bluePoints (newVal) {
      TweenLite.to(this.$data, 0.5, { blueTweenPoints: newVal })
    }
  }
}
</script>

<style scoped>
    #Quiz{
        width: 600px;
        margin: 0 auto;
    }
    #answers{
        margin-top:15px;
    }
    .card-header{
        background: #FDAB4D;
        text-align: center;
        font-size: 1.5rem;
    }
    .card-header p{
        margin: 0 auto;
    }
    .card-content{
        background: white;
    }
    #answers .column:first-of-type{
        margin-right: 30px;
    }
    #answers .vote{
        margin: 20px auto;
    }
    #answers .card{
        background: white;
        border: 3px solid #FDAB4D;
    }
    .flip{
        transform: rotateY(180deg);
    }
    .is-blue::-moz-progress-bar{
        background: blue;
    }
    .is-blue::-webkit-progress-value{
        background: blue;
    }
    .is-red::-moz-progress-bar{
        background: red;
    }
    .is-red::-webkit-progress-value{
        background: red;
    }
    progress{
        border: 1px solid darkgray;
    }
</style>
