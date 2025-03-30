import { test, expect } from '@playwright/test';

test('Feature works correctly', async ({ page }) => {
  await page.route(
    'https://api.openweathermap.org/data/2.5/weather?*',
    async (route) => {
      const json = {
        coord: {
          lon: 13.3797,
          lat: 47.8271,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'Leichter Regen',
            icon: '10n',
          },
        ],
        base: 'stations',
        main: {
          temp: 18.64,
          feels_like: 9.93,
          temp_min: 10.64,
          temp_max: 10.64,
          pressure: 1015,
          humidity: 83,
          sea_level: 1015,
          grnd_level: 921,
        },
        visibility: 6165,
        wind: {
          speed: 3.36,
          deg: 300,
          gust: 8.93,
        },
        rain: {
          '1h': 0.34,
        },
        clouds: {
          all: 99,
        },
        dt: 1743357431,
        sys: {
          type: 1,
          id: 6877,
          country: 'AT',
          sunrise: 1743310134,
          sunset: 1743355961,
        },
        timezone: 7200,
        id: 7872159,
        name: 'Mondsee',
        cod: 200,
      };
      await route.fulfill({ json });
    }
  );

  await page.goto('http://localhost:5173/');

  await test.step('Title is present', async () => {
    await expect(
      page.getByRole('heading', { name: 'Wetter App' })
    ).toBeVisible();
    await expect(page.getByText('Stadt auswählen:')).toBeVisible;
  });

  await test.step('Selection works and InfoBox is shown correctly', async () => {
    await page.getByRole('combobox').selectOption('Mondsee');
    await expect(page.getByRole('heading', { name: 'Mondsee' })).toBeVisible();
    await expect(page.getByText('Temperatur: 19 °C')).toBeVisible();
    await expect(page.getByText('Beschreibung: Leichter Regen')).toBeVisible();
  });
});
