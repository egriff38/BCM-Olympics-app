<template lang='pug'>
  #rtgt.box: slide-show
    div
    .strobe(:style='bgstyle')
    .solo
    .strobe(:style='bgstyle')
    .finish
</template>

<script>
import slideShow from '@/components/slideshow'
import random from 'lodash/random'
export default {
  name: 'redGT',
  mounted () {
    this.intervalID = setInterval(() => this.randomBackground(), 0.76 * 1000)
  },
  data () {
    return {
      scene: '',
      intervalID: '',
      bgstyle: {}
    }
  },
  methods: {
    setScene (scene) {
      this.$root.socket.emit('setRedGTScene', scene)
    },
    randomBackground () {
      this.bgstyle = {'--bgcolor': '#' + random(16777216).toString(16)}
    }
  },
  components: {slideShow}
}
</script>

<style>
#rtgt{
  width: 600px;
  margin: 30px auto;
  min-height: 20em;
  height: 500px;
}
#rtgt div:not(.admin){
  width: 100%;
  height: 100%;
}
#rtgt .slideshow>div{
  background-image: url('/static/Queen.png');
  background-color: black;
  background-size: cover;
}

#rtgt .slideshow .strobe {
  background-color: var(--bgcolor)
}
#rtgt .slideshow .solo {
  background-image: url('/static/solo.jpg')
}
#rtgt .slideshow .finish {
  background-image: url('/static/rings.png');
}
</style>
