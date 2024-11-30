<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-amber-900 transition-colors duration-300">
    <header class="bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 shadow-md backdrop-filter backdrop-blur-md transition-colors sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <BookOpen class="h-8 w-8 text-amber-600 dark:text-amber-400 animate-float" />
          <span class="text-2xl font-bold text-gray-800 dark:text-white animate-fade-in">E-BookSeekr</span>
        </div>
        <nav class="hidden md:flex items-center space-x-6">
          <router-link
  v-for="(link, index) in navLinks"
  :key="index"
  :to="link.to"
  class="nav-item"
  @click="setActiveLink(index)"
>
  <link.icon />
  {{ link.text }}
</router-link>

          <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <Sun v-if="isDarkMode" class="h-6 w-6 text-gray-400" />
            <Moon v-else class="h-6 w-6 text-gray-600" />
          </button>
        </nav>
        <div class="md:hidden relative">
          <button @click="toggleBurgerMenu" class="burger-menu-button text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 p-2">
            <Menu class="h-6 w-6" />
          </button>
          <div v-if="isBurgerMenuOpen" class="burger-menu-dropdown absolute top-full right-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-bl-lg py-2 mt-2 z-50">
            <button @click="toggleBurgerMenu" class="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">
              <X class="h-5 w-5" />
            </button>
            <button @click="toggleDarkMode" class="w-full flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700">
              <Sun v-if="isDarkMode" class="h-5 w-5 mr-2" />
              <Moon v-else class="h-5 w-5 mr-2" />
              {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
            <a href="/profile#reading" class="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700">
              <BookOpen class="h-5 w-5 mr-2" />
              Reading List
            </a>
            <button @click="logout" class="w-full flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700">
              <LogOut class="h-5 w-5 mr-2" />
              Logout
            </button>
            <a href="/about" class="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700">
              <Info class="h-5 w-5 mr-2" />
              About
            </a>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 flex-grow pb-24 md:pb-8">
      <section class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-teal-600 dark:from-amber-400 dark:to-teal-400 animate-text-shimmer">
          Discover the E-BookSeekr Story
        </h1>
        <p class="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in">
          Embark on a journey through the pages of our history and vision for the future of digital reading.
        </p>
      </section>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 border-l-4 border-amber-500">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Target class="h-6 w-6 text-amber-500 mr-2" />
            Our Mission
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            At E-BookSeekr, we're on a mission to connect readers with their perfect books. We believe that the right book can inspire, educate, and transform lives.
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            Our user-friendly platform is designed to help book enthusiasts easily search, discover, and access a vast range of e-books and physical books from various sources across the web.
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 border-l-4 border-amber-500">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen class="h-6 w-6 text-amber-500 mr-2" />
            Our Story
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            E-BookSeekr was born from a passion for reading and a desire to simplify the fragmented world of online book searches. Our founders, avid readers themselves, envisioned a centralized platform for book discovery.
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            Since our launch, we've been tirelessly improving our search algorithms and expanding our database. We've forged partnerships with leading online bookstores and e-book platforms to offer you the most comprehensive search results possible.
          </p>
        </div>
      </div>

      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">Discover Our Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 border-t-4 border-amber-500">
            <component :is="feature.icon" class="h-12 w-12 text-amber-600 dark:text-amber-400 mb-4" />
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">Meet the Minds Behind E-BookSeekr</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="dev in developers" :key="dev.name" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 border-b-4 border-amber-500">
            <img :src="dev.avatar" :alt="dev.name" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-amber-500" />
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{{ dev.name }}</h3>
            <p class="text-amber-600 dark:text-amber-400 mb-4">{{ dev.role }}</p>
            <p class="text-gray-700 dark:text-gray-400 mb-4">{{ dev.bio }}</p>
            <div class="flex justify-center space-x-3">
              <a v-for="(link, platform) in dev.socialLinks" :key="platform" :href="link" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                <component :is="getSocialIcon(platform)" class="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-16 bg-gradient-to-r from-amber-500 to-amber-500 dark:from-amber-600 dark:to-amber-600 text-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
        <h2 class="text-3xl font-semibold mb-4">Ready to Embark on Your Reading Journey?</h2>
        <p class="text-xl mb-8">Join E-BookSeekr today and unlock a world of literary wonders!</p>
        <a href="/explore" class="bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out inline-block shadow-md hover:shadow-lg transform hover:-translate-y-1">
          Start Your Adventure
        </a>
      </section>
    </main>

    <nav class="rounded-t-3xl md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div class="flex justify-around items-center h-16">
        <a
          v-for="link in mobileNavLinks"
          :key="link.href"
          :href="link.href"
          class="flex flex-col items-center justify-center flex-1 h-full text-center px-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bottom-nav-item"
          :class="[
            'text-gray-600 dark:text-gray-400',
            { 'text-amber-600 dark:text-amber-400 active': link.text === 'About' }
          ]"
        >
          <component 
            :is="link.icon" 
            class="h-6 w-6 mb-1"
            :class="{ 'text-amber-600 dark:text-amber-400': link.text === 'About' }"
          />
          <span class="text-xs">{{ link.text }}</span>
        </a>
      </div>
    </nav>

    <footer class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">About Us</h3>
            <p class="mb-4">E-BookSeekr is your gateway to a world of books. We're dedicated to making your book discovery journey easier, more enjoyable, and filled with literary treasures.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400">Terms of Service</a></li>
              <li><a href="#faq" class="hover:text-amber-600 dark:hover:text-amber-400">FAQ</a></li>
              <li><a href="#contact" class="hover:text-amber-600 dark:hover:text-amber-400">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Stay Connected</h3>
            <p class="mb-4">Join our newsletter for the latest updates and reading recommendations.</p>
            <form @submit.prevent="subscribeNewsletter" class="flex">
              <input
                type="email"
                v-model="newsletterEmail"
                placeholder="Your email"
                class="flex-grow px-4 py-2 rounded-l-full border-2 border-r-0 border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:bg-gray-700 dark:text-white"
              />
              <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-r-full transition duration-300 ease-in-out">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div class="mt-8 mb-10 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <div class="flex justify-center space-x-4 mb-4">
            <a href="#" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              <Facebook class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              <Instagram class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              <Twitter class="h-6 w-6" />
            </a>
          </div>
          <p>&copy; {{ new Date().getFullYear() }} E-BookSeekr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Moon, Sun, Menu, BookOpen, Home, Compass, Heart, User, Info, Search, BookMarked, Users, Zap, Github, Facebook, Instagram, Twitter, Linkedin, Target, LogOut, X } from 'lucide-vue-next';

