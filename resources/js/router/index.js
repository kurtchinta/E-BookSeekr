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
    path: '/home', // Define the path for the Auth page
    component: Home,
    meta: { title: 'Home | E-BookSeekr' }, // Set a title for the Auth page
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
    path: '/profile', // Define the path for the Auth page
    component: Profile,
    meta: { title: 'Profile | E-BookSeekr' }, // Set a title for the Auth page
  },
  {
    path: '/about',
    component: About,
    meta: { title: 'About | E-BookSeekr' },
  },
];

const router = createRouter({
  history: createWebHistory(), // Using history mode for clean URLs
  routes,
});

// Set document title based on route meta
router.beforeEach((to) => {
  document.title = to.meta.title || 'E-LibraryHub'; // Fallback to default title
});

export default router;
