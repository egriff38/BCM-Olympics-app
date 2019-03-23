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
    span #[b.lib Cooking with Mary]
    span Welcome to Mary Poppins' Poppin #[+nextlib].
    span Today's guest star is Raven, an angsty teen from Teen Titans.
    span Suddenly, Thor #[+nextlib] into the scene.
    span He had apparently received an invitation to a#[+nextlib], but took a wrong turn.
    span Mary Poppins graciously asked Thor to join them in today's show.
    span It's time for Mary and her crew to start cooking #[+nextlib] a la #[+nextlib].
    span Mary #[+nextlib] the #[+nextlib], and asks Thor to put it in the #[+nextlib].
    span Thor became impatient, so he grabs his hammer and #[+nextlib] the ingredients.
    span Raven suggests making a new meal, but Mary is determined to salvage this meal. 
    span There's a loud sound and Doc Brown #[+nextlib] through time. 
    span He present his new invention, the amazing #[+nextlib]-inator 2000. 
    span He turns it on, and, after a moment, the dish turns into a#[+nextlib]. 
    span "Oops," Doc Brown says, "I brought my #[+nextlib]-inator instead of my #[+nextlib]-inator."
    span Thor #[+nextlib] him away angrily and they both disappear offstage. 
    span Mary Poppins got so #[+nextlib] that she bellowed "#[+nextlib]," and #[+nextlib] away #[+nextlib]. 
    span The others were #[+nextlib] by her anger. They #[+nextlib] and left as well. 
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
