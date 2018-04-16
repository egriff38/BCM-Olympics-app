<template lang="pug">
div
  #home.card(:class='{isScreen:$root.isScreen}')
    .card-header: .title Welcome!
    .card-content
      p.
        Welcome to the first ever Kennesaw State University #[em BCM Olympics!] We, the actors, will be participating in several events this evening for your entertainment. We encourage you to enjoy yourself!!!
</template>

<script>

export default {
  name: 'HomePage',
  created () {
    this.$root.socket.emit('refresh')
  }
}
</script>

<style>
#home{
  display: inline-block;
  width:80%;
  margin: 40px auto;
}
#home.isScreen {
  font-size:3em;
}
</style>
