<script setup>
import { toRefs } from "vue";
const props = defineProps({
  weatherFacade: Object,
});
const data = props.weatherFacade.data;
</script>

<template>
  <div class="weather-info">
    <h2>{{ data?.selectedCity }}</h2>
    <p><strong>Temperatur:</strong> {{ data?.weatherData?.temperature }} °C</p>
    <p>
      <strong>Beschreibung:</strong>
      {{ data?.weatherData?.weather[0]?.description }}
    </p>
  </div>
</template>

<style scoped>
.weather-info {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f0f0f0;
  border-radius: 6px;
  color: #000;
}
</style>