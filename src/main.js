// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
let markdown = require('markdown-it')()
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  socket: {on: console.log, emit: console.log},
  data: {
    roster: []
  },
  beforeCreate () {
    this.socket = window.io('0.tcp.ngrok.io:12906', {origins: '*'})
  },
  created () {
    let self = this
    console.log(this.socket)
    this.socket.on('roster', function (data) {
      self.roster = data.roster
    })
  },
  mounted () {
    if (window.sessionStorage.name) this.socket.emit('name', {name: sessionStorage.name})
  },
  methods: {
    md (text) {
      return markdown.render(text)
    }
  },
  computed: {
    isAdmin () {
      return this.name === 'admin'
    },
    isScreen () {
      return this.name === 'screen'
    },
    name () {
      return this.roster[this.socket.id]
    }
  },
  watch: {
    name (newval) {
      window.sessionStorage.name = newval
    }
  }
})
