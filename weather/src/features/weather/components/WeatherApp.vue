<template>
  <div class="weather-app">
    <h1>Wetter App</h1>

    <div class="selection">
      <label for="city">Stadt auswählen:</label>
      <select v-model="data.selectedCity" @change="fetchWeather">
        <option disabled value="">Bitte Stadt wählen</option>
        <option v-for="city in data.cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>
    <div v-if="data.weatherData" class="weather-info">
      <h2>{{ data.selectedCity }}</h2>
      <p><strong>Temperatur:</strong> {{ data.weatherData.temperature }} °C</p>
      <p>
        <strong>Beschreibung:</strong>
        {{ data.weatherData?.weather[0]?.description }}
      </p>
    </div>

    <div v-if="data.loading">Lade Wetterdaten...</div>
    <div v-if="data.error">{{ data.error }}</div>
  </div>
</template>

<script setup>
import { WeatherFacade } from "../data/facade/weather.facade";

const weatherFacade = new WeatherFacade();
const data = weatherFacade.data;

const fetchWeather = async () => {
  if (!data?.value?.selectedCity) return;
  weatherFacade.queryWeatherData(data.value.selectedCity);
};
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
