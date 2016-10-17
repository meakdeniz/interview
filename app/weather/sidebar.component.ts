import {Component, OnInit} from '@angular/core';
import {ProfileService} from './profile.service';
import {WeatherService} from './service';

 export class Profile {
     constructor(public profileName: string, public cities: string[]) {};
 }
export class WeatherItem {
    constructor(public cityName: string, public description: string, public temperature: number) {}
}

@Component({
    moduleId: module.id,
    selector: 'my-sidebar',
    template: `
     <div class="sidebar">
        <button class="btn btn-danger" (click)="onSaveNew()">Save List to City</button>
        <ul class="nav nav-pills" *ngFor=" let profile of profiles" (click)="onLoadProfile(profile)">
            <h4>{{profile.profileName}}</h4>
            <li role="presentation">
            <a href="#">
            <span class="delete" (click)="onDeleteProfile($event, profile)"><span class="badge">X</span></span>
                {{ profile.cities.join(', ') }} &raquo;
            </a>
            </li>
        </ul>
    </div>
    `,
    providers: [ProfileService, WeatherService]
})
export class SidebarComponent implements OnInit {
    profiles: Profile[];

    constructor (private _profileService: ProfileService, private _weatherService: WeatherService) {}

    onSaveNew() {
        const cities = this._weatherService.getWeatherItems().map(function (element: WeatherItem) {
            return element.cityName;
        });
        this._profileService.saveNewProfile(cities);
    }
    onLoadProfile(profile: Profile) {
        this._weatherService.clearWeatherItems();
        for (let i = 0; i < profile.cities.length; i++) {
            this._weatherService.searchWeatherData(profile.cities[i])
                .retry()
                .subscribe(
                    data => {
                        const weatherItem = new WeatherItem(data.name, data.weather[0].description, data.main.temp);
                        this._weatherService.addWeatherItem(weatherItem);
                    }
                );
        }
    }
    onDeleteProfile(event: Event, profile: Profile) {
        event.stopPropagation();
        this._profileService.deleteProfile(profile);
    }


    ngOnInit() {
        this.profiles = this._profileService.getProfiles();
    }
}
