export class OpenWeatherMapService {
  private readonly url = 'https://api.openweathermap.org/data/2.5/weather';
  API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  public getWeatherDataByCityName = async (cityName) => {
    const response = await fetch(
      `${this.url}?q=${cityName}&units=metric&lang=de&appid=${this.API_KEY}`
    );
    if (!response.ok) throw new Error('Fehler beim Abrufen der Wetterdaten');
    return response;
  };
}
