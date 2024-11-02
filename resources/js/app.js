import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your router

const app = createApp(App);

// Set document title based on route meta
router.beforeEach((to) => {
  document.title = to.meta.title || 'E-LibraryHub'; // Fallback to default title
});

app.use(router); // Use the router
app.mount('#app'); // Mount the app to the DOM
