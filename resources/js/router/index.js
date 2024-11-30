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


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  const isAuthenticated = token !== null;

  // Optionally, validate the token against Supabase's session
  if (to.meta.requiresAuth && !isAuthenticated) {
      console.log("Not authenticated - Redirecting to /auth");
      next("/auth");
  } else if (!to.meta.requiresAuth && isAuthenticated) {
      console.log("Authenticated - Redirecting to /homesec");
      next("/home");
  } else {
      console.log("Allowing navigation to:", to.path);
      next();
  }
});

console.log(router.getRoutes());

router.afterEach((to, from) => {
  const token = localStorage.getItem("access_token"); // Check token in localStorage
  const isAuthenticated = token !== null;
  console.log("Token:", localStorage.getItem("access_token"));
  console.log("Is Authenticated:", isAuthenticated);

  // Only reload the landing page if the user is authenticated
  if (to.path === "/" && isAuthenticated) {
      // Reload only if the user is authenticated and trying to navigate to the landing page
      // You can also trigger a manual session refresh here if necessary
      setTimeout(() => {
          window.location.reload(); // Trigger a page reload to reset the app's state
      }, 100); // Small delay to ensure session state is updated
  }
});
export default router;
