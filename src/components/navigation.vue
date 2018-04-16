<template lang="pug">
div(:class="{isScreen:$root.isScreen}")
    nav.navbar
        .navbar-brand
            img.logo(src="@/assets/olympics.png")
        .navbar-menu
            .navbar-start(v-if="this.$root.isAdmin")
                .navbar-item: .dropdown.is-hoverable()
                    .dropdown-trigger: button.button(@click='navIsActive ^= true') Select an event  #[i.fas.fa-caret-down]
                    .dropdown-menu#nav-dropdown(role='menu'): .dropdown-content
                        .dropdown-item: a(@click='page="/"') Home
                        .dropdown-item: a(@click='page="/table"') reset tables
                        .dropdown-divider
                        .dropdown-item: a(@click='page="/madlibs/red"') Red Team madlibs
                        .dropdown-item: a(@click='page="/madlibs/blue"') Blue Team madlibs
                        .dropdown-item: a(@click='page="/timer"') Half-life
                        .dropdown-divider
                        .dropdown-item: a(@click='page="/vote"') Vote
                        .dropdown-item: a(@click='page="/grouptalent/red"') Red Group Talent
                        .dropdown-item: a(@click='page="/grouptalent/blue"') Blue Group Talent
                        //- .dropdown-item: a(@click='page="/quiz"') Quiz game
                .navbar-item: a(@click='popup="scoreboard"') Score
                .navbar-item
                    input.input(@keyup.enter='submitDonation',ref='donationsInput', placeholder="Donation", )
                    a(@click='undoDonation()'): i.fas.fa-undo.has-text-warning
            .navbar-start(v-else)
                score(:activator='setPopup.bind(this)', :events='get($refs, "scoreboard.events", [])')
            .navbar-end
                .navbar-item: .button.is-sin(@click='popup="Roster"') View Olympians
                .navbar-item: .button.is-success(@click='popup="SMN"') View SendMeNow Missionaries
                .navbar-item: .button.is-primary(@click='requestToDonate()', :class='{"is-loading":pendingDonation}') Donate
    missionaries
    roster
    donations(ref='donations', :value='donations')
    adminScore(ref='scoreboard')
</template>

<script>
import roster from '@/components/modals/roster'
import score from '@/components/score'
import missionaries from '@/components/modals/missionaries'
import donations from '@/components/donations'
import adminScore from '@/components/modals/adminScore'
import get from 'lodash/get'
export default {
  name: 'navigation',
  mounted () {
    let self = this
    this.$root.socket.on('pageUpdate', function pageUpdate (data) {
      self.page = data.page
    })
    this.$root.socket.on('donationsUpdate', (value) => { this.donations = value })
    this.$root.socket.on('releaseDonation', () => { this.pendingDonation = false })
    this.$on('setPopup', function (popup) {
      self.popup = popup
      console.log('popup')
    })
    
  },
  data () {
    return {
      navIsActive: false,
      page: '/',
      popup: 'none',
      donations: 0,
      pendingDonation: false
    }
  },
  methods: {
    setPopup (popup) {
      this.popup = popup
    },
    get,
    submitDonation (e) {
      let value = Number(e.target.value)
      this.$root.socket.emit('pushDonation', value)
      e.target.value = ''
    },
    undoDonation () {
      this.$root.socket.emit('popDonation', {})
      this.$refs.donationsInput.focus()
    },
    requestToDonate () {
      this.$root.socket.emit('requestToDonate')
      this.pendingDonation = true
    }
  },
  watch: {
    page (newPage) {
      if (this.$root.isAdmin) this.$root.socket.emit('setPage', {page: newPage})
      this.$router.push(newPage)
    }
  },
  components: {roster, missionaries, score, donations, adminScore}
}
</script>

<style scoped>
nav{
    position: absolute;
    width:90%;
    left:5%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 1em;
    padding-top: 1em;
    margin-bottom: 40px;
    box-shadow: 0 5px 5px lightgray;
    z-index: 10;
    box-shadow: none;
}
@media screen and (max-device-width: 799px) {
    nav .navbar-brand{
        display:none
    }
}
.is-sin{
    background: #FFAC1D;
    color: white;
}
.logo{
    margin-top:10px;
    height:2em;
    width:auto;
}
.fa-undo{
    margin-left: 1em;
    cursor: pointer;
}

.isScreen nav{
    display: none;
}
</style>
