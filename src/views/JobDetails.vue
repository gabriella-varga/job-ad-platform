<template>
  <div class="job-details">
    <div class="job-card">
      <div v-if="job">
        <h2>{{ job.title }}</h2>
        <p><strong>Description:</strong> {{ job.description }}</p>
        <p><strong>Tags:</strong> {{ job.tags.join(', ') }}</p>
        <p><strong>Salary:</strong> {{ job.salary.amount }} {{ job.salary.currency }}</p>
        <p><strong>Posted on:</strong> {{ new Date(job.created).toLocaleDateString() }}</p>
        <p><strong>Posted on:</strong> {{ new Date(job.created).toLocaleDateString(undefined, dateSettings) }}</p>
        <button v-if="showEditButton" @click="editJob">Edit Job</button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
    <button @click="goBack" class="back-button">Back</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getJobs } from '@/utils/storage';
import { Job } from '@/types';

export default defineComponent({
  name: 'JobDetails',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const jobId = route.params?.id as string;
    const job = ref<Job | null>(null);
    const error = ref<string | null>(null);
    const showEditButton = ref<boolean>(false);
    const dateSettings = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    onMounted(() => {
      if (jobId) {
        const jobsArray = getJobs();
        console.log(jobsArray);
        const foundJob = jobsArray.find(job => job.id === jobId);
        if (foundJob) {
          job.value = { ...foundJob };
          // Check if the user is logged in and is the job's author
          const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
          if (user && user.id === job.value.employerId) {
            showEditButton.value = true;
          }
        } else {
          error.value = 'Job not found.';
        }
      } else {
        error.value = 'No job ID provided.';
      }
    });

    const editJob = () => {
      if (job.value) {
        router.push({ name: 'EditJobDetails', params: { id: job.value.id } });
      }
    };

    const goBack = () => {
      router.back();
    };

    return {
      job,
      error,
      showEditButton,
      editJob,
      goBack,
      dateSettings,
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

h2 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 5px;
}

button:hover {
  background-color: var(--primary-color-hover);
}

.back-button {
  background-color: #6c757d;
  float: right;
  margin: 15px 0;
}

.back-button:hover {
  background-color: #5a6268;
}

.error-message {
  color: var(--warning-color);
  margin-top: 10px;
}

</style>
