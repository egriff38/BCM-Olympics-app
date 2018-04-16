<template lang='pug'>
.modal.is-active(v-if="$parent.$parent.$data.popup===popupID",:id='id')
  .modal-background(@click='hide()')
  .modal-content: slot modal content
  button.modal-close.is-large(aria-label="close" @click='hide()')
</template>

<script>
export default {
  name: 'modal',
  props: ['popupID', 'id'],
  methods: {
    hide (num) {
      setTimeout(() => {
        this.$parent.$parent.$data.popup = 'none'
      }, num * 1000)
    },
    show () {
      this.$parent.$parent.$data.popup = this.popupID
    }
  }
}
</script>

<style>

</style>
