<template lang="pug">
#app
  navigation
  .main
    router-view
  donation-ping(v-if='$root.isAdmin')
</template>

<script>
import navigation from '@/components/navigation'
import donationPing from '@/components/donationPing'
export default {
  name: 'App',
  components: {navigation, donationPing}
}
</script>

<style>
#app {
  user-select: none;
  background-color: #ABE7FD;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100vh;
  overflow-y: hidden;
}
.main{
  padding-top: 100px;
}
.dialogue{
    position:absolute;
    transform: translateX(-50%);
    left:50%;
    max-width: 400px;
}
</style>
