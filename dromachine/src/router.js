import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages/SimpleRound.vue'),
        },
        {
            path: '/random',
            component: () => import('./pages/Random.vue'),
        },
        {
            path: '/SoundsAndSubdivision',
            component: () => import('./pages/SoundsAndSubdivision.vue'),
        },
        // {
        //     path: '/',
        //     component: () => import('./pages/Home.vue'),
        // },
    ],
})

