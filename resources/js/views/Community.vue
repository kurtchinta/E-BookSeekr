<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-indigo-900">
      <header class="bg-white dark:bg-gray-800 shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="relative">
              <BookOpenIcon class="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div class="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <span class="text-2xl font-bold text-gray-800 dark:text-white">
                E-LibraryHub</span>
          </router-link>
          <nav>
            <ul class="flex space-x-6">
              <li><router-link to="/" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Home</router-link></li>
              <li><router-link to="/explore" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Explore</router-link></li>
              <li><router-link to="/community" class="text-indigo-600 dark:text-indigo-400 font-semibold">Community</router-link></li>
              <li><router-link to="/about" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">About</router-link></li>
            </ul>
          </nav>
          <div class="flex items-center space-x-4">
            <button class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              <UserIcon class="h-5 w-5" />
              <span class="sr-only">Account</span>
            </button>
            <button @click="toggleDarkMode" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
              <SunIcon v-if="isDarkMode" class="h-5 w-5" />
              <MoonIcon v-else class="h-5 w-5" />
              <span class="sr-only">Toggle Dark Mode</span>
            </button>
          </div>
        </div>
      </header>
  
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            E-LibraryHub Community</h1>
  
        <section class="mb-12">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Current Reading Challenge</h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{{ currentChallenge.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ currentChallenge.description }}</p>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ currentChallenge.participants }} participants</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ currentChallenge.timeLeft }} left</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
              <div class="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full" :style="{ width: `${currentChallenge.progress}%` }"></div>
            </div>
            <button @click="joinChallenge" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
              Join Challenge
            </button>
          </div>
        </section>
  
        <section class="mb-12">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Discussion Board</h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <button @click="openNewThreadModal" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300">
                New Thread
              </button>
            </div>
            <ul>
              <li v-for="thread in discussionThreads" :key="thread.id" class="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <a href="#" @click.prevent="openThread(thread.id)" class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="text-lg font-medium text-gray-800 dark:text-white">{{ thread.title }}</h4>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(thread.createdAt) }}</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 mb-2">{{ thread.preview }}</p>
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <UserIcon class="h-4 w-4 mr-1" />
                    <span>{{ thread.author }}</span>
                    <MessageCircleIcon class="h-4 w-4 ml-4 mr-1" />
                    <span>{{ thread.replies }} replies</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </section>
  
        <section class="mb-12">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Top Readers This Month</h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-700">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Books Read</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="(user, index) in topReaders" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="user.username" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.username }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ user.booksRead }}</td>
                </tr>
              </tbody>
            </table>
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
  import { BookOpenIcon, UserIcon, SunIcon, MoonIcon, MessageCircleIcon } from 'lucide-vue-next'
  
  const isDarkMode = ref(false)
  const currentYear = computed(() => new Date().getFullYear())
  
  const currentChallenge = ref({
    title: "Summer Reading Sprint",
    description: "Read 10 books before the end of summer!",
    participants: 1243,
    timeLeft: "2 months",
    progress: 45
  })
  
  const discussionThreads = ref([
    { id: 1, title: "What's your favorite sci-fi novel?", author: "SpaceExplorer", createdAt: "2023-06-15T10:30:00Z", preview: "I'm looking for recommendations for great science fiction novels. What are your top picks?", replies: 23 },
    { id: 2, title: "Classic vs Contemporary Literature", author: "BookwormJane", createdAt: "2023-06-14T15:45:00Z", preview: "Let's discuss the merits of classic literature compared to contemporary works. Which do you prefer and why?", replies: 17 },
    { id: 3, title: "Book to Movie Adaptations", author: "FilmBuff101", createdAt: "2023-06-13T09:20:00Z", preview: "What are some book-to-movie adaptations that you think were done really well? Any that disappointed you?", replies: 31 },
  ])
  
  const topReaders = ref([
    { id: 1, username: "BookwormSarah", avatar: "/placeholder.svg?height=40&width=40&text=BS", booksRead: 28 },
    { id: 2, username: "LiteraryLeo", avatar: "/placeholder.svg?height=40&width=40&text=LL", booksRead: 25 },
    { id: 3, username: "PageTurnerPete", avatar: "/placeholder.svg?height=40&width=40&text=PP", booksRead: 22 },
    { id: 4, username: "NovelNancy", avatar: "/placeholder.svg?height=40&width=40&text=NN", booksRead: 20 },
    { id: 5, username: "ReadingRachel", avatar: "/placeholder.svg?height=40&width=40&text=RR", booksRead: 18 },
  ])
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark')
  }
  
  const joinChallenge = () => {
    // TODO: Implement join challenge logic
    console.log('Joining the challenge')
  }
  
  const openNewThreadModal = () => {
    // TODO: Implement new thread modal
    console.log('Opening new thread modal')
  }
  
  const openThread = (threadId) => {
    // TODO: Implement thread opening logic
    console.log('Opening thread:', threadId)
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>