<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col" @click="handleOutsideClick" @scroll="handleScroll">
    <!-- Loader component -->
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900">
      <div class="text-center">
        <!-- Loader animation -->
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-amber-600 dark:border-amber-400"></div>
        <p class="mt-4 text-lg font-semibold text-gray-800 dark:text-white"> Loading .... </p>
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
            <router-link
  v-for="(link, index) in navLinks"
  :key="index"
  :to="link.to"
  class="nav-item"
  @click="setActiveLink(index)"
>
  <link.icon />
  {{ link.text }}
</router-link>

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
                placeholder="Search books..."
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
              <!-- <option value="genre">Genre</option> -->
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
            <!-- <a :href="book.link" target="_blank" rel="noopener noreferrer"> -->
              <div class="w-full h-96 relative">
      <img
        :src="book.cover"
        :alt="book.title"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ book.author }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ book.genre }}</p>
              <div class="flex justify-between items-center">
                <span class="text-amber-600 dark:text-amber-400 font-bold">{{ book.price }}</span>
                <a 
                  v-if="book.volumeInfo && book.volumeInfo.infoLink"
                  :href="book.volumeInfo.infoLink" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out"
                >
                  {{ book.isFree ? 'Read Free' : 'Purchase' }}
                </a>
              </div>
            </div>
            <!-- </a> -->
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
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { 
    BookOpen, Search, Sun, Moon, Facebook, Instagram, Heart, 
    Menu, Home, Compass, User, X, BookOpen as ReadingList, 
    LogOut, Info 
  } from 'lucide-vue-next';
  import axios from 'axios';
  import { supabase } from '../supabase';

  // Reactive references
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');
  const isMobileMenuOpen = ref(false);
  const activeLink = ref(1); // Set to 1 for "Explore" page
  const selectedGenre = ref('All');
  const searchQuery = ref('');
  const searchType = ref('all');
  const books = ref([]); // Array for books fetched from the Google Books API
  const priceFilter = ref('all');
  const currentPage = ref(1);
  const showFavoriteAlert = ref(false);
  const favoriteAlertMessage = ref('');
  const newsletterEmail = ref('');
  const isLoading = ref(true);
  const apiKey = 'AIzaSyDMH2IGCoIzN8EKG5N2rC2QJxe2f17e3DA'; // Replace with your Google API key
  const booksPerPage = 8;

  // Navigation links
  const navLinks = [
    { to: '/home', text: 'Home', icon: Home },
    { to: '/explore', text: 'Explore', icon: Compass },
    { to: '/favorites', text: 'Favorites', icon: Heart },
    { to: '/profile', text: 'Profile', icon: User },
    { to: '/about', text: 'About', icon: Info },
  ];

  const bottomNavLinks = [
    { href: '/home', text: 'Home', icon: Home },
    { href: '/explore', text: 'Explore', icon: Compass },
    { href: '/favorites', text: 'Favorites', icon: Heart },
    { href: '/profile', text: 'Profile', icon: User },
    { href: '/about', text: 'About', icon: Info },
  ];

  const mobileNavLinks = [
    { href: '/reading-list', text: 'Reading List', icon: ReadingList },
    { href: '/logout', text: 'Logout', icon: LogOut },
    { href: '/about', text: 'About', icon: Info },
  ];

  // Genres
  const genres = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography', 'Fantasy', 'Thriller', 'Horror'];

  // Fetch books from Google Books API
  const fetchDefaultBooks = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=bestsellers&key=${apiKey}`);
      books.value = response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        genre: item.volumeInfo.categories?.[0] || 'Unknown Genre',
        cover: item.volumeInfo.imageLinks?.thumbnail?.replace('zoom=1') || 'https://via.placeholder.com/128x200?text=No+Image',
        price: item.saleInfo.saleability === 'FREE' ? 'Free' : item.saleInfo.listPrice?.amount || 'N/A',
        isFree: item.saleInfo.saleability === 'FREE',
        link: item.volumeInfo.infoLink,
        isFavorite: false,
      }));
    } catch (error) {
      console.error('Error fetching default books:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Filter books based on search, genre, and price
  const filteredBooks = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const filtered = books.value.filter((book) => {
      const genreMatch = selectedGenre.value === 'All' || book.genre === selectedGenre.value;
      const searchMatch =
        searchQuery.value === '' ||
        (searchType.value === 'all' &&
          (book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query))) ||
        (searchType.value === 'title' && book.title.toLowerCase().includes(query)) ||
        (searchType.value === 'author' && book.author.toLowerCase().includes(query)) ||
        (searchType.value === 'genre' && book.genre.toLowerCase().includes(query));
      const priceMatch =
        priceFilter.value === 'all' ||
        (priceFilter.value === 'free' && book.isFree) ||
        (priceFilter.value === 'paid' && !book.isFree);

      return genreMatch && searchMatch && priceMatch;
    });

    if (filtered.length === 0 && searchQuery.value === '' && selectedGenre.value === 'All') {
      fetchDefaultBooks(); // Fetch the default books dynamically
      return [];
    }

    return filtered;
  });

  // Display a random subset of books
  const getRandomBooks = (count) => {
    const baseBooks = books.value.length ? books.value : defaultBooks; // Use defaultBooks if books are empty
    const shuffled = [...baseBooks].sort(() => Math.random() - 0.5); // Shuffle array
    return shuffled.slice(0, count); // Return a subset
  };

  // Computed property for displayed books based on the current page
  const displayedBooks = computed(() => {
    return filteredBooks.value.slice(0, currentPage.value * booksPerPage);
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', isDarkMode.value);
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  };

  // Fetch books based on search query
  const fetchBooks = async (query, type = 'all') => {
    isLoading.value = true;
    try {
      const filter = type !== 'all' ? `+${type}:${query}` : query;
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${filter}&key=${apiKey}`);
      books.value = response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        genre: item.volumeInfo.categories?.[0] || 'Unknown Genre',
        cover: item.volumeInfo.imageLinks?.medium ||
               item.volumeInfo.imageLinks?.large ||
               item.volumeInfo.imageLinks?.thumbnail?.replace('zoom=1') || 
               'https://via.placeholder.com/128x200?text=No+Image',
        price: item.saleInfo.saleability === 'FREE' ? 'Free' : item.saleInfo.listPrice?.amount || 'N/A',
        isFree: item.saleInfo.saleability === 'FREE',
        link: item.volumeInfo.infoLink,
        isFavorite: false,
      })) || defaultBooks;
    } catch (error) {
      console.error('Error fetching books:', error);
      books.value = defaultBooks; // Use fallback books
    } finally {
      isLoading.value = false;
    }
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };

  // Set the active link in the navigation
  const setActiveLink = (index) => {
    activeLink.value = index;
  };

  // Select a genre for filtering
  const selectGenre = (genre) => {
    selectedGenre.value = genre;
    currentPage.value = 1;
  };

  // Load more books for pagination
  const loadMore = () => {
    currentPage.value++;
  };

  // Toggle book's favorite status
  const toggleFavorite = (book) => {
    book.isFavorite = !book.isFavorite;
    if (book.isFavorite) {
      addToFavorites(book);
      favoriteAlertMessage.value = `${book.title} added to favorites!`;
    } else {
      removeFromFavorites(book);
      favoriteAlertMessage.value = `${book.title} removed from favorites!`;
    }
    showFavoriteAlert.value = true;
    setTimeout(() => {
      showFavoriteAlert.value = false;
    }, 3000);
  };

  // Add book to favorites (database integration)
  const addToFavorites = async (book) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw new Error(authError.message);

      const userId = authData.user.id;
      let { data: existingBook, error: bookError } = await supabase
        .from('books')
        .select('id')
        .eq('external_id', book.id)
        .single();

      if (bookError && bookError.code !== 'PGRST116') throw new Error(bookError.message);

      if (!existingBook) {
        const { data: newBook, error: insertBookError } = await supabase
          .from('books')
          .insert({
            external_id: book.id,
            title: book.title || "Unknown Title",
            author: book.author || "Unknown Author",
            price: book.price === "Free" ? 0 : parseFloat(book.price || 0),
            genre: book.genre || "Unknown Genre",
          })
          .select('id')
          .single();

        if (insertBookError) throw new Error(insertBookError.message);
        existingBook = newBook;
      }

      const { data: newFavorite, error: favoriteError } = await supabase
        .from('favorites')
        .insert({ book_id: existingBook.id })
        .select('id')
        .single();

      if (favoriteError) throw new Error(favoriteError.message);

      const { error: favoriteUserError } = await supabase
        .from('favorites_users')
        .insert({
          favorites_id: newFavorite.id,
          user_uuid: userId,
        });

      if (favoriteUserError) throw new Error(favoriteUserError.message);

      console.log(`${book.title} added to favorites for user ${userId}.`);
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  };

  // Handle search input
  const handleSearch = () => {
    fetchBooks(searchQuery.value, searchType.value);
  };

  // Clear search input
  const clearSearch = () => {
    searchQuery.value = '';
    currentPage.value = 1;
  };

  // Handle price filter change
  const handlePriceFilterChange = () => {
    currentPage.value = 1;
  };

  // Scroll to top
  // const scrollToTop = () => {
  //   window.scrollTo(0, 0);
  // };

  // Scroll event listener
  const handleScroll = () => {
    if (window.scrollY > 300) {
      scrollToTop();
    }
  };

  // Update the dark mode class on mounted/unmounted
  onMounted(() => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    }
    window.addEventListener('scroll', handleScroll);
    fetchDefaultBooks();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  // Newsletter subscription
  const subscribeNewsletter = async () => {
    if (!newsletterEmail.value) return;
    try {
      const response = await axios.post('/newsletter/subscribe', {
        email: newsletterEmail.value,
      });
      console.log('Subscribed to newsletter:', response.data);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error.message);
    }
  };
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