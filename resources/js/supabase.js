import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey); // Define supabase

// Google Auth
async function loginwithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
    });
    return { data, error }; // Return data and error for handling in the component
}

async function handleLogout(router) {
    await supabase.auth.signOut(); // Sign out the current user
    localStorage.removeItem("access_token"); // Clear the token
    $router.push("/auth"); // Redirect to the login page
}

// Auth State Listener
supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        // Store the access token
        localStorage.setItem("access_token", session.access_token);
    } else {
        // Remove token when logged out
        localStorage.removeItem("access_token");
    }
});

export { supabase, loginwithGoogle, handleLogout }; // Export supabase only once
