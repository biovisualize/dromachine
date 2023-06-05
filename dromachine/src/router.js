import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages/SimpleRound.vue'),
        },
        // {
        //     path: '/',
        //     component: () => import('./pages/Home.vue'),
        // },
    ],
})

