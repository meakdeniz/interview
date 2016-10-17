import {Component, OnInit} from '@angular/core';
import {WeatherService} from './service';
import {WeatherData} from './weather.data';

export class WeatherItem {
    constructor(public cityName: string, public description: string, public temperature: number) {}
}

@Component({
    moduleId: module.id,
    selector: 'weather-list',
    template: `
    <div class="col-md-6">
    <ul class="nav nav-pills nav-stacked">
        <li role="presentation" *ngFor=" let weatherItem of weatherItems" [class.selected]="weatherItem === selectedweatherItem"
        (click)="onSelect(weatherItem)">
        <a href="#"><h3>{{weatherItem.cityName}}</h3>
         {{weatherItem.description}}
        <span class="badge">{{weatherItem.temperature}}°C</span></a>
        </li>
    </ul>
    </div>
    <div class="col-md-6">
    <my-weather-detail [weather]="weather"></my-weather-detail>
    </div>
    `,
    providers: [WeatherService]
})

export class WeatherListComponent implements OnInit {
    public weather: WeatherData;
    weatherItems: WeatherItem[];
    selectedweatherItem: WeatherItem;
    errorMessage: string;
    constructor(private _weatherService: WeatherService) {}

    ngOnInit(): any {
        this.weatherItems = this._weatherService.getWeatherItems();
    }
    onSelect(weatheritem: WeatherItem): void {
    this.selectedweatherItem = weatheritem;
    this.getWeather();
  }
  getWeather() {
     this._weatherService.getCurrentWeather(this.selectedweatherItem.cityName).subscribe(
                        weather => this.weather = weather,
                        error =>  this.errorMessage = <any>error);
  }
}
