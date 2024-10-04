<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-indigo-900">
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
                <li><router-link to="/explore" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Explore</router-link></li>
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
        <transition
          enter-active-class="transition ease-out duration-100 transform"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75 transform"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="isMobileMenuOpen" class="md:hidden absolute top-16 right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10">
            <button v-if="isLoggedIn" class="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <UserIcon class="h-5 w-5 inline-block mr-2" />
              Profile
            </button>
            <button @click="toggleDarkMode" class="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <SunIcon v-if="isDarkMode" class="h-5 w-5 inline-block mr-2" />
              <MoonIcon v-else class="h-5 w-5 inline-block mr-2" />
              {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
            <hr class="my-2 border-gray-200 dark:border-gray-700" />
            <router-link to="/" class="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Home</router-link>
            <router-link to="/explore" class="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Explore</router-link>
            <router-link to="/community" class="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Community</router-link>
            <router-link to="#" class="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">About</router-link>
          </div>
        </transition>
      </div>
    </header>

    <main class="flex-grow">
      <!-- New Auth Section -->
      <section v-if="!isLoggedIn" class="py-12 sm:py-20 text-center">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Welcome to E-LibraryHub
          </h1>
          <p class="text-lg sm:text-xl mb-8 text-gray-600 dark:text-gray-300">Sign up or log in to access your digital library</p>
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button @click="showSignupModal = true" class="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
              Sign Up
            </button>
            <button @click="showLoginModal = true" class="w-full sm:w-auto px-6 py-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
              Log In
            </button>
          </div>
        </div>
      </section>

      <!-- Main Content (only visible when logged in) -->
      <div v-if="isLoggedIn">
        <section class="py-12 sm:py-20 text-center">
          <div class="container mx-auto px-4">
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
              Dive into a World of Stories
            </h1>
            <p class="text-lg sm:text-xl mb-8 text-gray-600 dark:text-gray-300">Discover, read, and connect with your next favorite book</p>
            <div class="flex flex-col sm:flex-row justify-center mb-8">
              <div class="relative w-full sm:w-auto sm:max-w-md mb-4 sm:mb-0">
                <input
                  v-model="searchQuery"
                  class="w-full px-4 py-2 pl-10 rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Search for books, authors, or genres..."
                />
                <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button
                @click="searchBooks"
                class="mt-4 sm:mt-0 sm:ml-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Explore
              </button>
            </div>
            <div class="flex flex-wrap justify-center items-center space-x-2 space-y-2">
              <span class="text-gray-600 dark:text-gray-300 w-full sm:w-auto">Popular genres:</span>
              <div class="flex flex-wrap justify-center">
                <button
                  v-for="genre in popularGenres"
                  :key="genre"
                  class="m-1 px-3 py-1 text-sm bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors"
                >
                  {{ genre }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="py-12 sm:py-16 bg-white dark:bg-gray-800">
          <div class="container mx-auto px-4">
            <h2 class="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Book of the Day</h2>
            <div class="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
              <div class="relative w-64 h-96">
                <img
                  :src="`/placeholder.svg?height=384&width=256&text=Featured Book`"
                  alt="Featured Book Cover"
                  class="w-full h-full object-cover rounded-lg shadow-lg"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <h3 class="text-xl font-bold mb-1">{{ bookOfTheDay.title }}</h3>
                  <p class="text-sm">by {{ bookOfTheDay.author }}</p>
                </div>
              </div>
              <div class="max-w-md text-center md:text-left">
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ bookOfTheDay.description }}</p>
                <div class="flex justify-center md:justify-start space-x-4 mb-4">
                  <span class="flex items-center text-yellow-500">
                    <StarIcon class="h-5 w-5 mr-1" />
                    {{ bookOfTheDay.rating }}
                  </span>
                  <span class="text-gray-600 dark:text-gray-300">{{ bookOfTheDay.genre }}</span>
                </div>
                <button class="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                  Start Reading
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="py-12 sm:py-16">
          <div class="container mx-auto px-4">
            <h2 class="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Featured Books</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div
                v-for="book in featuredBooks"
                :key="book.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div class="relative h-48 sm:h-64">
                  <img
                    :src="`/placeholder.svg?height=256&width=192&text=Book ${book.id}`"
                    :alt="`Book ${book.id} Cover`"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="absolute bottom-2 left-2 right-2 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 class="font-bold">{{ book.title }}</h3>
                    <p class="text-sm">{{ book.author }}</p>
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{ book.genre }}</span>
                    <span class="flex items-center text-yellow-500">
                      <StarIcon class="h-4 w-4 mr-1" />
                      {{ book.rating }}
                    </span>
                  </div>
                  <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-600 dark:bg-indigo-400" :style="{ width: `${book.progress}%` }"></div>
                  </div>
                  <p class="text-xs text-right mt-1 text-gray-600 dark:text-gray-300">{{ book.progress }}% completed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-12 sm:py-16 bg-indigo-100 dark:bg-gray-900">
          <div class="container mx-auto px-4">
            <h2 class="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Join Our Reading Challenge</h2>
            <div class="max-w-2xl mx-auto text-center">
              <p class="text-lg mb-6 text-gray-600 dark:text-gray-300">Read 50 books in a year and unlock exclusive rewards!</p>
              <div class="mb-8">
                <div class="h-4 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
                  <div class="h-full bg-indigo-600 dark:bg-indigo-400" :style="{ width: `${challengeProgress}%` }"></div>
                </div>
                <p class="mt-2 text-gray-600 dark:text-gray-300">{{ challengeProgress }}% completed ({{ booksRead }} / 50 books)</p>
              </div>
              <button class="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                Join the Challenge
              </button>
            </div>
          </div>
        </section>

        <section class="py-12 sm:py-16 bg-white dark:bg-gray-800">
          <div class="container mx-auto px-4">
            <h2 class="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Your Library</h2>
            <div class="flex justify-center mb-8">
              <button @click="openCreateBookModal" class="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                Create New Book
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div
                v-for="book in userBooks"
                :key="book.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div class="relative h-48 sm:h-64">
                  <img
                    :src="book.coverUrl || `/placeholder.svg?height=256&width=192&text=Book ${book.id}`"
                    :alt="`${book.title} Cover`"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="absolute bottom-2 left-2 right-2 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 class="font-bold">{{ book.title }}</h3>
                    <p class="text-sm">{{ book.author }}</p>
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{ book.genre }}</span>
                    <div>
                      <button @click="editBook(book)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-2">
                        <PencilIcon class="h-5 w-5" />
                      </button>
                      <button @click="deleteBook(book.id)" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ book.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="bg-gray-100 dark:bg-gray-800 mt-16">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4 text-gray-800 dark:text-white">About Us</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">E-LibraryHub is your digital sanctuary for literature. Dive into our vast collection of e-books spanning various genres and discover your next literary adventure.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul class="text-sm space-y-2">
              <li><router-link to="#" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Privacy Policy</router-link></li>
              <li><router-link to="#" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Terms of Service</router-link></li>
              <li><router-link to="#" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">FAQ</router-link></li>
              <li><router-link to="#" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Contact Us</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4 text-gray-800 dark:text-white">Stay Connected</h3>
            <p class="text-sm mb-4 text-gray-600 dark:text-gray-300">Join our newsletter for the latest releases and reading tips.</p>
            <div class="flex flex-col sm:flex-row">
              <input
                v-model="email"
                class="w-full px-4 py-2 mb-2 sm:mb-0 sm:rounded-l-full rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Your email"
              />
              <button
                @click="subscribe"
                class="px-6 py-2 bg-indigo-600 text-white sm:rounded-r-full rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>&copy; {{ currentYear }} E-LibraryHub. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Signup Modal -->
    <div v-if="showSignupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg max-w-md w-full">
        <h3 class="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">Sign Up</h3>
        <form @submit.prevent="signup">
          <div class="mb-4">
            <label for="signup-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" id="signup-email" v-model="signupForm.email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div class="mb-4">
            <label for="signup-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" id="signup-password" v-model="signupForm.password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
            <button type="submit" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors mb-2 sm:mb-0">
              Sign Up
            </button>
            <button @click="signupWithGoogle" type="button" class="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors flex items-center justify-center">
              <img src="#" alt="Google logo" class="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>
        </form>
        <button @click="showSignupModal = false" class="mt-4 text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
          Close
        </button>
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg max-w-md w-full">
        <h3 class="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">Log In</h3>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="login-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" id="login-email" v-model="loginForm.email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div class="mb-4">
            <label for="login-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" id="login-password" v-model="loginForm.password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
            <button type="submit" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors mb-2 sm:mb-0">
              Log In
            </button>
            <button @click="loginWithGoogle" type="button" class="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors flex items-center justify-center">
              <img src="#" alt="Google logo" class="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>
        </form>
        <button @click="showLoginModal = false" class="mt-4 text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
          Close
        </button>
      </div>
    </div>

    <!-- Create/Edit Book Modal -->
    <div v-if="showBookModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg max-w-md w-full">
        <h3 class="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">{{ editingBook ? 'Edit Book' : 'Create New Book' }}</h3>
        <form @submit.prevent="saveBook">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input type="text" id="title" v-model="bookForm.title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div class="mb-4">
            <label for="author" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
            <input type="text" id="author" v-model="bookForm.author" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div class="mb-4">
            <label for="genre" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
            <input type="text" id="genre" v-model="bookForm.genre" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea id="description" v-model="bookForm.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          </div>
          <div class="flex justify-between">
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors">
              {{ editingBook ? 'Save Changes' : 'Create Book' }}
            </button>
            <button @click="closeBookModal" type="button" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BookOpenIcon, SearchIcon, UserIcon, StarIcon, SunIcon, MoonIcon, PencilIcon, TrashIcon, MenuIcon, XIcon } from 'lucide-vue-next'

