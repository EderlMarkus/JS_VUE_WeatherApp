<script setup>
import { toRefs } from "vue";
const props = defineProps({
  message: String,
});
</script>

<template>
  <div class="error">{{ message ?? "Fehler beim Laden" }}</div>
</template>

<style scoped>
.error {
  color: #d8000c;
  background-color: #ffbaba;
  background-image: url("/src/assets/error.png");
  background-repeat: no-repeat;
  background-position: 0.2rem center;
  padding: 1rem 3rem;
}
</style>