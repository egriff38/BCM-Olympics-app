<template lang='pug'>
-
  let liblist = `Caterpillar
  toaster strudel
  bounces
  salad
  weasel
  uvula
  smells
  Guy Fieri
  oven
  NOOOOOO
  rainbow
  goat
  caterpillar
  dabing
  beyond
  weasel
  obese
  somersaults
  Guy Fieri
  rainbow
  goat
  rambunctiously
  star-nosed mole
  42
  mozzarella sticks
  caterpillar
  toaster strudel
  `.split('\n')
  function* libgen(){
    for(let i = 0; i < liblist.length; i++){
      yield liblist[i]
    }
  }
  var lib = libgen()
mixin nextlib
  .lib=lib.next().value
.blue.madlibz.box
  slideshow
    span #[b.lib What a dream]
    span A teenage #[+nextlib] comes into a cake shop doing kickflips.
    span He walks to the counter and asks for #[+nextlib] flavored cakes.
    span Suddenly, from somewhere in the shadows, a robber #[+nextlib] in, carrying a #[+nextlib].
    span As if sensing the danger, a brave #[+nextlib] pops out of the cake!
    span It reaches out with its #[+nextlib] and #[+nextlib] the robber into submission.
    span But then, with a loud crash, #[+nextlib] appears out of a nearby #[+nextlib] and says "#[+nextlib]!"
    span He quickly pulls out a #[+nextlib] #[+nextlib] and rushes to the robber's aid.
    span The only thing the teenage #[+nextlib] knows to do is to start #[+nextlib] #[+nextlib] the #[+nextlib].
    span If things were not crazy enough a #[+nextlib] wizard #[+nextlib] up to #[+nextlib] and takes their #[+nextlib] #[+nextlib] and begins to laugh #[+nextlib].
    span Suddenly a #[+nextlib] rains down on the cake shop.
    span Amidst the chaos, the robber escapes with no less than #[+nextlib] #[+nextlib].
    span All of the sudden, the teenage #[+nextlib] sits up in bed quickly and says "I really have to stop eating #[+nextlib] before bed"
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
.blue .lib{
  font-family: 'Permanent Marker', cursive;
  color: blue;
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
