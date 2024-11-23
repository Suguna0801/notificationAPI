import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Notification from '../views/Notification.vue';
import './assets/main.css'; 

const routes = [
    
    { path: '/notifications', name: 'Notifications', component: Notification },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
