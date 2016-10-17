import {Component} from '@angular/core';
import {WeatherData} from './weather.data';

@Component({
  selector: 'my-weather-detail',
  template: `
    <div *ngIf="weather">
      <div><label>Temprature: </label>{{clacCelsius(weather.main.temp)}} °C</div>
      <div><label>Temprature min: </label>{{clacCelsius(weather.main.temp_min)}} °C</div>
      <div><label>Temprature max: </label>{{clacCelsius(weather.main.temp_max)}} °C</div>
      <div><label>Wind: </label>{{weather.wind.speed}} m/s {{weather.wind.deg}} degrees (meteorological)</div>
      <div><label>Pressure: </label>{{weather.main.pressure}} hpa</div>
      <div><label>Humidity: </label>{{weather.main.humidity}} %</div>
      <div><label>Cloudiness: </label>{{weather.clouds.all}} %</div>
      <div *ngIf="weather.rain"><label>Rain: </label>{{weather.rain.three_hours}} liter</div>
      <div *ngIf="weather.snow"><label>Snow: </label>{{weather.snow.three_hours}} liter</div>
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation" *ngFor="let w of weather.weather">
          <span class="badge">{{w.description}}
          </span><img src="http://openweathermap.org/img/w/{{w.icon}}.png">
        </li>
      </ul>
    </div>
  `,
  inputs: ['weather']
})

export class WeatherDetailComponent {
  public weather: WeatherData;

  clacCelsius(kelvin: number) {
    return (kelvin - 273.15).toFixed(2);
  }
}