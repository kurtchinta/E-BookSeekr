import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Auth from '../views/Auth.vue'; 
import Home from '../views/Home.vue'; 
import Explorepage from '../views/Explorepage.vue';
import Favorites  from '../views/Favorites.vue';
import Profile  from '../views/Profile.vue';
import About from '../views/About.vue';


const routes = [
  {
    path: '/',
    name: "Landing Page",
    component: LandingPage,
    meta: { title: 'Welcome to E-BookSeekr!' },
  },
  {
    path: '/auth', 
    name: "Authentication",
    component: Auth,
    meta: { title: 'Sign in/Sign up | E-BookSeekr', requiresAuth: false },
  },
  {
    path: '/home', 
    name: "Home",
    component: Home,
    meta: { title: 'Home | E-BookSeekr', requiresAuth: true },
  },
  {
    path: '/explore',
    name: "Explore Page",
    component: Explorepage,
    meta: { title: 'Explore | E-BookSeekr', requiresAuth: true },
  },
  {
    path: '/favorites',
    name: "Favorites",
    component: Favorites,
    meta: { title: 'Favorites | E-BookSeekr', requiresAuth: true },
  },
  {
    path: '/profile', 
    name: "Profile",
    component: Profile,
    meta: { title: 'Profile | E-BookSeekr', requiresAuth: true }, 
  },
  {
    path: '/about',
    name: "About",
    component: About,
    meta: { title: 'About | E-BookSeekr', requiresAuth: true },
  },
  // {
  //   path: '/404',
  //   name: "About",
  //   component: About,
  //   meta: { title: '404 Not Found | E-BookSeekr' },
  // },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});


router.beforeEach((to) => {
  const token = localStorage.getItem("access_token");
  const isAuthenticated = !!token;

  document.title = to.meta.title || 'E-BookSeekr';

  console.log("Navigating to:", to.path);
  console.log("Is Authenticated:", isAuthenticated);

  // If route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Not authenticated - Redirecting to /auth");
    return { path: "/auth" }; // Redirect to login
  }

  // If the user is authenticated and trying to access /auth or another public route
  if (to.path === "/auth" && isAuthenticated) {
    console.log("Authenticated - Redirecting to /home");
    return { path: "/home" }; // Redirect to home
  }

  // Allow navigation
  console.log("Allowing navigation to:", to.path);
  return true;
});

console.log(router.getRoutes());

export default router;
