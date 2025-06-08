<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <p>Welcome to the dashboard!</p>
  </div>
</template>