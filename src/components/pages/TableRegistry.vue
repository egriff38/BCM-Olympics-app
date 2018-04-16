<template lang="pug">
div
  .section: .box.dialogue
    label.label Table Name
      input(type="text" class="input" name="name" placeholder="Enter Name" autocomplete="off" @keyup.enter="onSubmit")
</template>

<script>

export default {
  name: 'HelloWorld',
  methods: {
    onSubmit (e) {
      e.preventDefault()
      let nameNode = document.querySelector('input[name="name"]')
      this.$root.socket.emit('name', {name: nameNode.value})
      nameNode.value = ''
      this.$router.push('/')
    }

  }
}
</script>
