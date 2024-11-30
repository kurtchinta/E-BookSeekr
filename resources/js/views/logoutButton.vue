<template>
    <button @click="handleLogout" class="logout-button">Logout</button>
  </template>
  
  <script>
  import { supabase } from "@/supabase";
  export default {
    name: "LogoutButton",
    methods: {
      async handleLogout() {
        try {
          // Sign out from Supabase
          const { error } = await supabase.auth.signOut();
  
          if (error) throw error;
  
          // Remove tokens from localStorage
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
  
          // Redirect to login page
          this.$router.push("/auth");
        } catch (error) {
          console.error("Logout failed:", error.message);
          alert(`Logout failed: ${error.message}`);
        }
      },
    },
  };
  </script>
  