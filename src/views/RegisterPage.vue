<template>
  <div>
    <AuthWidget initialMode="register" />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AuthWidget from '@/components/AuthWidget.vue';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    AuthWidget,
  },
});
</script>
