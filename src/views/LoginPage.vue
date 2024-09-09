<template>
  <div>
    <AuthWidget initialMode="login" />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AuthWidget from '@/components/AuthWidget.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    AuthWidget,
  },
});
</script>
