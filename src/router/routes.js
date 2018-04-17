import home from '@/views/home/home'
import plan from '@/views/plan/plan'
import unit from '@/views/unit/unit'
import creative from '@/views/creative/creative'
import centre from '@/views/centre/centre'
import tool from '@/views/tool/tool'
import login from '@/views/login/login'
import createAD from '@/views/create/createAD'
import newCreative from '@/views/create/newCreative'
import newUnit from '@/views/create/newUnit'
import newPlan from '@/views/create/newPlan'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/plan',
    name: 'plan',
    component: plan
  },
  {
    path: '/unit',
    name: 'unit',
    component: unit
  },
  {
    path: '/creative',
    name: 'creative',
    component: creative
  },
  {
    path: '/create',
    name: 'create',
    component: createAD,
    children: [
      {
        name: 'newCreative',
        path: '/newCreative',
        component: newCreative
      },
      {
        name: 'newUnit',
        path: '/newUnit',
        component: newUnit
      },
      {
        name: 'newPlan',
        path: '/newPlan',
        component: newPlan
      }
    ]
  },
  {
    path: '/centre',
    name: 'centre',
    component: centre
  },
  {
    path: '/tool',
    name: 'tool',
    component: tool
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

export default routes
