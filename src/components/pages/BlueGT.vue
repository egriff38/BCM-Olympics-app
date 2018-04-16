<template lang='pug'>
#btgt.box
  slideShow
    span Trashin the Camp Sing Along
    span Shooby doop dobby dop dobby doop dobby dah dah doo dap
    span Shooby doop dobby dop dobby doop dobby dah dah dobby op
    span Shooby doop dobby dop dobby doop dobby dah dah doo dap
    span Do bop she doo whoo
    span Shooby doop dobby dop dobby doop dobby dah dah doo dap
    span Shooby doop dobby dop dobby doop dobby dah dah dobby op
    span Shooby doop dobby dop dobby doop dobby dah dah doo dap
    span Do bop she doo whoo
    div
      span.dancing -instrumental-
    span Shooby doop dobby dop dobby doop dobby dah dah doo dap
    span Shooby doop dobby dop dobby doop dobby dah dah dobby op
    span Shooby doop dobby dop dobby doop dobby dah dah doo dap
    span Do bop she doo whoo
    span Do bop she doo (x3)
    span WHOO!

</template>

<script>
import slideShow from '@/components/slideshow'
export default {
  name: 'blueGT',

  components: {slideShow}
}
</script>

<style scoped>
.box {
  width:80%;
  margin: 80px auto;
  min-height: 20em;
}
.slideshow span{
  font-family: 'Domine', serif;
  font-size: 5.5em
}
</style>
