<script setup>
import { toRefs } from "vue";
const props = defineProps({
  weatherFacade: Object,
});

const { data, queryWeatherData } = props.weatherFacade;

const fetchWeather = async () => {
  if (!data?.value?.selectedCity) return;
  props.weatherFacade.queryWeatherData(data.value.selectedCity);
};
</script>

<template>
  <div class="selection">
    <label for="city">Stadt auswählen:</label>
    <select v-model="data.selectedCity" @change="fetchWeather">
      <option disabled value="">Bitte Stadt wählen</option>
      <option v-for="city in data.cities" :key="city" :value="city">
        {{ city }}
      </option>
    </select>
  </div>
</template>



<style scoped>
.selection {
  display: flex;
  justify-content: space-between;
}
</style>
