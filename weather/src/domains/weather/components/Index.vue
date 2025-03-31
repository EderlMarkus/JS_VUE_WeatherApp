<script setup>
import { WeatherFacade } from "../data/facade/weather.facade";
import Selection from "./Selection.vue";
import InfoBox from "./InfoBox.vue";
import Loading from "../../../shared/components/loading.vue";
import Error from "../../../shared/components/error.vue";
const weatherFacade = new WeatherFacade();
const data = weatherFacade.data;
</script>

<template>
  <div class="weather-app">
    <h1>Wetter App</h1>

    <Selection :weatherFacade="weatherFacade" />
    <InfoBox v-if="data.weatherData" :weatherFacade="weatherFacade" />

    <div v-if="data.loading" class="loading"><Loading /></div>
    <div v-if="data.error" class="error"><Error :message="data.error" /></div>
  </div>
</template>

<style scoped>
.weather-app {
  margin: auto;
  display: flex;
  flex-direction: column;
}
.loading,
.error {
  display: flex;
  justify-content: center;
  margin: 1rem auto auto auto;
  width: 100%;
}
</style>
