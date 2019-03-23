<template lang='pug'>
-
  let liblist = `Arnold Schwartzinager
  Hawaii
  Reginold
  grapes
  86 years
  Arnold Schwartzinager
  Jenkies
  meatloaf
  explosives
  baked alaska
  Reginold
  swiftly
  Beatles Concert
  Arnold Schwartzinager
  meat loaf
  squats
  jiggly
  pickled
  Mother-in-law's
  left nostril
  desimated
  squished
  meat loaf
  excommunicated
  sun roof
  Oh fiddle
  grapes
  pogo stick
  fat
  Arnold Schwartzinager
  disparingly
  laugh`.split('\n')
  function* libgen(){
    for(let i = 0; i < liblist.length; i++){
      yield liblist[i]
    }
  }
  var lib = libgen()
mixin nextlib
  .lib=lib.next().value
.red.madlibz.box
  slideshow
    span #[+nextlib] and #[+nextlib] were #[+nextlib] down the hallways of a haunted house.
    span They heard this place was haunted by a #[+nextlib]-#[+nextlib] monster.
    span They were hoping that it wouldn't #[+nextlib] out of the #[+nextlib].
    span Suddenly, they heard a #[+nextlib] noise, so they #[+nextlib] out of the room as #[+nextlib] as possible.
    span The noise got #[+nextlib] and #[+nextlib], and the door burst open, revealing the #[+nextlib] #[+nextlib] and their assistant.
    span She said that the only thing that could defeat the monster was a #[+nextlib].
    span They questioned the #[+nextlib] #[+nextlib], but the #[+nextlib] promptly showed off their skills from their Ph.D. in #[+nextlib].
    span Upon finding the #[+nextlib], they used #[+nextlib], #[+nextlib], and #[+nextlib] to build a trap.
    span Just then, the assistant #[+nextlib] into the room, and yelled "We need to hide, the #[+nextlib] monster is coming!"
    span When they hid, they heard the trap go off and #[+nextlib] out of their hiding places with the #[+nextlib] in their hands.
    span But, to their surprise, the monster was just #[+nextlib] all along.
    span THE END
</template>

<script>
import slideshow from '@/components/slideshow'
// import redlibz from '@/madlibz/red'
export default {
  name: 'redmadlibs',
  data () {
    return {
      // redlibz
    }
  },
  components: {slideshow}
}
</script>

<style>
.red .lib{
  font-family: 'Permanent Marker', cursive;
  color: red;
  text-decoration: underline;
  display: inline-block;
}
.slideshow span{
  font-size: 4em;
}
.madlibz.box{
  width:80%;
  margin: 60px auto;
}
@media screen and (min-height: 4in) {
  .slideshow span{
    font-size: 3em;
  }
}
</style>
