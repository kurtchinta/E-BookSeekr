import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import Auth from '@/views/Auth.vue'; 
import Home from '@/views/Home.vue'; 
import Explorepage from '@/views/Explorepage.vue';
import Favorites  from '@/views/Favorites.vue';
import Profile  from '@/views/Profile.vue';
import About from '@/views/About.vue';


const routes = [
  {
    path: '/',
    component: LandingPage,
    meta: { title: 'Welcome to E-BookSeekr!' },
  },
  {
    path: '/auth', 
    component: Auth,
    meta: { title: 'Sign in/Sign up | E-BookSeekr' },
  },
  {
    path: '/home', 
    component: Home,
    meta: { title: 'Home | E-BookSeekr' },
  },
  {
    path: '/explore',
    component: Explorepage,
    meta: { title: 'Explore | E-BookSeekr' },
  },
  {
    path: '/favorites',
    component: Favorites,
    meta: { title: 'Favorites | E-BookSeekr' },
  },
  {
    path: '/profile', 
    component: Profile,
    meta: { title: 'Profile | E-BookSeekr' }, 
  },
  {
    path: '/about',
    component: About,
    meta: { title: 'About | E-BookSeekr' },
  },
  {
    path: '/404',
    component: About,
    meta: { title: '404 Not Found | E-BookSeekr' },
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});


router.beforeEach((to) => {
  document.title = to.meta.title || 'E-BookSeekr'; 
});

export default router;
