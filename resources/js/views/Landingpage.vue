<template>
   <div :class="{ 'dark': isDarkMode }" class="min-h-screen">
    <div class="bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900 transition-colors duration-300">
      <header class="bg-sepia-200 bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 shadow-md backdrop-filter backdrop-blur-md transition-colors sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <BookOpen class="h-8 w-8 text-amber-600 dark:text-amber-400 animate-float" />
            <span class="text-2xl font-bold text-gray-800 dark:text-white animate-fade-in">E-BookSeekr</span>
          </div>
          <div class="flex items-center space-x-4">
            <nav class="hidden md:flex space-x-6">
              <a
                v-for="(link, index) in navLinks"
                :key="link.href"
                :href="link.href"
                :class="['text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors', { 'font-bold': activeLink === index }]"
                @click="setActiveLink(index)"
              >
                <span class="animate-slide-in" :style="{ animationDelay: `${index * 0.1}s` }">{{ link.text }}</span>
              </a>
            </nav>
            <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Sun v-if="isDarkMode" class="h-6 w-6 text-gray-400" />
              <Moon v-else class="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>
        <main>
          <section class="py-20 text-center relative overflow-hidden">
            <div class="container mx-auto px-4 relative z-10">
              <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-teal-600 dark:from-amber-400 dark:to-teal-400 animate-text-shimmer">
                Find Your Next Favorite Book Today!
              </h1>
              <p class="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in">
                At E-BookSeekr, we make it seamless to discover, buy, and read e-books online. Browse through an extensive library of genres and authors, ensuring you never run out of captivating reads.
              </p>
              <router-link to="/auth" class="inline-block">
                <button class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-bounce">
                  Get Started
                </button>
              </router-link>
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-teal-500 to-amber-500 opacity-10 dark:opacity-20 animate-gradient-x"></div>
          </section>
    
          <section class="py-16 bg-white dark:bg-gray-800">
            <div class="container mx-auto px-4">
              <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="md:w-1/2 mb-8 md:mb-0">

                        <!--this can be fix-->
                        <!-- Container for Lottie animation -->

                 <div id="lottie-container" class="lottie-size"></div>
                </div>
                <div class="md:w-1/2 md:pl-12">
                  <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white animate-fade-in">Explore the Benefits of E-BookSeekr</h2>
                  <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 animate-fade-in">
                    With E-BookSeekr, you can easily discover e-books and get redirected to other websites where you can either purchase them or read them for free. Our reliable platform offers a wide variety of titles, making it simple for you to find your next great read.
                  </p>
                  <ul class="space-y-4">
                    <li v-for="(feature, index) in features" :key="index" class="flex items-center animate-slide-in" :style="{ animationDelay: `${index * 0.1}s` }">
                      <CheckCircle class="h-6 w-6 text-amber-500 mr-2" />
                      <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section id="features" class="py-16 bg-gray-100 dark:bg-gray-900">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white animate-fade-in">Unleash the Power of E-BookSeekr</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(feature, index) in featureCards" :key="index" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" :style="{ animationDelay: `${index * 0.2}s` }">
                  <div class="bg-amber-100 dark:bg-amber-900 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                    <component :is="feature.icon" class="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{{ feature.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </section>
    
          <section id="mission" class="py-16 bg-white dark:bg-gray-800">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white animate-fade-in">Our Mission</h2>
              <div class="max-w-3xl mx-auto text-center">
                <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 animate-fade-in">
                  At E-BookSeekr, our mission is to revolutionize the way you discover and engage with digital literature. We are dedicated to curating an expansive collection of e-books
                </p>
                <p class="text-lg text-gray-600 dark:text-gray-300 animate-fade-in">
                  We're on a mission to ignite the love for reading in people across the globe, one e-book at a time.
                </p>
              </div>
            </div>
          </section>
    
          <section id="faq" class="py-16 bg-amber-300 dark:bg-amber-900">
            <div class="container mx-auto px-4">
              <h2 class="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white animate-fade-in">FAQ</h2>
              <h3 class="text-xl mb-8 text-center text-gray-700 dark:text-gray-300 animate-fade-in">Frequently Asked Questions</h3>
              <p class="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in">
                Find answers to your most pressing questions about E-BookSeekr, our services, and how to make the most of your reading experience. If you can't find what you're looking for, don't hesitate to reach out to our friendly customer support team.
              </p>
              <div class="flex justify-center">
                <button @click="getHelp" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300 ease-in-out">
                  Get Help
                </button>
              </div>
            </div>
          </section>
    
          <section id="contact" class="py-16 bg-white dark:bg-gray-800">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white animate-fade-in">Contact Us</h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center animate-fade-in">Have any questions or feedback? We'd love to hear from you! Drop us a message, and we'll get back to you soon.</p>
              <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md animate-fade-in-up">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="message" class="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    class="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  ></textarea>
                </div>
                <button type="submit" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Send Message</button>
              </form>
            </div>
          </section>
    
          <section class="py-16 bg-gray-100 dark:bg-gray-900">
            <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white animate-fade-in">Meet Our Team</h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 animate-fade-in">
                Get to know the people who make it all happen. We're passionate about books and technology, working together to deliver the best e-book experience.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div v-for="(dev, index) in developers" :key="dev.name" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" :style="{ animationDelay: `${index * 0.2}s` }">
                  <img :src="dev.avatar" :alt="dev.name" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{{ dev.name }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">{{ dev.role }}</p>
                  <div class="flex justify-center space-x-3">
                    <a v-if="dev.socialLinks.github" :href="dev.socialLinks.github" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      <Github class="h-5 w-5" />
                    </a>
                    <a v-if="dev.socialLinks.facebook" :href="dev.socialLinks.facebook" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      <Facebook class="h-5 w-5" />
                    </a>
                    <a v-if="dev.socialLinks.instagram" :href="dev.socialLinks.instagram" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      <Instagram class="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
    
        <footer class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-12">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="animate-fade-in">
                <h3  class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">About Us</h3>
                <p class="text-sm">
                  E-BookSeekr was built with a passion for making books accessible to everyone. Whether you're a casual reader or a bookworm, we bring the best e-books to you, anytime, anywhere.
                </p>
              </div>
              <div class="animate-fade-in" style="animation-delay: 0.2s;">
                <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#faq" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">FAQ</a></li>
                  <li><a href="#contact" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div class="animate-fade-in" style="animation-delay: 0.4s;">
                <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Stay Connected</h3>
                <p class="text-sm mb-4">Join our newsletter for the latest releases and reading tips.</p>
                <form @submit.prevent="subscribeNewsletter" class="flex">
                  <input 
                    type="email" 
                    v-model="newsletterEmail" 
                    placeholder="Your email" 
                    class="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                  <button 
                    type="submit" 
                    class="bg-amber-600 text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <div class="flex justify-center space-x-4 mb-4">
                <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  <Facebook class="h-6 w-6" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  <Instagram class="h-6 w-6" />
                </a>
              </div>
              <p class="mb-10">&copy; {{ new Date().getFullYear() }} E-BookSeekr. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>


    <!--this is for future purposes!-->
    <!--loader need to be fix since this is static.-->
    <!--ALREADY IMPORTED!-->
    
    <!-- <l-reuleaux
      size="37"
      stroke="5"
      stroke-length="0.15"
      bg-opacity="0.1"
      speed="1.2" 
      color="black" 
    ></l-reuleaux> -->


  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import lottie from 'lottie-web';
  import { ref } from 'vue'
  import { BookOpen, CheckCircle, Github, Facebook, Instagram, Sun, Moon, Search, Star, Bookmark } from 'lucide-vue-next'
  import { reuleaux } from 'ldrs'

reuleaux.register()


  const imageSrc = ref('/book.json'); // Path to your JSON file

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById('lottie-container'), // The container to render the animation
    path: imageSrc.value, // Use the ref for the path
    renderer: 'svg', // Renderer (svg, canvas, html)
    loop: true,      // Set to true if you want the animation to loop
    autoplay: true,  // Set to true to autoplay the animation
  });
});

  const isDarkMode = ref(false)
  const activeLink = ref(0)
  const form = ref({ name: '', email: '', message: '' })
  const newsletterEmail = ref('')
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }
  
  const setActiveLink = (index) => {
    activeLink.value = index
  }
  
  const handleSubmit = () => {
    console.log('Form submitted:', form.value)
    form.value = { name: '', email: '', message: '' }
  }
  
  const subscribeNewsletter = () => {
    console.log('Newsletter subscription:', newsletterEmail.value)
    newsletterEmail.value = ''
  }
  
  const getHelp = () => {
    console.log('Get Help clicked')
  }
  
  const navLinks = [
    { href: '#features', text: 'Features' },
    { href: '#mission', text: 'Our Mission' },
    { href: '#faq', text: 'FAQ' },
    { href: '#contact', text: 'Contact' },
  ]
  
  const features = [
    'Wide range of e-books',
    'User-friendly interface',
    'Easy navigation and search',
    'Bookmark your favorite e-books',
  ]
  
  const featureCards = [
    {
      title: 'Search Functionality',
      description: 'Find e-books by title, author, or genre.',
      icon: Search,
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get suggestions based on your reading history.',
      icon: Star,
    },
    {
      title: 'Bookmarking',
      description: 'Save your favorite e-books for easy access.',
      icon: Bookmark,
    },
  ]
  
  const developers = [
    {
      name: 'Kurt Reserva',
      role: 'Frontend Developer',
      avatar: '/kurty.png',
      socialLinks: {
        github: 'https://github.com/kurtreserva',
        facebook: 'https://facebook.com/cyreljohnrollo',
        instagram: 'https://instagram.com/kurtreserva',
      },
    },
    {
      name: 'Lawrence Ave Sabrido',
      role: 'UX/UI Designer',
      avatar: '/lawlaw.jpg',
      socialLinks: {
        github: 'https://github.com/lawrencesabrido',
        facebook: 'https://facebook.com/cyreljohnrollo',
        instagram: 'https://instagram.com/lawrencesabrido',
      },
    },
    {
      name: 'Cyrel John Rollo',
      role: 'Backend Developer',
      avatar: '/cyrel.png',
      socialLinks: {
        github: 'https://github.com/cyreljohnrollo',
        facebook: 'https://facebook.com/cyreljohnrollo',
        instagram: 'https://instagram.com/lawrencesabrido',
      },
    },
  ]
  </script>
  
  <style>
  html{
    overflow-x: hidden;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fade-in-up {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
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
  
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out;
  }
  
  .animate-slide-in {
    animation: slide-in 0.5s ease-out;
  }
  
  .animate-text-shimmer {
    background-size: 200% auto;
    animation: text-shimmer 3s linear infinite;
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 15s ease infinite;
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
  .lottie-size {
  width: 350px;  /* Set a specific width */
  height: 350px; /* Set a specific height */
  margin: 0 auto; /* Center the animation horizontally */
}
</style>