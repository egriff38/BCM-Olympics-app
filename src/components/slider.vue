<template lang='pug'>
  .slider-container.box
    .title {{sliderVal}}
    .guide
    .box.slider(ref='votingBooth') Drag Me
</template>

<script>
import Draggable from 'gsap/Draggable'
export default {
  name: 'slider',
  data () {
    return {sliderVal: 0}
  },
  mounted () {
    let self = this
    Draggable.create('.slider', {
      type: 'x',
      edgeResistance: 1,
      bounds: '.slider-container',
      throwProps: true,
      onDrag (e) {
        self.sliderVal = Math.round(this.x / 100)
      }
    })
  },
  watch: {
    sliderVal (newVal) {
      this.$emit('valueChange', newVal)
    }
  }
}
</script>

<style scoped>
.slider-container{
  width: 600px;
  height:10em;
}
.guide{
  position: static;
  width:100%;
  height:0;
  border: 1px solid black;
}
.slider{
  width:60px;
  height:60px;
  font-size: 1em;
  margin-top: -30px;
  text-align: center;
  z-index: 5;
  padding: 0;
}
</style>
