<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-amber-900 transition-colors duration-300">
     <!-- Loader component -->
     <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900">
      <div class="text-center">
        <!-- Loader animation -->
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-amber-600 dark:border-amber-400"></div>
        <p class="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Loading...</p>
      </div>
    </div>
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
      <div class="relative w-full max-w-md aspect-square">
        <div class="absolute inset-0 bg-amber-200 dark:bg-amber-800 rounded-lg shadow-2xl transform -rotate-6 transition-all duration-300 ease-in-out"></div>
        <div class="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform rotate-3 transition-all duration-300 ease-in-out"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <BookOpen class="w-32 h-32 text-amber-600 dark:text-amber-400 animate-float" />
            <h1 class="mt-4 text-3xl font-bold text-gray-800 dark:text-white">E-BookSeekr</h1>
            <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">Your digital library awaits</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side: Auth form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-md w-full space-y-8">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
            {{ activeTab === 'signin' ? 'Welcome Back!' : 'Join E-BookSeekr' }}
          </h2>
        </div>
        <div class="bg-amber-50 dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden transition-colors duration-300">
          <div class="relative">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-amber-600"></div>
            <div class="p-8">
              <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                {{ activeTab === 'signin' ? 'Sign In' : 'Sign Up' }}
              </h2>
              <transition name="fade" mode="out-in">
                <form v-if="activeTab === 'signin'" key="signin" @submit.prevent="handleSignIn" class="space-y-6">
                  <div class="relative">
                    <input id="email" name="email" type="email" autocomplete="email" required
                      v-model="signinForm.email"
                      class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                      placeholder="Email address"
                    >
                    <label for="email" class=" ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                      Email address
                    </label>
                  </div>
                  <div class="relative">
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                      v-model="signinForm.password"
                      class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                      placeholder="Password"
                    >
                    <label for="password" class=" ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div>
                    <button type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <form v-else key="signup" @submit.prevent="handleSignUp" class="space-y-6">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="relative">
                      <input id="signup-firstname" name="firstname" type="text" autocomplete="given-name" required
                        v-model="signupForm.firstName"
                        class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                        placeholder="First name"
                      >
                      <label for="signup-firstname" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                        First name
                      </label>
                    </div>
                    <div class="relative">
                      <input id="signup-lastname" name="lastname" type="text" autocomplete="family-name" required
                        v-model="signupForm.lastName"
                        class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                        placeholder="Last name"
                      >
                      <label for="signup-lastname" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                        Last name
                      </label>
                    </div>
                  </div>
                  <div class="relative">
                    <input id="signup-email" name="email" type="email" autocomplete="email" required
                      v-model="signupForm.email"
                      class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                      placeholder="Email address"
                    >
                    <label for="signup-email" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                      Email address
                    </label>
                  </div>
                  <div class="relative">
                    <input id="signup-password" name="password" type="password" autocomplete="new-password" required
                      v-model="signupForm.password"
                      class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                      placeholder="Password"
                    >
                    <label for="signup-password" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div class="relative">
                    <input id="signup-birthdate" name="birthdate" type="date" required
                      v-model="signupForm.birthdate"
                      class="mt-3 peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-amber-600 transition-colors duration-300"
                    >
                    <label for="signup-birthdate" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                      Birthdate
                    </label>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="relative">
                      <select id="signup-country" name="country" required 
                        v-model="signupForm.country"
                        @change="updateRegions"
                        class="mt-3 peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-amber-600 transition-colors duration-300"
                      >
                        <option value="" disabled selected>Select country</option>
                        <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
                      </select>
                      <label for="signup-country" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                        Country
                      </label>
                    </div>
                    <div class="relative">
                      <select id="signup-region" name="region" required
                        v-model="signupForm.region"
                        class="mt-3 peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-amber-600 transition-colors duration-300"
                      >
                        <option value="" disabled selected>Select region</option>
                        <option v-for="region in regions" :key="region.code" :value="region.code">{{ region.name }}</option>
                      </select>
                      <label for="signup-region" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                        Region
                      </label>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <input id="terms" name="terms" type="checkbox" required
                      v-model="signupForm.terms"
                      class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded transition-colors duration-300"
                    >
                    <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300 transition-colors duration-300">
                      I agree to the <a href="#" class="text-amber-600 hover:text-amber-500 transition-colors duration-300">Terms and Conditions</a>
                    </label>
                  </div>
                  <div>
                    <button type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </transition>
              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-amber-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400 transition-colors duration-300">Or continue with</span>
                  </div>
                </div>
                <div class="mt-6 grid grid-cols-2 gap-3">
                  <div class="col-span-2 flex justify-center">
                    <button @click="handleGoogleAuth"
                      class="w-full max-w-xs flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300">
                      <img class="h-5 w-5  mr-2" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-8 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
              <p class="text-xs text-center leading-5 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                {{ activeTab === 'signin' ? "Don't have an account?" : "Already have an account?" }}
                <button
                  @click="toggleTab"
                  class="font-medium text-amber-600 hover:text-amber-500 transition-colors duration-300"
                >
                  {{ activeTab === 'signin' ? 'Sign up' : 'Sign in' }}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { SunIcon, MoonIcon, BookOpen, Facebook } from 'lucide-vue-next'

const activeTab = ref('signin')
const isDarkMode = ref(false)
const isLoading = ref(true)

// Loader functionality
onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false;
    // Load the Lottie animation after the loading is complete
    loadLottieAnimation();
  }, 2000); // 2 seconds loading time, adjust as needed
});

const signinForm = reactive({
  email: '',
  password: ''
})

const signupForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthdate: '',
  country: '',
  region: '',
  terms: false
})

const countries = ref([])
const regions = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
    const data = await response.json()
    countries.value = data.map(country => ({
      name: country.name.common,
      code: country.cca2
    })).sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
})

const updateRegions = async () => {
  if (!signupForm.country) return

  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${signupForm.country}`)
    const data = await response.json()
    
    if (data[0].capital) {
      regions.value = [{ name: data[0].capital[0], code: 'CAPITAL' }]
    }
    
    if (data[0].region) {
      regions.value.push({ name: data[0].region, code: 'REGION' })
    }
    
    if (data[0].subregion) {
      regions.value.push({ name: data[0].subregion, code: 'SUBREGION' })
    }
  } catch (error) {
    console.error('Error fetching regions:', error)
    regions.value = []
  }
}

const handleSignIn = () => {
  console.log('Sign In:', signinForm)
  // Implement sign in logic here
}

const handleSignUp = () => {
  console.log('Sign Up:', signupForm)
  // Implement sign up logic here
}

const handleGoogleAuth = () => {
  console.log('Google Auth')
  // Implement Google authentication logic here
}

const toggleTab = () => {
  activeTab.value = activeTab.value === 'signin' ? 'signup' : 'signin'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

body {
  font-family: 'Lora', serif;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Add margin to placeholders */
input::placeholder,
select::placeholder {
  margin-left: 0.5rem;
}
</style>