<template lang='pug'>
.stats(v-if='stats')
    .stat(v-for='(stat,index) in stats')
        label.label {{stat.name}}
        progress.progress(:value='$data[index]', :max='stat.max', :label='stat.name')
</template>

<script>
import { TweenLite } from 'gsap'
import {map} from 'lodash'

export default {
  name: 'stats-panel',
  mounted () {
    TweenLite.to(this.$data, 0.5, map(this.$props.stats, 'value'))
  },
  data () {
    return Object.assign({}, new Array(5).fill(0))
  },
  props: ['stats'],
  watch: {
    stats () {
      TweenLite.to(this.$data, 0.5, map(this.$props.stats, 'value'))
    }
  }
}
</script>

<style>
.progress[label='Moustache']::-moz-progress-bar{
  background: linear-gradient(to right, red 33%,white 33%, white 66%, green 66%)
}
.progress[label='Moustache']::-webkit-progress-value{
  background: linear-gradient(to right, red 33%,white 33%, white 66%, green 66%)
}
</style>
