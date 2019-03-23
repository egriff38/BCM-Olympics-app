<template lang='pug'>
#donations
  progress.progress(:value='tweenedValue',:title='money',:max='max')
  .tick(:style='style', :class='{isCenter}') {{money}}
</template>

<script>
import {round} from 'lodash'
import { TweenLite } from 'gsap'
export default {
  created () {
    this.$on('setDonations', this.setDonations)
  },
  data () {
    return {
      max: 2500,
      tweenedValue: 0
    }
  },
  props: ['value'],
  methods: {
    setDonations (value) {
      this.value = value
    }
  },
  computed: {
    style () {
      return {
        '--value': Math.min(this.tweenedValue / this.max * 100, 100) + '%'
      }
    },
    money () {
      return '$' + round(this.tweenedValue, 2)
    },
    isCenter () {
      return this.tweenedValue > 2300
    }
  },
  watch: {
    value (newVal) {
      TweenLite.to(this.$data, 0.5, { tweenedValue: newVal })
    }
  }
}
</script>

<style>
#donations{
  --value: 0;
  display: block;
  position: absolute;
  margin-top: 5em;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 90%;
  z-index: 3;
}
.isScreen #donations{
  margin-top: 87vh;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 90%;
  z-index: 3;
}
#donations .tick{
  display: block;
  position: absolute;
  padding-top:1rem;
  border-left: 1px solid black;
  left:var(--value);
  font-size:.7em;
  z-index: 5;
  top:0rem;
}
.isScreen #donations .tick.isCenter {
  left: 50%;
  transform: translateX(-50%);
  border-left: none;
}
.isScreen #donations .tick{
  padding-top:1rem;
  padding-bottom: 1rem;
  font-size:2rem;
  border-left:none;
}
#donations progress{
  width: 100%;
  background: white;
}
#donations progress::-moz-progress-bar{
  background: greenyellow;
}
#donations progress::-webkit-progress-value{
  background: greenyellow;
}
.isScreen #donations progress::-moz-progress-bar{
  border-right: 1px solid black;
}
.isScreen #donations progress::-webkit-progress-value{
  border-right: 1px solid black;
}
.isScreen #donations progress{
  height: 5rem;
  border: 1px solid black;
}
</style>
