<template>
  <div class="employer-dashboard">
    <h2>Your Job Advertisements</h2>
    <button @click="createJob" class="create-job-button">Create New Job</button>
    <div v-if="jobs.length" class="jobs-list">
      <div v-for="job in jobs" :key="job.id" class="job-card">
        <h3>{{ job.title }}</h3>
        <p>{{ job.description }}</p>
        <p>Salary: {{ job.salary.amount }} {{ job.salary.currency }}</p>
        <div class="job-tags">
          <span v-for="(tag, index) in job.tags" :key="index" class="tag">
            {{ tag }}
          </span>
        </div>
        <div class="actions">
          <button @click="editJob(job.id)">Edit</button>
          <button @click="deleteJob(job.id)" class="warning">Delete</button>
        </div>
      </div>
    </div>
    <p v-else>No jobs posted yet.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import  storage  from '@/utils/storage';
import { Job } from '@/types';

export default defineComponent({
  name: 'EmployerDashboard',
  setup() {
    const router = useRouter();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    if (!loggedInUser || loggedInUser.type !== 'employer') {
      router.push({ name: 'Login' });
    }

    const jobs = ref<Job[]>([]);

    const loadJobs = () => {
      jobs.value = storage.getJobs().filter(job => job.employerId === loggedInUser.id);
      console.log(jobs.value);
    };

    const createJob = () => {
      router.push({ name: 'EditJobDetails', params: { id: 'new' }  });
    };

    const editJob = (jobId: string) => {
      router.push({ name: 'EditJobDetails', params: { id: jobId } });
    };

    const deleteJob = (jobId: string) => {
      jobs.value = jobs.value.filter(job => job.id !== jobId);

      storage.saveJobs(jobs.value);
    };

    onMounted(loadJobs);

    return {
      jobs,
      createJob,
      editJob,
      deleteJob
    };
  },
});
</script>

<style scoped>
.employer-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.create-job-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.create-job-button:hover {
  background-color: var(--secondary-color-hover);
}

.jobs-list {
  display: flex;
  flex-direction: column;
}

.job-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 12px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: var(--primary-color-hover);
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: var(--secondary-color);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 0.9em;
}

.warning {
  background-color: var(--warning-color);
  color: white;
  border: none;
  padding: 8px 12px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.warning:hover {
  background-color: var(--warning-color-hover);
}
.actions {
  float: right;
}
</style>
