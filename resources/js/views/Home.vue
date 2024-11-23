<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col" @click="handleOutsideClick" @scroll="handleScroll">
    <!-- Loader component -->
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900">
      <div class="text-center">
        <!-- Loader animation -->
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-amber-600 dark:border-amber-400"></div>
        <p class="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Loading...</p>
      </div>
    </div>
    <div v-else class="bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900 transition-colors duration-300 flex-grow">
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
              :class="['text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors', { 'font-bold': activeLink === index }]"
              @click="setActiveLink(index)"
            >
              <span class="animate-slide-in" :style="{ animationDelay: `${index * 0.1}s` }">{{ link.text }}</span>
            </a>
            <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Sun v-if="isDarkMode" class="h-6 w-6 text-gray-400" />
              <Moon v-else class="h-6 w-6 text-gray-600" />
            </button>
          </nav>
          <div class="md:hidden relative">
            <button @click.stop="toggleMobileMenu" class="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 p-2">
              <Menu class="h-6 w-6" />
            </button>
            <transition name="slide-fade">
              <div 
                v-if="isMobileMenuOpen" 
                class="absolute top-full right-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-bl-lg py-2 mt-2 z-50"
              >
                <button 
                  @click.stop="toggleDarkMode" 
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

      <main class="container mx-auto px-4 py-8 mt-10 mb-24 md:mb-16">
        <section class="text-center mb-16">
          <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-teal-600 dark:from-amber-400 dark:to-teal-400 animate-text-shimmer">
            Discover Your Next Must-Read E-Book!
          </h1>
          <p class="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in">
            "Discover, buy, and read your next favorite e-book with E-BookSeekr. Explore a vast library of genres and authors today!"
          </p>
          <form @submit.prevent="handleSearch" class="max-w-3xl mx-auto">
            <div class="flex flex-col md:flex-row gap-4 mb-4">
              <div class="relative flex-grow">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by title, author, or genre"
                  class="w-full px-4 py-2 rounded-full border-2 border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:bg-gray-800 dark:text-white pr-10"
                  @focus="showRecentSearches = true"
                />
                <button
                  v-if="searchQuery"
                  @click="clearSearch"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X class="h-5 w-5" />
                </button>
                <div
                  v-if="showRecentSearches && recentSearches.length > 0"
                  class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
                >
                  <ul>
                    <li
                      v-for="(search, index) in recentSearches"
                      :key="index"
                      class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                      @click="setSearch(search)"
                    >
                      <span>{{ search }}</span>
                      <button
                        @click.stop="removeRecentSearch(index)"
                        class="text-gray-500 hover:text-amber-500"
                      >
                        <X class="h-4 w-4" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <select
                v-model="searchType"
                class="px-4 py-2 rounded-full border-2 border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="all">All</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
              </select>
              <button type="submit" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out">
                <Search class="h-6 w-6 inline-block mr-2" />
                Search
              </button>
            </div>
          </form>
        </section>

        <section v-if="recentSearches.length > 0 && hasSearched" class="mb-16">
          <h2 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Recent Searches</h2>
          <div class="flex flex-wrap gap-4">
            <div v-for="(search, index) in recentSearches" :key="index" class="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm hover:bg-amber-200 dark:hover:bg-amber-700 transition duration-300">
              <button @click="setSearch(search)" class="mr-2">
                {{ search }}
              </button>
              <button @click="removeRecentSearch(index)" class="text-gray-500 hover:text-amber-500">
                <X class="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section class="mb-16">
          <h2 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Featured E-Books</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div v-for="book in featuredBooks" :key="book.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
              <a :href="book.link" target="_blank" rel="noopener noreferrer">
                <img :src="book.cover" :alt="book.title" class="w-full h-128 object-cover" />
              </a>
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{{ book.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ book.author }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ book.genre }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-amber-600 dark:text-amber-400 font-bold">{{ book.price }}</span>
                  <a :href="book.link" target="_blank" rel="noopener noreferrer" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out">
                    {{ book.isFree ? 'Read Free' : 'Purchase' }}
                  </a>
                </div>
              </div>
              <button 
                @click.stop="toggleFavorite(book)"
                class="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition duration-300 ease-in-out"
              >
                <Heart :class="{ 'fill-current text-amber-500': book.isFavorite }" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        <section class="text-center">
          <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Ready to Explore?</h2>
          <p class="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Dive into our vast collection of e-books and start your reading journey today.
          </p>
          <a href="/explore" class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-block">
            Explore E-Books
          </a>
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
                <li><a href="/#faq" class="hover:text-amber-600 dark:hover:text-amber-400">FAQ</a></li>
                <li><a href="/#contact" class="hover:text-amber-600 dark:hover:text-amber-400">Contact Us</a></li>
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
          <div class="mt-8 pt-8 border-t border-gray-200  dark:border-gray-700 text-center">
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

    <transition name="slide-up">
      <div v-if="showFavoriteAlert" class="fixed bottom-20 right-4 bg-amber-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <Heart class="h-6 w-6 mr-2 fill-current" />
        <span>{{ favoriteAlertMessage }}</span>
      </div>
    </transition>

    <!-- Bottom Navbar (Mobile Only) -->
    <nav v-if="!isLoading" class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
      <div class="flex justify-around items-center h-16">
        <a
          v-for="(link, index) in bottomNavLinks"
          :key="link.href"
          :href="link.href"
          class="flex flex-col items-center justify-center w-full h-full bottom-nav-link"
          :class="{ 'text-amber-600 dark:text-amber-400': activeLink === index, 'text-gray-600 dark:text-gray-400': activeLink !== index }"
          @click="setActiveLink(index)"
        >
          <component :is="link.icon" class="h-6 w-6" />
          <span class="text-xs mt-1">{{ link.text }}</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { BookOpen, Search, Sun, Moon, Facebook, Instagram, Heart, Menu, X, Home, Compass, Info, User, LogOut } from 'lucide-vue-next'

