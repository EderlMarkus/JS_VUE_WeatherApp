import { ref, computed } from 'vue';
import { OpenWeatherMapService } from '../services/openWeatherMap.service';

export class WeatherFacade {
  private readonly openWeatherMapService = new OpenWeatherMapService();
  private readonly _loading = ref(false);
  private readonly _error = ref(null);
  private readonly _cities = [
    'Mondsee',
    'Wien',
    'Berlin',
    'Paris',
    'New York',
    'Tokio',
  ];
  private readonly _selectedCity = ref('');
  private readonly _weatherData = ref(null);

  public get loading() {
    return this._loading;
  }

  public get error() {
    return this._error;
  }

  public get selectedCity() {
    return this._selectedCity;
  }

  public get cities() {
    return this._cities;
  }

  public get weatherData() {
    return this._weatherData;
  }

  public get temperature() {
    return computed(() =>
      this._weatherData.value
        ? Math.round(this._weatherData.value.main.temp)
        : ''
    );
  }

  public queryWeatherData = async (cityName) => {
    try {
      const response =
        await this.openWeatherMapService.getWeatherDataByCityName(cityName);
      this._weatherData.value = await response.json();
    } catch (err) {
      this._error.value = err.message;
    } finally {
      this._loading.value = false;
    }
  };
}
