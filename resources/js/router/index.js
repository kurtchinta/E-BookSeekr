import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Explorepage from '@/views/Explorepage.vue';
import Community from '@/views/Community.vue';
import About from '@/views/About.vue';

const routes = [
  { path: '/', 
    component: Home,
    meta: {title: 'Welcome to E-LibraryHub!'}
  },
  { path: '/', 
    component: Home,
    meta: {title: 'Home | E-LibraryHub'}
  },               
  { path: '/explore',
     component: Explorepage,
     meta: {title: 'Explore | E-LibraryHub'}
    }, 
  { path: '/community',
    component: Community,
    meta: {title: 'Community | E-LibraryHub'}
   }, 
  { path: '/about',
    component: About,
    meta: {title: 'About | E-LibraryHub'}
   }, 
];

const router = createRouter({
  history: createWebHistory(),  // Using history mode for clean URLs
  routes,
});

export default router;

