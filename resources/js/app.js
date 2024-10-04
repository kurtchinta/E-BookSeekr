import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
createApp(App).use(router).mount('#app');

const app = createApp(App);

router.beforeEach((to, from, next) => {
  // Set the document title to the meta title or fall back to default
  document.title = to.meta.title || 'E-LibraryHub';
  next();
});

app.use(router);
app.mount('#app');