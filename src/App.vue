<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/register">Sign Up</router-link>
        <router-link v-if="isLoggedIn" to="/dashboard">My Dashboard</router-link>
        <button v-if="isLoggedIn" @click="handleLogout" class="nav-button">Logout</button>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2024 JobBoard. All Rights Reserved. v0.1</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { initializeMockData } from '@/utils/storage';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    onMounted(() => {
      initializeMockData();
    });

    const handleLogout = () => {
      localStorage.removeItem('loggedInUser');
      store.dispatch('logOut');
      router.push('/');
    };

    return {
      isLoggedIn,
      handleLogout
    };
  },
});
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: var(--bg-color-light);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--bg-color);
  padding: 10px;
  color: white;
  text-align: center;
}

header nav {
  display: flex;
  justify-content: center;
  gap: 15px;
}

header a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

header a:hover {
  text-decoration: underline;
}

main {
  flex: 1;
  padding: 20px;
}

footer {
  background-color: var(--bg-color);
  color: white;
  text-align: center;
  padding: 10px;
}

.nav-button {
  padding: 0 10px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--warning-color);
  color: white;
}

.nav-button:hover {
  background-color: var(--warning-color-hover);
}
</style>
