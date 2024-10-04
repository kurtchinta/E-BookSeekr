<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-indigo-900">
    <header class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="relative">
              <BookOpenIcon class="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div class="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <span class="text-2xl font-bold text-gray-800 dark:text-white">E-LibraryHub</span>
          </router-link>
          <div class="hidden md:flex items-center space-x-6">
            <nav>
              <ul class="flex space-x-6">
                <li><router-link to="/" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Home</router-link></li>
                <li><router-link to="/explore" class="text-indigo-600 dark:text-indigo-400 font-semibold">Explore</router-link></li>
                <li><router-link to="/community" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Community</router-link></li>
                <li><router-link to="/about" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">About</router-link></li>
              </ul>
            </nav>
            <button @click="toggleDarkMode" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              <SunIcon v-if="isDarkMode" class="h-5 w-5" />
              <MoonIcon v-else class="h-5 w-5" />
              <span class="sr-only">Toggle Dark Mode</span>
            </button>
            <button v-if="isLoggedIn" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              <UserIcon class="h-5 w-5" />
              <span class="sr-only">Profile</span>
            </button>
          </div>
          <div class="md:hidden">
            <button @click="toggleMobileMenu" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              <MenuIcon v-if="!isMobileMenuOpen" class="h-6 w-6" />
              <XIcon v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4">
          <nav>
            <ul class="space-y-2">
              <li><router-link to="/" class="block text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Home</router-link></li>
              <li><router-link to="/explore" class="block text-indigo-600 dark:text-indigo-400 font-semibold">Explore</router-link></li>
              <li><router-link to="/community" class="block text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Community</router-link></li>
              <li><router-link to="#" class="block text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">About</router-link></li>
            </ul>
          </nav>
          <div class="mt-4 flex items-center justify-between">
            <button @click="toggleDarkMode" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              <SunIcon v-if="isDarkMode" class="h-5 w-5" />
              <MoonIcon v-else class="h-5 w-5" />
              <span class="ml-2">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
            </button>
            <button v-if="isLoggedIn" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              <UserIcon class="h-5 w-5" />
              <span class="ml-2">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Read New Books</h1>

      <div class="mb-8 max-w-md mx-auto">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for books, authors, or genres..."
            class="w-full px-4 py-2 pl-10 rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Trending Categories</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            v-for="category in trendingCategories"
            :key="category.name"
            class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center space-y-2"
          >
            <component :is="category.icon" class="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ category.name }}</span>
          </button>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Trending Now</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="book in trendingBooks"
            :key="book.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img :src="book.cover" :alt="book.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 text-gray-800 dark:text-white">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">by {{ book.author }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ book.genre }}</span>
                <span class="flex items-center text-yellow-500">
                  <StarIcon class="h-4 w-4 mr-1" />
                  {{ book.rating }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Personalized for You</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="book in personalizedBooks"
            :key="book.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img :src="book.cover" :alt="book.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 text-gray-800 dark:text-white">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">by {{ book.author }}</p>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ book.genre }}</span>
                <span class="flex items-center text-yellow-500">
                  <StarIcon class="h-4 w-4 mr-1" />
                  {{ book.rating }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ book.recommendation }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Discover New Authors</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div
            v-for="author in newAuthors"
            :key="author.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <img :src="author.photo" :alt="author.name" class="w-24 h-24 mx-auto mt-4 rounded-full object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-gray-800 dark:text-white">{{ author.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ author.genre }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-gray-100 dark:bg-gray-800 mt-16">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-sm text-gray-600 dark:text-gray-300">
          <p>&copy; {{ currentYear }} E-Book Oasis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BookOpenIcon, SearchIcon, UserIcon, StarIcon, SunIcon, MoonIcon, BookIcon, HeartIcon, TrendingUpIcon, CoffeeIcon, RocketIcon, BrainIcon, MenuIcon, XIcon } from 'lucide-vue-next'

const searchQuery = ref('')
const isDarkMode = ref(false)
const isLoggedIn = ref(false)
const isMobileMenuOpen = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const trendingCategories = [
  { name: 'Fiction', icon: BookIcon },
  { name: 'Romance', icon: HeartIcon },
  { name: 'Thriller', icon: TrendingUpIcon },
  { name: 'Self-Help', icon: CoffeeIcon },
  { name: 'Sci-Fi', icon: RocketIcon },
  { name: 'Non-Fiction', icon: BrainIcon },
]

const trendingBooks = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", rating: 4.2, cover: "/placeholder.svg?height=192&width=128&text=The Midnight Library" },
  { id: 2, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", rating: 4.8, cover: "/placeholder.svg?height=192&width=128&text=Atomic Habits" },
  { id: 3, title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", rating: 4.5, cover: "/placeholder.svg?height=192&width=128&text=The Silent Patient" },
  { id: 4, title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", rating: 4.7, cover: "/placeholder.svg?height=192&width=128&text=Project Hail Mary" },
]

const personalizedBooks = [
  { id: 1, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", rating: 4.6, cover: "/placeholder.svg?height=192&width=128&text=Dune", recommendation: "Based on your interest in science fiction" },
  { id: 2, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", genre: "Self-Help", rating: 4.5, cover: "/placeholder.svg?height=192&width=128&text=7 Habits", recommendation: "You might enjoy this classic self-help book" },
  { id: 3, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", genre: "Mystery", rating: 4.3, cover: "/placeholder.svg?height=192&width=128&text=Dragon Tattoo", recommendation: "If you like thrilling mysteries" },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", rating: 4.4, cover: "/placeholder.svg?height=192&width=128&text=The Alchemist", recommendation: "A philosophical novel you might enjoy" },
]

const newAuthors = [
  { id: 1, name: "Jane Doe", genre: "Mystery", photo: "/placeholder.svg?height=96&width=96&text=JD" },
  { id: 2, name: "John Smith", genre: "Sci-Fi", photo: "/placeholder.svg?height=96&width=96&text=JS" },
  { id: 3, name: "Emily Brown", genre: "Romance", photo: "/placeholder.svg?height=96&width=96&text=EB" },
  { id: 4, name: "Michael Lee", genre: "Thriller", photo: "/placeholder.svg?height=96&width=96&text=ML" },
  { id: 5, name: "Sarah Johnson", genre: "Fantasy", photo: "/placeholder.svg?height=96&width=96&text=SJ" },
  { id: 6, name: "David Wilson", genre: "Non-Fiction", photo: "/placeholder.svg?height=96&width=96&text=DW" },
]

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>