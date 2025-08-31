// icons.js
import clear_day from './public/clear-day.png';
import clear_night from './public/clear-night.png';
import cloudy from './public/cloudy.png';
import fog from './public/fog.png';
import hail from './public/hail.png';


export const weatherIcons = {
  clear_day,
  clear_night,
  cloudy,
  fog,
  hail

}

export function getWeatherIcon(condition) {
  result = condition.replace('-', '_');
  return weatherIcons(result) || weatherIcons.clear_day;
}