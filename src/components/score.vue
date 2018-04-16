<template lang='pug'>
#score
  .scoreboard
    .score {{red}}
    .score {{blue}}
    div(name='breakdown' @click='activator("breakdown")', colspan=2).is-2 View Breakdown
    modal#breakdown(popupID='breakdown')
      .card
        .card-header Score Breakdown
        .card-content
        table.table
          thead: tr
            th Event
            th Red
            th Blue
          tbody: tr(v-for='(event,index) in events')
            th {{event.name}}
            td {{event.red}}
            td {{event.blue}}
          tfoot: tr
            th Total
            td {{red}}
            td {{blue}}

</template>

<script>
import modal from '@/components/modal'
export default {
  name: 'score',
  props: ['activator', 'events'],
  computed: {
    red () {
      return this.events.reduce((p, e) => p + Number(e.red), 0)
    },
    blue () {
      return this.events.reduce((p, e) => p + Number(e.blue), 0)
    }
  },
  components: { modal }
}
</script>

<style scoped>
#breakdown .card{
  margin: 0 auto;
  width:auto;
  padding:.5em;
  font-size: 1.2em;
}
#breakdown table{
  width:100%;
}
#breakdown td:nth-of-type(1){
  background: pink;
}
#breakdown td{
  background: lightblue;
}

#score{
  width:150px;
  height:100%;
  margin-left: 1.5em;
  border: 3px solid black;
  border-radius: 5px;
  text-align: center;
}
.scoreboard{
  display: block;
}
.scoreboard tr{
  width: 100%;
}
.score{
  color: white;
  font-weight: bolder;
  width: 50%;
  text-align: center;
  display: inline-block;
}
.score:nth-child(1){
  background: red;
}
.score:nth-child(2){
  background: blue;
}
div[name='breakdown']{
  width: 100%;
  background: lightgreen;
}
</style>