const isDarkMode = ref(false)
const isMobileMenuOpen = ref(false)
const activeLink = ref(0)
const searchQuery = ref('')
const searchType = ref('all')
const recentSearches = ref([])
const showRecentSearches = ref(false)
const showFavoriteAlert = ref(false)
const favoriteAlertMessage = ref('')
const newsletterEmail = ref('')
const hasSearched = ref(false)
const isLoading = ref(true)

const navLinks = [
  { href: '/home', text: 'Home', icon: Home },
  { href: '/explore', text: 'Explore', icon: Compass },
  { href: '/favorites', text: 'Favorites', icon: Heart },
  { href: '/profile', text: 'Profile', icon: User },
  { href: '/about', text: 'About', icon: Info },
]
const bottomNavLinks = [
  { href: '/home', text: 'Home', icon: Home },
  { href: '/explore', text: 'Explore', icon: Compass },
  { href: '/favorites', text: 'Favorites', icon: Heart },
  { href: '/profile', text: 'Profile', icon: User },
]
const mobileNavLinks = [
  { href: '/reading-list', text: 'Reading List', icon: BookOpen },
  { href: '/logout', text: 'Logout', icon: LogOut },
  { href: '/about', text: 'About', icon: Info },
]
const featuredBooks = reactive([
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', cover: '/gatsbyjpg (1).jpg', price: '$9.99', isFree: false, link: 'https://example.com/book1', isFavorite: false },
  { id: 2, title: '1984', author: 'George Orwell', cover: '/george (1).jpg', genre: 'Sci-Fi', price: '$8.99', isFree: false, link: 'https://example.com/book2', isFavorite: false },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', cover: '/pride.jpg', price: 'Free', isFree: true, link: 'https://example.com/book3', isFavorite: false },
  { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', cover: '/to kill (2).jpg', price: '$7.99', isFree: false, link: 'https://example.com/book4', isFavorite: false },
])

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
  document.documentElement.classList.toggle('dark')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const setActiveLink = (index) => {
  activeLink.value = index
}

const handleSearch = () => {
  console.log('Searching for:', searchQuery.value, 'Type:', searchType.value)
  if (searchQuery.value && !recentSearches.value.includes(searchQuery.value)) {
    recentSearches.value.unshift(searchQuery.value)
    if (recentSearches.value.length > 5) {
      recentSearches.value.pop()
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  }
  showRecentSearches.value = false
  hasSearched.value = true
}

const clearSearch = () => {
  searchQuery.value = ''
}

const setSearch = (search) => {
  searchQuery.value = search
  handleSearch()
}

const removeRecentSearch = (index) => {
  recentSearches.value.splice(index, 1)
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  if (recentSearches.value.length === 0) {
    hasSearched.value = false
  }
}

const toggleFavorite = (book) => {
  book.isFavorite = !book.isFavorite
  if (book.isFavorite) {
    addToFavorites(book)
    favoriteAlertMessage.value = `${book.title} added to favorites!`
  } else {
    removeFromFavorites(book)
    favoriteAlertMessage.value = `${book.title} removed from favorites!`
  }
  showFavoriteAlert.value = true
  setTimeout(() => {
    showFavoriteAlert.value = false
  }, 3000)
}

const addToFavorites = (book) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
  if (!favorites.some(favBook => favBook.id === book.id)) {
    favorites.push(book)
    localStorage.setItem('favoriteBooks', JSON.stringify(favorites))
  }
}

const removeFromFavorites = (book) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
  const updatedFavorites = favorites.filter(favBook => favBook.id !== book.id)
  localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites))
}

const subscribeNewsletter = () => {
  console.log('Subscribing email:', newsletterEmail.value)
  newsletterEmail.value = ''
}

const handleOutsideClick = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest('.mobile-menu')) {
    isMobileMenuOpen.value = false
  }
  if (showRecentSearches.value && !event.target.closest('.relative')) {
    showRecentSearches.value = false
  }
}

const handleScroll = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
  featuredBooks.forEach(book => {
    book.isFavorite = storedFavorites.some(favBook => favBook.id === book.id)
  })

  const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
  recentSearches.value = storedSearches

  const storedDarkMode = localStorage.getItem('darkMode')
  if (storedDarkMode !== null) {
    isDarkMode.value = JSON.parse(storedDarkMode)
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    }
  }

  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false
  }, 2000) // 2 seconds loading time, adjust as needed
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(isDarkMode, (newValue) => {
  localStorage.setItem('darkMode', JSON.stringify(newValue))
})
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in {
  from { 
    opacity: 0;
    transform: translateX(-20px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes text-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out;
}

.animate-text-shimmer {
  background-size: 200% auto;
  animation: text-shimmer 3s linear infinite;
}

@media (max-width: 768px) {
  .mobile-menu {
    position: fixed;
    top: 60px;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
  }

  .mobile-menu > div {
    position: absolute;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background-color: white;
    overflow-y: auto;
  }
}

.bottom-nav-link {
  transition: color 0.3s ease;
}

.bottom-nav-link:hover {
  color: #d97706; /* amber-600 */
}

.dark .bottom-nav-link:hover {
  color: #fbbf24; /* amber-400 */
}
</style>

