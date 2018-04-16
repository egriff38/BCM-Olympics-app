<template lang="pug">
.timer(:color="color", :style='analogTimeCSS')
</template>

<script>
import {TweenLite} from 'gsap'
export default {
  name: 'Timer',
  props: ['time', 'timeElapsed', 'color'],
  data () {
    return {
      tweenedTime: 0
    }
  },
  computed: {
    analogTimeCSS () {
      let timeElapsed = Number(this.tweenedTime)
      let time = Math.floor(Number(this.time))
      let style = {}
      if (timeElapsed < time / 2) style['--bgColor'] = '#FFF'
      else style['--bgColor'] = 'var(--color)'

      if (timeElapsed === 0) style['--color'] = '#FFF'
      let turns = (2 * timeElapsed % time) / (time * 2)
      if (time === timeElapsed) turns = 0.5
      style['--turns'] = turns + 'turn'

      return style
    }
  },
  watch: {
    timeElapsed (newVal) {
      TweenLite.to(this.$data, 0.5, { tweenedTime: newVal })
    }
  }
}
</script>

<style scoped>
.timer[color="red"]{
  --color:rgb(255, 70, 70);
  border-color: rgb(179, 69, 69)
}
.timer[color="blue"]{
  --color:rgb(70, 70, 255);
  border-color: rgb(25, 25, 112);
}

.timer{
    transition: --color 0.2s linear;
    --time:2s;
    width: 50vmin;
    height: 50vmin;
    border-radius: 50%;
    border: 6px solid;
    margin: 50px auto;
    background-image: linear-gradient(to right, white 50%, var(--color) 0);
    transition: border 0.2s linear;
}
@keyframes spin {
  to { transform: rotate(var(--spin)); }
}

@keyframes bg {
  0%  { background: var(--color);}
  50% { background: #FFF; }
}

.timer::before {
  content: '';
  display: block;
  margin-left: 50%;
  height: 100%;
  border-radius: 0 100% 100% 0 / 50%;
  background-color: var(--bgColor,yellow);
  transform-origin: left;
  transform: rotate(var(--turns,0.3turn));
  animation-direction: var(--direction);
}
</style>
