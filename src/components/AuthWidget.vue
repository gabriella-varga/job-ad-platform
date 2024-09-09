<template>
  <div class="auth-widget">
    <h2 v-if="authPageType === 'login'">Login</h2>
    <h2 v-else-if="authPageType === 'register'">Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="form.password" id="password" type="password" required />
      </div>

      <button type="submit">Login</button>
    </form>

    <p v-if="error">{{ error }}</p>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { users } from '@/mocks/mockData';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AuthWidget',
  setup() {
    const store = useStore();
    const form = ref({
      email: '',
      password: '',
    });
    const error = ref<string | null>(null);
    const router = useRouter();
    const route = useRoute();

    const authPageType = computed(() => {
      if (route.path.includes("login")) {
        return "login";
      } else if (route.path.includes("register")) {
        return "register";
      } else {
        return null;
      }
    });

    const handleSubmit = () => {
      const user = authenticateUser(form.value.email, form.value.password);
      if (user) {
        store.dispatch('logIn');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        error.value = null;
        router.push(user.type === 'employer' ? '/dashboard' : '/jobs');
      } else {
        error.value = 'Invalid email or password';
      }
    };

    const authenticateUser = (email: string, password: string) => {
      return users.find(u => u.email === email && u.password === password) || null;
    };

    const logout = () => {
      localStorage.removeItem('loggedInUser');
      router.push('/');
    };

    return {
      form,
      error,
      handleSubmit,
      logout,
      authPageType
    };
  },
});
</script>

<style scoped>
.auth-widget {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--secondary-color-hover);
}

p {
  margin-top: 10px;
}
</style>
