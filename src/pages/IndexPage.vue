<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <p>{{ blah }}</p>
  </q-page>
</template>

<script setup>
console.log(import.meta);
const blah = import.meta.env.VITE_SUPABASE_URL;
</script>
