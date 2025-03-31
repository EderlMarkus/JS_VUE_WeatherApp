import { beforeEach, expect, test, vi } from 'vitest';
import { WeatherFacade } from '../data/facade/weather.facade';

let weatherFacade;
const mockWeatherResponse = {
  main: { temp: 22.7 },
  weather: [{ description: 'klarer Himmel' }],
};

const mockService = {
  getWeatherDataByCityName: vi.fn().mockResolvedValue({
    json: () => Promise.resolve(mockWeatherResponse),
    ok: true,
  }),
};

beforeEach(() => {
  weatherFacade = new WeatherFacade(mockService);
});

test('should fetch and format weather data correctly', async () => {
  await weatherFacade.queryWeatherData('Wien');
  expect(mockService.getWeatherDataByCityName).toHaveBeenCalledWith('Wien');
  expect(weatherFacade.data.value.weatherData.temperature).toBe(23); // aufgerundet
  expect(weatherFacade.data.value.weatherData.weather[0].description).toBe(
    'klarer Himmel'
  );
  expect(weatherFacade.data.value.error).toBe(null);
  expect(weatherFacade.data.value.loading).toBe(false);
});

test('should handle error from service', async () => {
  mockService.getWeatherDataByCityName.mockRejectedValueOnce(
    new Error('Fehler beim Abrufen der Wetterdaten')
  );

  await weatherFacade.queryWeatherData('Tokio');

  expect(mockService.getWeatherDataByCityName).toHaveBeenCalledWith('Tokio');
  expect(weatherFacade.data.value.weatherData).toBe(null);
  expect(weatherFacade.data.value.error).toBe(
    'Fehler beim Abrufen der Wetterdaten'
  );
  expect(weatherFacade.data.value.loading).toBe(false);
});

test('should set loading=true during request', async () => {
  let resolveFn;
  const delayedPromise = new Promise((resolve) => {
    resolveFn = () =>
      resolve({
        json: () =>
          Promise.resolve({
            main: { temp: 20 },
            weather: [{ description: 'bewölkt' }],
          }),
        ok: true,
      });
  });

  mockService.getWeatherDataByCityName.mockReturnValueOnce(delayedPromise);

  const fetchPromise = weatherFacade.queryWeatherData('Berlin');

  // Test direkt nach Aufruf → loading sollte true sein
  expect(weatherFacade.data.value.loading).toBe(true);

  // Warte auf Beendigung der Anfrage
  resolveFn();
  await fetchPromise;

  // Danach sollte loading wieder false sein
  expect(weatherFacade.data.value.loading).toBe(false);
});
