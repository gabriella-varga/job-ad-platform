<template>
  <div class="search-bar">
    <input
      v-model="localSearchQuery"
      type="text"
      placeholder="Search jobs..."
      class="search-input"
      @input="emitSearchQuery"
    />

    <div class="tag-filters">
      <label v-for="tag in tags" :key="tag">
        <input
          type="checkbox"
          :value="tag"
          v-model="localSelectedTags"
          @change="emitSelectedTags"
        />
        {{ tag }}
      </label>
    </div>

    <div class="salary-range">
      <h3>Salary (min-max)</h3>
      <input
        type="number"
        v-model.number="localSalaryMin"
        @input="emitSalaryRange"
      />
      <input
        type="number"
        v-model.number="localSalaryMax"
        @input="emitSalaryRange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { getJobs } from '@/utils/storage';

export default defineComponent({
  name: 'SearchBar',
  props: {
    searchQuery: String,
    selectedTags: {
      type: Array as () => string[],
      default: () => [],
    },
    salaryRange: {
      type: Object as () => { min: number; max: number } | null,
      default: () => null,
    },
  },
  emits: ['update:searchQuery', 'update:selectedTags', 'update:salaryRange'],
  setup(props, { emit }) {
    const tags = ref<string[]>([]);
    const localSearchQuery = ref(props.searchQuery);
    const localSelectedTags = ref<string[]>(props.selectedTags || []);
    const localSalaryMin = ref(props.salaryRange?.min || 0);
    const localSalaryMax = ref(props.salaryRange?.max || 0);

    const fetchTags = async () => {
      const jobs = getJobs();

      if (jobs) {
        const allTags = new Set<string>();
        jobs.forEach(job => job.tags.forEach(tag => allTags.add(tag)));
        tags.value = Array.from(allTags);
      } else {
        console.info('No jobs found');
      }
    };

    const emitSearchQuery = () => {
      emit('update:searchQuery', localSearchQuery.value);
    };

    const emitSelectedTags = () => {
      emit('update:selectedTags', localSelectedTags.value);
    };

    const emitSalaryRange = () => {
      emit('update:salaryRange', { min: localSalaryMin.value, max: localSalaryMax.value });
    };

    watch(() => props.searchQuery, (newQuery) => {
      localSearchQuery.value = newQuery;
    });

    watch(() => props.selectedTags, (newTags) => {
      localSelectedTags.value = newTags || [];
    });

    watch(() => props.salaryRange, (newRange) => {
      if (newRange) {
        localSalaryMin.value = newRange.min;
        localSalaryMax.value = newRange.max;
      } else {
        localSalaryMin.value = 0;
        localSalaryMax.value = 0;
      }
    });

    fetchTags();

    return {
      localSearchQuery,
      localSelectedTags,
      localSalaryMin,
      localSalaryMax,
      tags,
      emitSearchQuery,
      emitSelectedTags,
      emitSalaryRange,
    };
  },
});
</script>

<style scoped>
.search-bar {
  padding: 20px;
  background-color: var(--bg-color-light);
}

input[type="number"] {
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2em;
}

.search-bar {
  margin: 20px 0;
  text-align: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
}

.tag-filters {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