const isDarkMode = ref(false);
const newsletterEmail = ref('');
const isBurgerMenuOpen = ref(false);

const navLinks = [
  { to: '/home', text: 'Home', icon: Home },
  { to: '/explore', text: 'Explore', icon: Compass },
  { to: '/favorites', text: 'Favorites', icon: Heart },
  { to: '/profile', text: 'Profile', icon: User },
  { to: '/about', text: 'About', icon: Info },
];

const mobileNavLinks = [
  { href: '/home', text: 'Home', icon: Home },
  { href: '/search', text: 'Search', icon: Search },
  { href: '/favorites', text: 'Favorites', icon: Heart },
  { href: '/profile', text: 'Profile', icon: User },
  { href: '/about', text: 'About', icon: Info },
];

const features = [
  { title: 'Comprehensive Search', description: 'Access a vast library of e-books and physical books from multiple sources in one seamless search.', icon: Search },
  { title: 'Personalized Favorites', description: 'Curate your own collection of beloved books for quick access and future exploration.', icon: Heart },
  { title: 'Direct Source Links', description: 'Connect directly to trusted platforms to purchase or access your chosen literary treasures.', icon: BookMarked },
];

const developers = [
  {
    name: 'Kurt Reserva',
    role: 'Frontend Architect',
    avatar: '/kurty.png',
    bio: "Kurt crafts intuitive and responsive interfaces, ensuring E-BookSeekr's seamless user experience across all devices.",
    socialLinks: {
      github: 'https://github.com/kurtreserva',
      facebook: 'https://linkedin.com/in/kurtreserva',
      instagram: 'https://twitter.com/kurtreserva',
    },
  },
  {
    name: 'Lawrence Ave Sabrido',
    role: 'UX/UI Visionary',
    avatar: '/lawlaw.jpg',
    bio: "Lawrence infuses creativity into E-BookSeekr's design, creating a visually stunning and user-centric platform for book lovers.",
    socialLinks: {
      github: 'https://dribbble.com/lawrencesabrido',
      facebook: 'https://linkedin.com/in/lawrencesabrido',
      instagram: 'https://instagram.com/lawrencesabrido',
    },
  },
  {
    name: 'Cyrel John Rollo',
    role: 'Backend Maestro',
    avatar: '/cyrel.png',
    bio: "Cyrel is the backbone of E-BookSeekr's infrastructure, fine-tuning our search algorithms for lightning-fast and precise results.",
    socialLinks: {
      github: 'https://github.com/cyreljohnrollo',
      facebook: 'https://linkedin.com/in/cyreljohnrollo',
      instagram: 'https://twitter.com/cyreljohnrollo',
    },
  },
];

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value);
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

const subscribeNewsletter = () => {
  console.log('Subscribing to newsletter:', newsletterEmail.value);
  newsletterEmail.value = '';
};

const getSocialIcon = (platform) => {
  const icons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    facebook: Facebook,
    dribbble: Instagram,
  };
  return icons[platform] || User;
};

const toggleBurgerMenu = () => {
  isBurgerMenuOpen.value = !isBurgerMenuOpen.value;
};

const logout = () => {
  // Implement logout logic here
  console.log('Logging out');
};

onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  document.documentElement.classList.toggle('dark', isDarkMode.value);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  document.addEventListener('click', (event) => {
    const burgerMenu = document.querySelector('.burger-menu-dropdown');
    const burgerButton = document.querySelector('.burger-menu-button');
    if (isBurgerMenuOpen.value && burgerMenu && !burgerMenu.contains(event.target) && !burgerButton.contains(event.target)) {
      isBurgerMenuOpen.value = false;
    }
  });
});
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out forwards;
}

.animate-slide-in {
  animation: slide-in 0.5s ease-in-out forwards;
}

.animate-text-shimmer {
  background-size: 200% auto;
  animation: text-shimmer 3s linear infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in {
  from { 
    transform: translateX(-20px);
    opacity: 0;
  }
  to { 
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes text-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.bottom-nav-item {
  transition: all 0.2s ease-in-out;
}

.bottom-nav-item.active {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .pb-safe {
    padding-bottom: calc(4rem + env(safe-area-inset-bottom));
  }
}
</style>