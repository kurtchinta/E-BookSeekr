<template>
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900 transition-colors duration-300">
      <header class="bg-sepia-200 bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 shadow-md backdrop-filter backdrop-blur-md transition-colors sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <BookOpen class="h-8 w-8 text-amber-600 dark:text-amber-400 animate-float" />
            <span class="text-2xl font-bold text-gray-800 dark:text-white animate-fade-in">E-BookSeekr</span>
          </div>
          <nav class="hidden md:flex items-center space-x-6">
            <a
              v-for="(link, index) in navLinks"
              :key="link.href"
              :href="link.href"
              class="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <span class="animate-slide-in" :style="{ animationDelay: `${index * 0.1}s` }">{{ link.text }}</span>
            </a>
            <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Sun v-if="isDarkMode" class="h-6 w-6 text-gray-400" />
              <Moon v-else class="h-6 w-6 text-gray-600" />
            </button>
          </nav>
          <div class="md:hidden relative">
            <button @click="toggleMobileMenu" class="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 p-2">
              <Menu class="h-6 w-6" />
            </button>
            <transition name="slide-fade">
              <div 
                v-if="isMobileMenuOpen" 
                class="absolute top-full right-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-bl-lg py-2 mt-2 z-50"
              >
                <button 
                  @click="toggleDarkMode" 
                  class="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Sun v-if="isDarkMode" class="h-5 w-5 mr-2" />
                  <Moon v-else class="h-5 w-5 mr-2" />
                  {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
                </button>
                <a 
                  v-for="link in mobileNavLinks" 
                  :key="link.href" 
                  :href="link.href" 
                  class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <component :is="link.icon" class="h-5 w-5 mr-2" />
                  {{ link.text }}
                </a>
              </div>
            </transition>
          </div>
        </div>
      </header>
  
      <main class="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 class="text-6xl font-bold mb-4 text-gray-800 dark:text-white">404</h1>
        <p class="text-2xl mb-8 text-gray-600 dark:text-gray-300">Oops! Page not found</p>
        <p class="text-lg mb-8 text-gray-600 dark:text-gray-300">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <router-link to="/" class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
          Go back to homepage
        </router-link>
      </main>
  
      <footer class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">About Us</h3>
              <p class="mb-4">E-BookSeekr was built with a passion for making books accessible to everyone. Whether you're a casual reader or a bookworm, we bring the best e-books to you, anytime, anywhere.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
              <ul class="space-y-2">
                <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400">Privacy Policy</a></li>
                <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400">Terms of Service</a></li>
                <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400">FAQ</a></li>
                <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Stay Connected</h3>
              <p class="mb-4">Join our newsletter for the latest releases and reading tips.</p>
              <form @submit.prevent="subscribeNewsletter" class="flex">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Your email"
                  class="flex-grow px-4 py-2 rounded-l-full border-2 border-r-0 border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:bg-gray-700 dark:text-white"
                />
                <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-r-full transition duration-300 ease-in-out">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <div class="flex justify-center space-x-4 mb-4">
              <a href="#" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
                <Facebook class="h-6 w-6" />
              </a>
              <a href="#" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
                <Instagram class="h-6 w-6" />
              </a>
            </div>
            <p>&copy; {{ new Date().getFullYear() }} E-BookSeekr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { BookOpen, Sun, Moon, Menu, Facebook, Instagram, Home, Compass, Heart, User, Info } from 'lucide-vue-next'
  
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')
  const isMobileMenuOpen = ref(false)
  const newsletterEmail = ref('')
  
  const navLinks = [
    { href: '/home', text: 'Home' },
    { href: '/explore', text: 'Explore' },
    { href: '/favorites', text: 'Favorites' },
    { href: '/profile', text: 'Profile' },
    { href: '/about', text: 'About' },
  ]
  
  const mobileNavLinks = [
    { href: '/home', text: 'Home', icon: Home },
    { href: '/explore', text: 'Explore', icon: Compass },
    { href: '/favorites', text: 'Favorites', icon: Heart },
    { href: '/profile', text: 'Profile', icon: User },
    { href: '/about', text: 'About', icon: Info },
  ]
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value)
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
  
  const subscribeNewsletter = () => {
    console.log('Subscribing email:', newsletterEmail.value)
    // Implement newsletter subscription logic here
    newsletterEmail.value = ''
  }
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
  
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  </style>