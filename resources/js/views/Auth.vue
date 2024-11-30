    <template>
        <div :class="{ dark: isDarkMode }" class="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-amber-900 transition-colors duration-300">
            <!-- Loader component -->
            <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-sepia-100 to-amber-100 dark:from-gray-900 dark:to-amber-900">
                <div class="text-center">
                    <!-- Loader animation -->
                    <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-amber-600 dark:border-amber-400">
                    </div>
                    <p class="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                        Loading...
                    </p>
                </div>
            </div>
            <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div class="relative w-full max-w-md aspect-square">
                    <div class="absolute inset-0 bg-amber-200 dark:bg-amber-800 rounded-lg shadow-2xl transform -rotate-6 transition-all duration-300 ease-in-out">
                    </div>
                    <div class="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform rotate-3 transition-all duration-300 ease-in-out">
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center">
                            <BookOpen class="w-32 h-32 text-amber-600 dark:text-amber-400 animate-float"
                            />
                            <h1 class="mt-4 text-3xl font-bold text-gray-800 dark:text-white">
                                E-BookSeekr
                            </h1>
                            <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                Your digital library awaits
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Right side: Auth form -->
            <div class="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div class="max-w-md w-full space-y-8">
                    <div class="flex justify-between items-center">
                        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
                            {{ activeTab === "signin" ? "Welcome Back!" : "Join E-BookSeekr" }}
                        </h2>
                    </div>
                    <div class="bg-amber-50 dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden transition-colors duration-300">
                        <div class="relative">
                            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-amber-600">
                            </div>
                            <div class="p-8">
                                <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                                    {{ activeTab === "signin" ? "Sign In" : "Sign Up" }}
                                </h2>
                                <transition name="fade" mode="out-in">
                                    <form v-if="activeTab === 'signin'" key="signin" @submit.prevent="handleSubmit('signup')"
                                    class="space-y-6">
                                        <div class="relative">
                                            <input id="email" name="email" type="email" autocomplete="email" required
                                            v-model="signinForm.email" class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                                            placeholder="Email address" />
                                            <label for="email" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                Email address
                                            </label>
                                        </div>
                                        <div class="relative">
                                            <input id="password" name="password" type="password" autocomplete="current-password"
                                            required v-model="signinForm.password" class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                                            placeholder="Password" />
                                            <label for="password" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                Password
                                            </label>
                                        </div>
                                        <div>
                                            <button @click="handleSubmit('signin')" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300">
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                    <form v-else key="signup" @submit.prevent="handleSubmit('signup')" class="space-y-6">
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="relative">
                                                <input id="signup-firstname" name="firstname" type="text" autocomplete="given-name"
                                                required v-model="signupForm.firstname" @blur="validateFirstName" class="peer w-full px-3 py-2 border-b-2 text-gray-900 placeholder-transparent focus:outline-none transition-colors duration-300"
                                                :class="{
                                                'border-gray-300':
                                                !errors.firstname,
                                                'border-red-500':
                                                errors.firstname,
                                                }" placeholder="First name" />
                                                <label for="signup-firstname" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                    First name
                                                </label>
                                                <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
                                                    {{ errors.firstName }}
                                                </p>
                                            </div>
                                            <div class="relative">
                                                <input id="signup-lastname" name="lastname" type="text" autocomplete="family-name"
                                                required v-model="signupForm.lastname" @blur="validateLastName" class="peer w-full px-3 py-2 border-b-2 text-gray-900 placeholder-transparent focus:outline-none transition-colors duration-300"
                                                :class="{
                                                'border-gray-300':
                                                !errors.lastName,
                                                'border-red-500':
                                                errors.lastName,
                                                }" placeholder="Last name" />
                                                <label for="signup-lastname" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                    Last name
                                                </label>
                                                <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
                                                    {{ errors.lastName }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="relative">
                                            <input id="signup-email" name="email" type="email" autocomplete="email"
                                            required v-model="signupForm.email" class="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-amber-600 transition-colors duration-300"
                                            placeholder="Email address" />
                                            <label for="signup-email" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                Email address
                                            </label>
                                        </div>
                                        <div class="relative">
                                            <input id="signup-password" name="password" type="password" autocomplete="new-password"
                                            required v-model="signupForm.password" @blur="validatePassword" class="peer w-full px-3 py-2 border-b-2 text-gray-900 placeholder-transparent focus:outline-none transition-colors duration-300"
                                            :class="{
                                            'border-gray-300':
                                            !errors.password,
                                            'border-red-500':
                                            errors.password,
                                            }" placeholder="Password" />
                                            <label for="signup-password" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                Password
                                            </label>
                                            <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                                                {{ errors.password }}
                                            </p>
                                        </div>
                                        <div class="relative">
                                            <input id="signup-confirm-password" name="confirmPassword" type="password"
                                            autocomplete="new-password" required v-model="signupForm.confirmPassword"
                                            @blur="validateConfirmPassword" class="peer w-full px-3 py-2 border-b-2 text-gray-900 placeholder-transparent focus:outline-none transition-colors duration-300"
                                            :class="{
                                            'border-gray-300':
                                            !errors.confirmPassword,
                                            'border-red-500':
                                            errors.confirmPassword,
                                            }" placeholder="Confirm Password" />
                                            <label for="signup-confirm-password" class="ms-3 absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                Confirm Password
                                            </label>
                                            <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
                                                {{ errors.confirmPassword }}
                                            </p>
                                        </div>
                                        <div class="relative">
                                            <input id="signup-birthdate" name="birthdate" type="date" required v-model="signupForm.birthdate"
                                            class="mt-3 peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-amber-600 transition-colors duration-300"
                                            />
                                            <label for="signup-birthdate" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-amber-600 peer-focus:text-sm">
                                                Birthdate
                                            </label>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                        </div>
                                        <div class="flex items-center">
                                            <input id="terms" name="terms" type="checkbox" required v-model="signupForm.terms"
                                            class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded transition-colors duration-300"
                                            />
                                            <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300 transition-colors duration-300">
                                                I agree to the
                                                <a href="#" class="text-amber-600 hover:text-amber-500 transition-colors duration-300">
                                                    Terms and Conditions
                                                </a>
                                            </label>
                                        </div>
                                        <div>
                                            <button @click="handleSubmit('signup')" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300">
                                                Sign up
                                            </button>
                                        </div>
                                    </form>
                                </transition>
                                <div class="mt-6">
                                    <div class="relative">
                                        <div class="absolute inset-0 flex items-center">
                                            <div class="w-full border-t border-gray-300">
                                            </div>
                                        </div>
                                        <div class="relative flex justify-center text-sm">
                                            <span class="px-2 bg-amber-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400 transition-colors duration-300">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>
                                    <div class="mt-6 grid grid-cols-2 gap-3">
                                        <div class="col-span-2 flex justify-center">
                                            <button href="{{ route('google.redirect') }}" @click="handleGoogleAuth"
                                            class="w-full max-w-xs flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300">
                                                <img class="h-5 w-5 mr-2" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                                alt="Google logo" />
                                                Google
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-8 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
                                <p class="text-xs text-center leading-5 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                                    {{ activeTab === "signin" ? "Don't have an account?" : "Already have an account?" }}
                                    <button @click="toggleTab" class="font-medium text-amber-600 hover:text-amber-500 transition-colors duration-300">
                                        {{ activeTab === "signin" ? "Sign up" : "Sign in" }}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase"; // Adjust path based on your setup