const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')
const isLoggedIn = ref(false)
const showSignupModal = ref(false)
const showLoginModal = ref(false)
const showBookModal = ref(false)
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
const email = ref('')
const signupForm = ref({ email: '', password: '' })
const loginForm = ref({ email: '', password: '' })
const bookForm = ref({ title: '', author: '', genre: '', description: '' })
const editingBook = ref(null)

const currentYear = computed(() => new Date().getFullYear())

const popularGenres = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'Self-Help']

const bookOfTheDay = {
  title: 'The Midnight Library',
  author: 'Matt Haig',
  description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
  rating: 4.2,
  genre: 'Fiction'
}

const featuredBooks = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', rating: 4.8, progress: 75 },
  { id: 2, title: 'The Silent Patient', author: 'Alex Michaelides', genre: 'Thriller', rating: 4.5, progress: 30 },
  { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Sci-Fi', rating: 4.7, progress: 50 },
  { id: 4, title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab', genre: 'Fantasy', rating: 4.3, progress: 90 },
]

const userBooks = [
  { id: 1, title: 'My First Novel', author: 'John Doe', genre: 'Fiction', description: 'A thrilling adventure through time and space.' },
  { id: 2, title: 'Cooking with Love', author: 'Jane Smith', genre: 'Cookbook', description: 'Delicious recipes for every occasion.' },
]

const challengeProgress = 30
const booksRead = 15

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const searchBooks = () => {
  console.log('Searching for:', searchQuery.value)
  // Implement search functionality
}

const subscribe = () => {
  console.log('Subscribing email:', email.value)
  // Implement newsletter subscription
}

const signup = () => {
  console.log('Signing up:', signupForm.value)
  // Implement signup logic
  isLoggedIn.value = true
  showSignupModal.value = false
}

const login = () => {
  console.log('Logging in:', loginForm.value)
  // Implement login logic
  isLoggedIn.value = true
  showLoginModal.value = false
}

const signupWithGoogle = () => {
  console.log('Signing up with Google')
  // Implement Google signup
  isLoggedIn.value = true
  showSignupModal.value = false
}

const loginWithGoogle = () => {
  console.log('Logging in with Google')
  // Implement Google login
  isLoggedIn.value = true
  showLoginModal.value = false
}

const openCreateBookModal = () => {
  editingBook.value = null
  bookForm.value = { title: '', author: '', genre: '', description: '' }
  showBookModal.value = true
}

const editBook = (book) => {
  editingBook.value = book
  bookForm.value = { ...book }
  showBookModal.value = true
}

const saveBook = () => {
  if (editingBook.value) {
    // Update existing book
    const index = userBooks.findIndex(book => book.id === editingBook.value.id)
    if (index !== -1) {
      userBooks[index] = { ...userBooks[index], ...bookForm.value }
    }
  } else {
    // Create new book
    userBooks.push({
      id: userBooks.length + 1,
      ...bookForm.value
    })
  }
  closeBookModal()
}

const deleteBook = (id) => {
  const index = userBooks.findIndex(book => book.id === id)
  if (index !== -1) {
    userBooks.splice(index, 1)
  }
}

const closeBookModal = () => {
  showBookModal.value = false
  editingBook.value = null
  bookForm.value = { title: '', author: '', genre: '', description: '' }
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Add any global styles here */
</style>