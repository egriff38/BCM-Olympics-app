<template lang='pug'>
modal#Roster(popupID='Roster')
    .card
        .card-header: .is-bold Team Rosters
        .card-content: .columns
            .column.is-one-third(name="list")
                .box: aside.menu
                    p.menu-label Red Team
                    ul.menu-list
                        li(v-for='(player,index) in red'): a(@click='$data.player=player') {{player.Name}}
                    p.menu-label Blue Team
                    ul.menu-list
                        li(v-for='(player,index) in blue'): a(@click='$data.player=player') {{player.Name}}
                    p.menu-label Directors & Crew
                    ul.menu-list
                        li(v-for='(player,index) in staff'): a(@click='$data.player=player') {{player.Name}}
            .column(name="description")
                .box(v-if='player!=null')
                    .is-2.is-bold {{player.Name}} · {{player.Role}} · {{player.Source}}
                    p(v-if='player.description' v-html="md(player.description)")
                    stats-panel(:stats='player.Stats')
                .box.instructions(v-else)
                    p Tap or scroll through the Olympians on the left to learn more about them in the show
                    img(src='/static/rings.png')
</template>

<script>
import roster from '@/roster'
import stats from '@/components/statsPanel'
import modal from '@/components/modal'
import md from '@/js-utils/md'

let {red, blue, staff} = roster

export default {
  name: 'roster',
  data () {
    return {red, blue, staff, player: null}
  },
  methods: {
    hide () {
      this.$emit('setPopup', 'none')
      this.player = null
    },
    md
  },
  components: {
    'stats-panel': stats,
    modal
  }
}
</script>

<style scope>
.modal-content{
    width: 800px;
}
#Roster>.modal-content>.box{
    height:500px;
    overflow-y: auto;
}
#Roster .columns{
    overflow: auto;
}
#Roster .column .box{
    overflow-y: scroll;
    height:450px;
}
.column[name='description'] .box{
    background: #ABE7FD;
}
.is-bold{
    font-weight: bold;
}
#Roster .card-header .is-bold{
    font-size: 1.5em;
    margin: 5px auto;
}
#Roster .box.instructions{
    background-color: white;
}
#Roster .box.instructions img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>
