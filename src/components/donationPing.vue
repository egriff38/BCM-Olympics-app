<template lang='pug'>
.notification(v-if='tables.length>0')
  button.delete(@click='dismiss()')
  span The following tables would like to donate:
  ul
    li(v-for='table in tables') {{table}}
      button.delete(@click = 'dismiss(table)')
</template>

<script>
export default {
  name: 'donationPing',
  mounted () {
    this.$root.socket.on('updateDonationList', (tables) => { this.tables = tables })
  },
  data () {
    return {
      tables: []
    }
  },
  methods: {
    dismiss (table = null) {
      this.$root.socket.emit('releaseDonationTable', table)
    }
  }
}
</script>

<style scoped>
.notification {
  display: block;
  position: absolute;
  bottom: 1em;
  right: 1em;
  width: 400px;
  height: auto;
  padding: 0.5em;
  text-align: left;
}
li button{
  margin-left: 5px;
}
</style>
