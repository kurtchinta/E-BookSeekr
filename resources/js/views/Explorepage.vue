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
              :class="['text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors', { 'font-bold': link.text === 'Explore' }]"
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

      <main class="container mx-auto px-4 py-8 mt-10 mb-24 md:mb-16">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-teal-600 dark:from-amber-400 dark:to-teal-400 animate-text-shimmer text-center">
          Explore E-Books
        </h1>
        <p class="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center animate-fade-in">
          Discover your next favorite e-book from our vast collection of genres and authors.
        </p>

        <form @submit.prevent="handleSearch" class="max-w-3xl mx-auto mb-8">
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="relative flex-grow">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by title, author, or genre"
                class="w-full px-4 py-2 rounded-full border-2 border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:bg-gray-800 dark:text-white pr-10"
              />
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X class="h-5 w-5" />
              </button>
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

        <div class="mb-8 text-center">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Popular Genres</h2>
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              v-for="genre in genres"
              :key="genre"
              @click="selectGenre(genre)"
              :class="[ 
                'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 text-center',
                selectedGenre === genre
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-amber-600 hover:text-white'
              ]"
            >
              {{ genre }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="book in displayedBooks" :key="book.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
            <a :href="book.link" target="_blank" rel="noopener noreferrer">
              <img :src="book.cover" :alt="book.title" class="w-full h-128 object-cover" />
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{{ book.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ book.author }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ book.genre }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-amber-600 dark:text-amber-400 font-bold">{{ book.price }}</span>
                  <span class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out">
                    {{ book.isFree ? 'Read Free' : 'Purchase' }}
                  </span>
                </div>
              </div>
            </a>
            <button 
              @click.stop="toggleFavorite(book)"
              class="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition duration-300 ease-in-out"
            >
              <Heart :class="{ 'fill-current text-amber-500': book.isFavorite }" class="h-6 w-6" />
            </button>
          </div>
        </div>

        <div v-if="displayedBooks.length < filteredBooks.length" class="mt-8 text-center">
          <button @click="loadMore" class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            Load More
          </button>
        </div>
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
          :class="{ 'text-amber-600 dark:text-amber-400': link.text === 'Explore', 'text-gray-600 dark:text-gray-400': link.text !== 'Explore' }"
        >
          <component :is="link.icon" class="h-6 w-6" />
          <span class="text-xs mt-1">{{ link.text }}</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BookOpen, Search, Sun, Moon, Facebook, Instagram, Heart, Menu, Home, Compass, User, X, BookOpen as ReadingList, LogOut, Info } from 'lucide-vue-next'

const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')
const isMobileMenuOpen = ref(false)
const activeLink = ref(1) // Set to 1 for "Explore" page
const selectedGenre = ref('All')
const searchQuery = ref('')
const searchType = ref('all')
const priceFilter = ref('all')
const currentPage = ref(1)
const showFavoriteAlert = ref(false)
const favoriteAlertMessage = ref('')
const newsletterEmail = ref('')
const isLoading = ref(true)

const booksPerPage = 8

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
  { href: '/reading-list', text: 'Reading List', icon: ReadingList },
  { href: '/logout', text: 'Logout', icon: LogOut },
  { href: '/about', text: 'About', icon: Info },
]

const genres = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography', 'Fantasy', 'Thriller', 'Horror']

const books = ref([
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', cover: '/gatsbyjpg (1).jpg', price: '$9.99', isFree: false, link: '/books/1', isFavorite: false },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Sci-Fi', cover: '/george (1).jpg', price: '$8.99', isFree: false, link: '/books/2', isFavorite: false },
  { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', cover: '/pride.jpg', price: 'Free', isFree: true, link: '/books/3', isFavorite: false },
  { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', cover: '/to kill (2).jpg', price: '$7.99', isFree: false, link: '/books/4', isFavorite: false },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', cover: '/catch.jpg', price: '$6.99', isFree: false, link: '/books/5', isFavorite: false },
  { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', cover: '/hobbit.jpg', price: '$10.99', isFree: false, link: '/books/6', isFavorite: false },
  { id: 7, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Mystery', cover: '/vinci.jpg', price: '$9.99', isFree: false, link: '/books/7', isFavorite: false },
  { id: 8, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', cover: '/alchemist.jpg', price: '$8.99', isFree: false, link: '/books/8', isFavorite: false },
  { id: 9, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', genre: 'Non-Fiction', cover: '/sapiens.jpg', price: '$12.99', isFree: false, link: '/books/9', isFavorite: false },
  { id: 10, title: 'The Diary of a Young Girl', author: 'Anne Frank', genre: 'Biography', cover: '/anne.jpg', price: '$6.99', isFree: false, link: '/books/10', isFavorite: false },
  { id: 11, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Thriller', cover: '/gone.jpg', price: '$10.99', isFree: false, link: '/books/11', isFavorite: false },
  { id: 12, title: 'The Shining', author: 'Stephen King', genre: 'Horror', cover: '/shining.jpg', price: '$9.99', isFree: false, link: '/books/12', isFavorite: false },
])

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const genreMatch = selectedGenre.value === 'All' || book.genre === selectedGenre.value
    const searchMatch = searchQuery.value === '' || 
      (searchType.value === 'all' && (book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.value.toLowerCase()))) ||
      (searchType.value === 'title' && book.title.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (searchType.value === 'author' && book.author.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (searchType.value === 'genre' && book.genre.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const priceMatch = priceFilter.value === 'all' || 
      (priceFilter.value === 'free' && book.isFree) ||
      (priceFilter.value === 'paid' && !book.isFree)
    return genreMatch && searchMatch && priceMatch
  })
})

const displayedBooks = computed(() => {
  return filteredBooks.value.slice(0, currentPage.value * booksPerPage)
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const setActiveLink = (index) => {
  activeLink.value = index
}

const selectGenre = (genre) => {
  selectedGenre.value = genre
  currentPage.value = 1
}

const loadMore = () => {
  currentPage.value++
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

const handleSearch = () => {
  currentPage.value = 1
  // Additional search logic can be added here if needed
}

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const handlePriceFilterChange = () => {
  currentPage.value = 1
}

const subscribeNewsletter = () => {
  console.log('Subscribing email:', newsletterEmail.value)
  // Implement newsletter subscription logic here
  newsletterEmail.value = ''
}

const handleOutsideClick = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest('.mobile-menu')) {
    isMobileMenuOpen.value = false
  }
}

const handleScroll = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true'
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  window.addEventListener('scroll', handleScroll)
  
  // Load favorite books from localStorage
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
  books.value.forEach(book => {
    book.isFavorite = storedFavorites.some(favBook => favBook.id === book.id)
  })

  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false
  }, 2000) // 2 seconds loading time, adjust as needed
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
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