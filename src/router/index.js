import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Table from '@/components/pages/TableRegistry'
import Timer from '@/components/pages/TimerPage'
// import Quiz from '@/components/pages/Quiz'
import gt2 from '@/components/pages/BlueGT'
import gt1 from '@/components/pages/RedGT'
import vote from '@/components/pages/Vote'
import Redmadlibs from '@/components/pages/RedMadlibs'
import Bluemadlibs from '@/components/pages/BlueMadlibs'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/timer',
      name: 'TimerPage',
      component: Timer
    },
    {
      path: '/vote',
      name: 'Vote',
      component: vote
    },
    {
      path: '/madlibs/red',
      name: 'madlibsRed',
      component: Redmadlibs
    },
    {
      path: '/madlibs/blue',
      name: 'madlibsBlue',
      component: Bluemadlibs
    },
    {
      path: '/groupTalent/blue',
      name: 'groupTalent2',
      component: gt2
    },
    {
      path: '/groupTalent/red',
      name: 'groupTalent1',
      component: gt1
    }
    // {
    //   path: '/quiz',
    //   name: 'Quiz',
    //   component: Quiz
    // }
  ]
})
