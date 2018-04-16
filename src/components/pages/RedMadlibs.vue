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
    span #[b.lib Kitchen Nightmares]
    span Welcome back to Kitchen Nightmares. In this episode, our host #[+nextlib] will be visiting the #[+nextlib] grill.
    span Owner #[+nextlib] believes his staff to be thieves, and as a result the staff hasn't recieved any #[+nextlib] in #[+nextlib].
    span #[+nextlib] walks in and says "#[+nextlib]!"
    span Before him was a pile of #[+nextlib], three #[+nextlib], and an unfinished #[+nextlib].
    span The Chef #[+nextlib] explains #[+nextlib] the details of yesterday's #[+nextlib] event.
    span #[+nextlib] picks up a #[+nextlib] off the floor and points it at the Chef.
    span Just then, a customer #[+nextlib] into the kitchen #[+nextlib].
    span The customer complains that the food tasted so #[+nextlib] that their #[+nextlib] #[+nextlib] #[+nextlib].
    span The Chef proudly #[+nextlib] and offers the customer a complementary #[+nextlib].
    span The customer was unhappy. "What am I supposed to do with this?"
    span The customer turned and #[+nextlib] out just as the owner appeared in the #[+nextlib].
    span "#[+nextlib]" the Chef said, approaching quickly, I need my #[+nextlib].
    span The Chef got so mad, he threw down a #[+nextlib] and quit.
    span The owner, looking #[+nextlib] turns to #[+nextlib] and offers him a job.
    span He #[+nextlib] agrees and they #[+nextlib] into the sunset.
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
