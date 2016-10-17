import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {WeatherData} from './weather.data';

class WeatherItem {
    constructor(public cityName: string, public description: string, public temperature: number) {}
}

const WEATHER_ITEMS: WeatherItem[] = [
];

@Injectable()
export class WeatherService {
    private apiId = '126a6fbaacf17e77507b3b6af46875a1';
    constructor (private _http: Http) {}

    getWeatherItems() {
        return WEATHER_ITEMS;
    }
    addWeatherItem(weatherItem: WeatherItem) {
       WEATHER_ITEMS.push(weatherItem);
    }
    clearWeatherItems() {
        WEATHER_ITEMS.splice(0);
    }
    searchWeatherData(cityName: string): Observable<any> {
        return this._http.get('http://api.openweathermap.org/data/2.5/weather?q='
        + cityName + '&APPID=' + this.apiId + '&units=metric')
            .map(res => <WeatherData> res.json())
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json().error || 'server Error');
            });
    }
    getCurrentWeather(city: string) {
        return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + this.apiId)
                        .map(res => <WeatherData> res.json())
                        .catch(error => {
                console.error(error);
                return Observable.throw(error.json().error || 'server Error');
            });
    }
}
