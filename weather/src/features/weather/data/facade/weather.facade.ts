import { ref, computed } from 'vue';
import { OpenWeatherMapService } from '../services/openWeatherMap.service';

export class WeatherFacade {
  private readonly openWeatherMapService = new OpenWeatherMapService();
  public readonly data = ref({
    loading: false,
    error: null,
    cities: ['Mondsee', 'Wien', 'Berlin', 'Paris', 'New York', 'Tokio'],
    selectedCity: '',
    weatherData: null,
  });

  public queryWeatherData = async (cityName) => {
    this.updateData({
      weatherData: null,
      error: null,
      loading: true,
    });
    try {
      const response =
        await this.openWeatherMapService.getWeatherDataByCityName(cityName);
      const weatherData = await response.json();
      weatherData.temperature = Math.round(weatherData.main.temp);
      this.updateData({ weatherData });
    } catch (err) {
      const error = err.message;
      this.updateData({ error });
    } finally {
      this.updateData({ loading: false });
    }
  };

  private updateData(newData) {
    this.data.value = { ...this.data.value, ...newData };
  }
}
