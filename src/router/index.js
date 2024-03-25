import { createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/design/index.vue'
const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    // {
    //     path: '/render',
    //     name: 'render',
    //     component:() =>import('@/views/render')
    // },
    {
        path: '/test',
        name: 'test',
        component:() =>import('@/views/Tool/Test.vue')
    },
    {
        path: '/com',
        name: 'com',
        component:() =>import('@/views/Tool/allComponent.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
});

export default router;
