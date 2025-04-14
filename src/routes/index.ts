import { createRouter, createWebHistory } from 'vue-router';

import orderCopia from '../components/orderCopia.vue';
import orderOriginal from '../components/orderOriginal.vue';
// import stepper from '../components/stepper.vue';
import orderlist from '../components/orderlist.vue';

const routes = [   
    {path: '/quoter', component: orderCopia},
    // {path: '/quoter', component: stepper},
    {path: '/quoter/orderlist', component: orderlist},
]

const router = createRouter({
     history: createWebHistory(),
     routes,
})

export default router;