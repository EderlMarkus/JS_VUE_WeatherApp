<template>
  <div class="weather-app">
    <h1>Wetter App</h1>

    <div class="selection">
      <label for="city">Stadt auswählen:</label>
      <select v-model="selectedCity" @change="fetchWeather">
        <option disabled value="">Bitte Stadt wählen</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>
    <div v-if="weatherData" class="weather-info">
      <h2>{{ selectedCity }}</h2>
      <p><strong>Temperatur:</strong> {{ temperature }} °C</p>
      <p>
        <strong>Beschreibung:</strong>
        {{ weatherData?.weather[0]?.description }}
      </p>
    </div>

    <div v-if="loading">Lade Wetterdaten...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const cities = ["Mondsee", "Wien", "Berlin", "Paris", "New York", "Tokio"];
const selectedCity = ref("");
const weatherData = ref(null);
const loading = ref(false);
const error = ref(null);

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const fetchWeather = async () => {
  if (!selectedCity.value) return;

  loading.value = true;
  error.value = null;
  weatherData.value = null;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.value}&units=metric&lang=de&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Fehler beim Abrufen der Wetterdaten");

    weatherData.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const temperature = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.temp) : ""
);
</script>

<style scoped>
.weather-app {
  margin: auto;
  display: flex;
  flex-direction: column;
}

.selection {
  display: flex;
  justify-content: space-between;
}
.weather-info {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f0f0f0;
  border-radius: 6px;
  color: #000;
}
</style>
