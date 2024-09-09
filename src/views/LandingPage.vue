<template>
  <div class="landing-page">
    <section v-if="!isLoggedIn" class="hero">
      <div class="hero-content">
        <h1>Welcome to JobBoard!</h1>
        <p>Your gateway to finding your dream job or posting job offers with ease.</p>
        <div class="auth-buttons">
          <button @click="navigateToLogin">Login</button>
          <button @click="navigateToRegister">Sign Up</button>
        </div>
      </div>
    </section>
    <SearchBar
      v-model:searchQuery="searchQuery"
      v-model:selectedTags="selectedTags"
      v-model:salaryRange="salaryRange"
    />
    <section class="featured-jobs">
      <h2>Featured Job Listings</h2>
        <p v-if="filteredJobs.length === 0">No job available currently :(</p>
        <div v-else>
        <div class="jobs-grid">
          <div v-for="job in filteredJobs" :key="job.id" class="job-card">
            <h3>{{ job.title }}</h3>
            <p>{{ job.description }}</p>
            <p><strong>Salary:</strong> {{ job.salary.amount }} {{ job.salary.currency }}</p>
            <router-link :to="`/job/${job.id}`">View Details</router-link>
          </div>
        </div>
        </div>
    </section>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, computed, onMounted } from 'vue';
import { getJobs } from '@/utils/storage';
import SearchBar from '@/components/SearchBar.vue';
import { Job } from '@/types';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LandingPage',
  components: { SearchBar },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const searchQuery = ref('');
    const selectedTags = ref<string[]>([]);
    const salaryRange = ref<{ min: number; max: number } | null>(null);
    const jobs = ref<Job[]>([]);
    const router = useRouter();
    const filteredJobs = computed(() => {
      return jobs.value.filter(job => {
        const matchesQuery = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                             job.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesTags = selectedTags.value.length === 0 || selectedTags.value.some(tag => job.tags.includes(tag));
        const matchesSalary = !salaryRange.value ||
                              (job.salary.amount >= salaryRange.value.min && job.salary.amount <= salaryRange.value.max);

        return matchesQuery && matchesTags && matchesSalary;
      });
    });


    onMounted(() => {
      jobs.value = getJobs();
    });

    const navigateToLogin = () => {
      router.push('/login');
    };

    const navigateToRegister = () => {
      router.push('/register');
    };

    return {
      searchQuery,
      selectedTags,
      salaryRange,
      filteredJobs,
      isLoggedIn,
      navigateToLogin,
      navigateToRegister,
    };
  },
});
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gradient);
  color: white;
  height: 40vh;
  text-align: center;
}

.hero-content h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
}

.hero-content p {
  font-size: 1.2em;
  margin-bottom: 1em;
}

.auth-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.auth-buttons button:first-child {
  background-color: var(--primary-color);
  color: white;
}

.auth-buttons button:last-child {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color-hover);
}

.featured-jobs {
  padding: 50px;
  background-color: var(--bg-color-light);
  text-align: center;
}

.featured-jobs h2 {
  font-size: 2em;
  margin-bottom: 30px;
}

.jobs-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.job-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .job-card {
    padding: 15px;
    margin-bottom: 15px;
    width: 100%;
  }
}


.job-card h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.job-card p {
  margin-bottom: 10px;
}

.job-card a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
}

.job-card a:hover {
  text-decoration: underline;
}
</style>
