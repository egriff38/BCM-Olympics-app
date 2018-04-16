<template lang='pug'>
div
  .box.admin(v-if='$root.isAdmin')
    a.button(@click='back()') back
    a.button(@click='next()') next
  .slideshow(:id='id', @keyup.right='back()', @keyup.left='next()', ref='slideshow')
    slot
</template>

<script>
export default {
  name: 'slideshow',
  data () {
    return {
      slideCount: 0,
      currentSlide: 0,
      slides: null
    }
  },
  mounted () {
    this.slides = this.$refs.slideshow.children
    this.slideCount = Number(this.$refs.slideshow.childElementCount)
    this.slides[0].style.display = 'inline'
    if (this.$root.isAdmin) this.$root.socket.emit('setSlideshow', 0)
    this.$root.socket.on('slideshowUpdate', (val) => { this.currentSlide = val })
  },
  props: ['id'],
  methods: {
    back () {
      this.currentSlide = (this.currentSlide - 1) % this.slideCount
    },
    next () {
      this.currentSlide = (this.currentSlide + 1) % this.slideCount
    }
  },
  watch: {
    currentSlide (newVal, oldVal) {
      if (this.$root.isAdmin) this.$root.socket.emit('setSlideshow', newVal)
      this.slides[oldVal].style.display = ''
      this.slides[newVal].style.display = 'block'
    }
  },
  beforeDestroyed () {
    if (this.$root.isAdmin) this.$root.socket.emit('setSlideshow', 0)
  }
}
</script>

<style>
.slideshow>*{
  display: none;
}
</style>
