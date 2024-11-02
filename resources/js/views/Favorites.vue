<template>
    <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900 transition-colors duration-300">
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
              :class="['text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors', { 'font-bold': link.text === 'Favorites' }]"
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
  
      <main class="container mx-auto px-4 py-8 flex-grow">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Your Favorite Books</h1>
  
        <div class="mb-8">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center space-x-2">
              <label for="sort" class="text-gray-700 dark:text-gray-300">Sort by:</label>
              <select
                id="sort"
                v-model="sortBy"
                @change="sortFavorites"
                class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="dateAdded">Date Added</option>
              </select>
            </div>
            <div class="flex items-center space-x-2">
              <label for="filter" class="text-gray-700 dark:text-gray-300">Filter:</label>
              <input
                id="filter"
                v-model="filterText"
                @input="filterFavorites"
                type="text"
                placeholder="Search favorites..."
                class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
  
        <transition-group name="book-list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="book in filteredFavorites" :key="book.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
            <a :href="book.link" target="_blank" rel="noopener noreferrer">
              <img :src="book.cover" :alt="book.title" class="w-full h-128 object-cover" />
            </a>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ book.author }}</p>
              <div class="flex justify-between items-center">
                <span class="text-amber-600 dark:text-amber-400 font-bold">{{ book.price }}</span>
                <a :href="book.link" target="_blank" rel="noopener noreferrer" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out">
                  {{ book.isFree ? 'Read Free' : 'Purchase' }}
                </a>
              </div>
            </div>
            <button 
              @click="removeFromFavorites(book)"
              class="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition duration-300 ease-in-out"
            >
              <Trash2 class="h-6 w-6" />
            </button>
          </div>
        </transition-group>
  
        <div v-if="filteredFavorites.length === 0" class="text-center py-12">
          <BookOpen class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No favorites yet</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Start adding books to your favorites to see them here!</p>
          <a href="/explore" class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            Explore Books
          </a>
        </div>
  
        <section v-if="recommendedBooks.length > 0" class="mt-16">
          <h2 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Recommended for You</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div v-for="book in recommendedBooks" :key="book.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
              <a :href="book.link" target="_blank" rel="noopener noreferrer">
                <img :src="book.cover" :alt="book.title" class="w-full h-128 object-cover" />
              </a>
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{{ book.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ book.author }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-amber-600 dark:text-amber-400 font-bold">{{ book.price }}</span>
                  <a :href="book.link" target="_blank" rel="noopener noreferrer" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out">
                    {{ book.isFree ? 'Read Free' : 'Purchase' }}
                  </a>
                </div>
              </div>
              <button 
                @click="addToFavorites(book)"
                class="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition duration-300 ease-in-out"
              >
                <Heart class="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>
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
                <li><a href="#faq" class="hover:text-amber-600 dark:hover:text-amber-400">FAQ</a></li>
                <li><a href="#contact" class="hover:text-amber-600 dark:hover:text-amber-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Stay Connected</h3>
              <p class="mb-4">Join our newsletter for the latest releases and reading tips.</p>
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
          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <div class="flex justify-center space-x-4 mb-4">
              <a href="#" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
                <Facebook class="h-6 w-6" />
              </a>
              <a href="#" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
                <Instagram class="h-6 w-6" />
              </a>
            </div>
            <p class="mb-10">&copy; {{ new Date().getFullYear() }} E-BookSeekr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { Moon, Sun, Trash2, Heart, Menu, BookOpen, Home, Compass, Info, User, Facebook, Instagram } from 'lucide-vue-next';
  
  const isDarkMode = ref(false);
  const isMobileMenuOpen = ref(false);
  const sortBy = ref('title');
  const filterText = ref('');
  const newsletterEmail = ref('');
  
  const navLinks = [
    { href: '/home', text: 'Home', icon: Home },
    { href: '/explore', text: 'Explore', icon: Compass },
    { href: '/favorites', text: 'Favorites', icon: Heart },
    { href: '/profile', text: 'Profile', icon: User },
    { href: '/about', text: 'About', icon: Info },
  ];
  
  const mobileNavLinks = [
    { href: '/profile', text: 'Profile', icon: User },
    { href: '/home', text: 'Home', icon: Home },
    { href: '/explore', text: 'Explore', icon: Compass },
    { href: '/favorites', text: 'Favorites', icon: Heart },
    { href: '/about', text: 'About', icon: Info },
  ];
  
  const favorites = ref([]);
  const recommendedBooks = ref([
    { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', cover:  '/catch.jpg', price: '$6.99', isFree: false, link: '#' },
    { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', cover: '/hobbit.jpg', price: '$10.99', isFree: false, link: '#' },
    { id: 7, title: 'The Da Vinci Code', author: 'Dan Brown', cover: '/vinci.jpg', price: '$9.99', isFree: false, link: '#' },
    { id: 8, title: 'The Alchemist', author: 'Paulo Coelho', cover: '/alchemist.jpg', price: '$8.99', isFree: false, link: '#' },
  ]);
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', isDarkMode.value);
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  };
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };
  
  const filteredFavorites = computed(() => {
    return favorites.value.filter(book => 
      book.title.toLowerCase().includes(filterText.value.toLowerCase()) ||
      book.author.toLowerCase().includes(filterText.value.toLowerCase())
    );
  });
  
  const sortFavorites = () => {
    favorites.value.sort((a, b) => {
      if (sortBy.value === 'title') return a.title.localeCompare(b.title);
      if (sortBy.value === 'author') return a.author.localeCompare(b.author);
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });
  };
  
  const removeFromFavorites = (book) => {
    favorites.value = favorites.value.filter(fav => fav.id !== book.id);
    saveFavoritesToLocalStorage();
  };
  
  const addToFavorites = (book) => {
    if (!favorites.value.some(fav => fav.id === book.id)) {
      favorites.value.push({ ...book, dateAdded: new Date() });
      saveFavoritesToLocalStorage();
    }
  };
  
  const saveFavoritesToLocalStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  };
  
  const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites);
    }
  };
  
  const subscribeNewsletter = () => {
    // Implement newsletter subscription logic here
    console.log('Subscribing to newsletter:', newsletterEmail.value);
    newsletterEmail.value = ''; // Clear the input after submission
  };
  
  onMounted(() => {
    isDarkMode.value = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', isDarkMode.value);
    loadFavoritesFromLocalStorage();
  });
  
  watch(favorites, () => {
    sortFavorites();
  }, { deep: true });
  
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
  
  .book-list-enter-active,
  .book-list-leave-active {
    transition: all 0.5s ease;
  }
  .book-list-enter-from,
  .book-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
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