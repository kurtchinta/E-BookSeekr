<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col" @click="handleOutsideClick">
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
              :class="['text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors', { 'font-bold': link.text === 'Profile' }]"
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

      <main class="container mx-auto px-4 py-8 flex-grow pb-24 md:pb-8">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Your Reading Journey</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500 dark:bg-amber-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
              <div class="relative z-10">
                <div class="relative w-32 h-32 mx-auto mb-4">
                  <img :src="user.avatar" :alt="user.name" class="w-full h-full rounded-full border-4 border-amber-500 dark:border-amber-600 object-cover" />
                  <label for="avatar-upload" class="absolute bottom-0 right-0 bg-amber-600 hover:bg-amber-700 text-white rounded-full p-2 cursor-pointer transition duration-300 ease-in-out">
                    <Plus class="h-5 w-5" />
                  </label>
                  <input id="avatar-upload" type="file" accept="image/*" @change="handleAvatarUpload" class="hidden" />
                </div>
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{{ user.name }}</h2>
                <p class="text-gray-600 dark:text-gray-400 mb-2">@{{ user.username }}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-2">{{ user.email }}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-2">Born: {{ new Date(user.birthdate).toLocaleDateString() }}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4">Location: {{ user.region }}, {{ user.country }}</p>
                <button @click="openEditModal" class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div class="md:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reading Stats</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="relative inline-flex items-center justify-center">
                    <svg class="w-20 h-20">
                      <circle class="text-gray-300 dark:text-gray-600" stroke-width="5" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40" />
                      <circle class="text-amber-600 dark:text-amber-400" stroke-width="5" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40" />
                    </svg>
                    <span class="absolute text-xl font-bold text-gray-800 dark:text-white">{{ user.booksBrowsed }}</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mt-2">Books Browsed</p>
                </div>
                <div class="text-center">
                  <div class="relative inline-flex items-center justify-center">
                    <svg class="w-20 h-20">
                      <circle class="text-gray-300 dark:text-gray-600" stroke-width="5" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40" />
                      <circle class="text-amber-600 dark:text-amber-400" stroke-width="5" :stroke-dasharray="circumference" :stroke-dashoffset="favoriteDashOffset" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40" />
                    </svg>
                    <span class="absolute text-xl font-bold text-gray-800 dark:text-white">{{ user.favoriteBooks }}</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mt-2">Favorite Books</p>
                </div>
              </div>
            </div>
            
            <section id="reading">
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reading List</h3>
                <ul class="space-y-4">
                  <li v-for="book in user.readingList" :key="book.id" class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg transition-transform duration-300 hover:scale-105">
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-gray-200">{{ book.title }}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ book.author }}</p>
                    </div>
                    <a :href="book.link" class="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                      <ExternalLink class="h-5 w-5" />
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <!-- Bottom Navbar (Mobile Only) -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
        <div class="flex justify-around items-center h-16">
          <a
            v-for="(link, index) in bottomNavLinks"
            :key="link.href"
            :href="link.href"
            class="flex flex-col items-center justify-center w-full h-full"
            :class="{ 'text-amber-600 dark:text-amber-400': link.text === 'Profile', 'text-gray-600 dark:text-gray-400': link.text !== 'Profile' }"
          >
            <component :is="link.icon" class="h-6 w-6" />
            <span class="text-xs mt-1">{{ link.text }}</span>
          </a>
        </div>
      </nav>

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
            <p class="mb-20 md:mb-0">&copy; {{ new Date().getFullYear() }} E-BookSeekr. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <!-- Edit Profile Modal -->
      <transition name="modal">
        <div v-if="isEditModalOpen" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeEditModal"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4" id="modal-title">Edit Profile</h3>
                <form @submit.prevent="saveProfile" class="space-y-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input type="text" id="name" :value="user.name" disabled class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm">
                  </div>
                  <div>
                    <label for="username" class="block text-sm font-medium  text-gray-700 dark:text-gray-300 mb-1">Username</label>
                    <input type="text" id="username" v-model="editedUser.username" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm">
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" id="email" :value="user.email" disabled class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm">
                  </div>
                  <div>
                    <label for="birthdate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Birthdate</label>
                    <input type="text" id="birthdate" :value="new Date(user.birthdate).toLocaleDateString()" disabled class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm">
                  </div>
                  <div>
                    <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                    <input type="text" id="country" :value="user.country" disabled class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm">
                  </div>
                  <div>
                    <label for="region" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
                    <input type="text" id="region" :value="user.region" disabled class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm">
                  </div>
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:col-start-2 sm:text-sm">
                      Save Changes
                    </button>
                    <button type="button" @click="closeEditModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Moon, Sun, Menu, BookOpen, Home, Compass, Heart, User, Info, ExternalLink, Facebook, Instagram, Plus, LogOut } from 'lucide-vue-next';

const isDarkMode = ref(false);
const isMobileMenuOpen = ref(false);
const newsletterEmail = ref('');
const isEditModalOpen = ref(false);
const isLoading = ref(true);

const navLinks = [
  { href: '/home', text: 'Home', icon: Home },
  { href: '/explore', text: 'Explore', icon: Compass },
  { href: '/favorites', text: 'Favorites', icon: Heart },
  { href: '/profile', text: 'Profile', icon: User },
  { href: '/about', text: 'About', icon: Info },
];

const mobileNavLinks = [
  { href: '/reading-list', text: 'Reading List', icon: BookOpen },
  { href: '/logout', text: 'Logout', icon: LogOut },
  { href: '/about', text: 'About', icon: Info },
];

const bottomNavLinks = [
  { href: '/home', text: 'Home', icon: Home },
  { href: '/explore', text: 'Explore', icon: Compass },
  { href: '/favorites', text: 'Favorites', icon: Heart },
  { href: '/profile', text: 'Profile', icon: User },
];

const generateRandomUsername = () => {
  return 'user_' + Math.random().toString(36).substr(2, 8);
};

const user = ref({
  name: 'Kurt Reserva',
  username: generateRandomUsername(),
  email: 'kurtreserva18@gmail.com',
  avatar: '/kurty.png',
  birthdate: '2003-10-05',
  country: 'Phillipines',
  region: 'Caraga',
  booksBrowsed: 129,
  favoriteBooks: 15,
  readingList: [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', link: '#' },
    { id: 2, title: '1984', author: 'George Orwell', link: '#' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', link: '#' },
  ],
});

const editedUser = ref({ ...user.value });

const circumference = 2 * Math.PI * 30;
const dashOffset = computed(() => {
  return circumference - (user.value.booksBrowsed / 200) * circumference;
});

const favoriteDashOffset = computed(() => {
  return circumference - (user.value.favoriteBooks / 50) * circumference;
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value);
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const openEditModal = () => {
  editedUser.value = { ...user.value };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const saveProfile = () => {
  user.value.username = editedUser.value.username;
  closeEditModal();
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const subscribeNewsletter = () => {
  console.log('Subscribing to newsletter:', newsletterEmail.value);
  newsletterEmail.value = '';
};

const handleOutsideClick = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest('.mobile-menu')) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  document.documentElement.classList.toggle('dark', isDarkMode.value);

  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); // 2 seconds loading time, adjust as needed
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>