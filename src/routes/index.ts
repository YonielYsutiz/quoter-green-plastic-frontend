import { createRouter, createWebHistory } from 'vue-router';
import order from '../components/order.vue';
import orderlist from '../components/orderlist.vue';

const routes = [   
    {path: '/quoter', component: order},
    {path: '/quoter/orderlist', component: orderlist},
]

const router = createRouter({
     history: createWebHistory(),
     routes,
})

export default router;