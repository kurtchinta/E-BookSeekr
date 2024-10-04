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
            <nav class="hidden md:flex space-x-4">
              <router-link to="/" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Home</router-link>
              <router-link to="/explore" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Explore</router-link>
              <router-link to="/community" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Community</router-link>
              <router-link to="/about" class="text-indigo-600 dark:text-indigo-400 font-semibold">About</router-link>
            </nav>
            <div class="flex items-center space-x-4">
              <button @click="toggleDarkMode" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                <SunIcon v-if="isDarkMode" class="h-5 w-5" />
                <MoonIcon v-else class="h-5 w-5" />
              </button>
              <button v-if="isLoggedIn" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                <UserIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">About E-LibraryHub</h1>
        
        <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            E-LibraryHub is your digital sanctuary for literature. Our mission is to provide a vast collection of e-books spanning various genres, making it easy for book lovers to discover, read, and connect with their next favorite story.
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            Founded in 2023, we've grown from a small collection to a comprehensive digital library, serving readers worldwide. Our platform is designed to make reading accessible, enjoyable, and social.
          </p>
        </div>
  
        <h2 class="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">E-LibraryHub in Numbers</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div v-for="stat in statistics" :key="stat.label" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{{ stat.value }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ stat.label }}</p>
          </div>
        </div>
  
        <div class="mt-12 text-center">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Team</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            E-LibraryHub is brought to you by a passionate team of book lovers and tech enthusiasts.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div v-for="member in teamMembers" :key="member.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <img :src="member.avatar" :alt="member.name" class="w-24 h-24 rounded-full mx-auto mb-4">
              <h3 class="font-semibold text-gray-800 dark:text-white">{{ member.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </main>
  
      <footer class="bg-gray-100 dark:bg-gray-800 mt-16 py-8">
        <div class="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>&copy; {{ currentYear }} E-LibraryHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { BookOpenIcon, SunIcon, MoonIcon, UserIcon } from 'lucide-vue-next'
  
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')
  const isLoggedIn = ref(false) // This should be connected to your authentication state
  const currentYear = computed(() => new Date().getFullYear())
  
  const statistics = ref([
    { label: 'Books Available', value: 0 },
    { label: 'Active Readers', value: 0 },
    { label: 'Books Read', value: 0 }
  ])
  
  const teamMembers = ref([])
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value)
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  onMounted(async () => {
    try {
      // Fetch statistics from the database
      const statsResponse = await fetch('/api/statistics')
      const statsData = await statsResponse.json()
      statistics.value = statsData
  
      // Fetch team members from the database
      const teamResponse = await fetch('/api/team-members')
      const teamData = await teamResponse.json()
      teamMembers.value = teamData
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  })
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>