export default {
  setup() {
    // Reactive states
    const activeTab = ref("signin");
    const isDarkMode = ref(false);
    const isLoading = ref(true);
    const signinForm = reactive({ email: "", password: "" });
    const signupForm = reactive({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const errors = reactive({
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
    });
    const toast = reactive({ message: "", visible: false, color: "" });

    // Router instance
    const router = useRouter();

    // Helper functions
    const showToast = (message, type) => {
      toast.message = message;
      toast.color =
        type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white";
      toast.visible = true;
      setTimeout(() => (toast.visible = false), 3000);
    };

    const validateFirstName = () => {
      if (!signupForm.firstname.trim()) {
        errors.firstname = "First name is required.";
        return false;
      }
      if (!/^[A-Za-z]+$/.test(signupForm.firstname)) {
        errors.firstname = "First name can only contain letters.";
        return false;
      }
      errors.firstname = "";
      return true;
    };

    const validateLastName = () => {
      if (!signupForm.lastname.trim()) {
        errors.lastname = "Last name is required.";
        return false;
      }
      if (!/^[A-Za-z]+$/.test(signupForm.lastname)) {
        errors.lastname = "Last name can only contain letters.";
        return false;
      }
      errors.lastname = "";
      return true;
    };

    const validatePassword = () => {
      if (!signupForm.password.trim()) {
        errors.password = "Password is required.";
        return false;
      }
      if (signupForm.password.length < 8) {
        errors.password = "Password should be at least 8 characters long.";
        return false;
      }
      if (!/[A-Z]/.test(signupForm.password)) {
        errors.password =
          "Password should contain at least one uppercase letter.";
        return false;
      }
      if (!/[a-z]/.test(signupForm.password)) {
        errors.password =
          "Password should contain at least one lowercase letter.";
        return false;
      }
      if (!/[0-9]/.test(signupForm.password)) {
        errors.password = "Password should contain at least one digit.";
        return false;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(signupForm.password)) {
        errors.password =
          "Password should contain at least one special character.";
        return false;
      }
      errors.password = "";
      return true;
    };

    const validateConfirmPassword = () => {
      if (signupForm.confirmPassword !== signupForm.password) {
        errors.confirmPassword = "Passwords do not match.";
        return false;
      }
      errors.confirmPassword = "";
      return true;
    };

    const handleSubmit = async (formType) => {
      if (formType === "signin") {
        if (!signinForm.email || !signinForm.password) {
          showToast("Please provide both email and password.", "error");
          return;
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: signinForm.email,
            password: signinForm.password,
          });

          if (error) {
            showToast(`Sign-in error: ${error.message}`, "error");
            return;
          }

          const session = data.session;
          if (session) {
            localStorage.setItem("access_token", session.access_token);
            localStorage.setItem("refresh_token", session.refresh_token);
            showToast("Sign-in successful! Redirecting...", "success");
            router.push("/home");
          }
        } catch (err) {
          showToast(`An unexpected error occurred: ${err.message}`, "error");
        }
      } else if (formType === "signup") {
        if (
          validateFirstName() &&
          validateLastName() &&
          validatePassword() &&
          validateConfirmPassword()
        ) {
          try {
            const { data: signUpData, error: signUpError } =
              await supabase.auth.signUp({
                email: signupForm.email,
                password: signupForm.password,
              });

            if (signUpError) {
              showToast(`Signup error: ${signUpError.message}`, "error");
              return;
            }

            const user_id = signUpData.user?.id;
            if (!user_id) {
              showToast("No user ID returned after signup.", "error");
              return;
            }

            const { error: insertError } = await supabase
              .from("users_info")
              .insert([
                {
                  auth_id: user_id,
                  email: signupForm.email,
                  firstname: signupForm.firstname,
                  lastname: signupForm.lastname,
                  birthday: signupForm.birthdate,
                },
              ]);

            if (insertError) {
              showToast(`Error inserting user data: ${insertError.message}`, "error");
              return;
            }

            showToast("Signup successful! Please confirm your email.", "success");
            Object.keys(signupForm).forEach((key) => (signupForm[key] = ""));
          } catch (error) {
            showToast(`An error occurred: ${error.message}`, "error");
          }
        } else {
          showToast("Please correct the errors in the signup form.", "error");
        }
      }
    };

    const handleGoogleAuth = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          prompt: 'select_account', // Forces account selection
        },
      },
    });

    if (error) {
      throw error;
    }

    console.log('Authentication successful:', data);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    alert('Error signing in with Google: ' + error.message);
  }
};

    const toggleTab = () => {
      activeTab.value = activeTab.value === "signin" ? "signup" : "signin";
    };

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    return {
      activeTab,
      isDarkMode,
      isLoading,
      signinForm,
      signupForm,
      errors,
      toast,
      router,
      showToast,
      handleGoogleAuth,
      validateFirstName,
      validateLastName,
      validatePassword,
      validateConfirmPassword,
      handleSubmit,
      toggleTab,
    };
  },
};
</script>



    <style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora&display=swap");

    .font-serif {
        font-family: "Playfair Display", serif;
    }

    body {
        font-family: "Lora", serif;
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
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
