<template>
  <div class="job-details">
    <div class="job-card">
      <h2>{{ state.isCreating ? 'Create New Job' : 'Edit Job' }}</h2>
      <form @submit.prevent="saveJob">
        <div>
          <label for="title">Title:</label>
          <input v-model="jobTitle" id="title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea v-model="jobDescription" id="description" required></textarea>
        </div>
        <div>
          <label for="salary">Salary:</label>
          <input v-model.number="jobSalaryAmount" id="salary" type="number" required />
        </div>
        <div>
          <label for="currency">Currency:</label>
          <input v-model="jobSalaryCurrency" id="currency" required />
        </div>
        <div>
          <label for="tags">Tags (comma-separated):</label>
          <input v-model="jobTags" id="tags" />
        </div>
        <button type="submit">{{ state.isCreating ? 'Save Job' : 'Update Job' }}</button>
      </form>
    </div>
    <p v-if="!job">Loading job details...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import storage from '@/utils/storage';
import { Job } from '@/types';

export default defineComponent({
  name: 'EditJobDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const job = ref<Job | null>(null);
    const state = ref({
      isCreating: false,
    });

    const jobId = route.params.id as string;
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const loadJob = () => {
      if (jobId === 'new') {
        state.value.isCreating = true;
        job.value = {
          id: '',
          title: '',
          description: '',
          tags: [],
          created: Date.now(),
          salary: {
            amount: 0,
            currency: ''
          },
          employerId: user.id
        };
      } else {
        state.value.isCreating = false;
        const jobs = storage.getJobs();
        job.value = jobs.find(j => j.id === jobId) || null;

        if (!job.value) {
          router.push({ name: 'EmployerDashboard' });
        }
      }
    };

    const saveJob = () => {
      if (state.value.isCreating) {
        if (job.value) {
          const jobs = storage.getJobs();
          const newJob: Job = { ...job.value, id: Date.now().toString() };
          storage.saveJobs([...jobs, newJob]);
          router.push({ name: 'EmployerDashboard' });
        }
      } else {
        if (job.value) {
          const jobs = storage.getJobs();
          const updatedJobs = jobs.map(j => j.id === jobId ? job.value : j);
          storage.saveJobs(updatedJobs.filter(j => j !== null) as Job[]);
          router.push({ name: 'EmployerDashboard' });
        }
      }
    };

    const jobTitle = computed({
      get: () => job.value?.title || '',
      set: (value: string) => {
        if (job.value) job.value.title = value;
      }
    });

    const jobDescription = computed({
      get: () => job.value?.description || '',
      set: (value: string) => {
        if (job.value) job.value.description = value;
      }
    });

    const jobSalaryAmount = computed({
      get: () => job.value?.salary.amount || 0,
      set: (value: number) => {
        if (job.value) job.value.salary.amount = value;
      }
    });

    const jobSalaryCurrency = computed({
      get: () => job.value?.salary.currency || '',
      set: (value: string) => {
        if (job.value) job.value.salary.currency = value;
      }
    });

    const jobTags = computed({
      get: () => job.value?.tags.join(', ') || '',
      set: (value: string) => {
        if (job.value) job.value.tags = value.split(',').map(tag => tag.trim());
      }
    });

    onMounted(loadJob);

    return {
      job,
      state,
      saveJob,
      jobTitle,
      jobDescription,
      jobSalaryAmount,
      jobSalaryCurrency,
      jobTags,
    };
  },
});
</script>

<style scoped>
.job-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.job-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

h2 {
  margin-top: 0;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input, form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

form button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

form button:hover {
  background-color: var(--primary-color-hover);
}
</style>
