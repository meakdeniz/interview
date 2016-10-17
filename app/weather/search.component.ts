import {Component, OnInit} from '@angular/core';
import {WeatherService} from './service';
import {Subject} from 'rxjs/Subject';

class WeatherItem {
    constructor(public cityName: string, public description: string, public temperature: number) {}
}

@Component({
    selector: 'my-search',
    template: `
        <section>
            <form (ngSubmit)="onSubmit()">
            <div class="input-group"  style="width: 75%;">
                <input type="text" 
                ngControl="location" type="text" id="city" (input)="onSearchLocation(input.value)" required #input
                 class="form-control" placeholder="Search for..." >
                    <span class="input-group-btn">
                        <button type="submit" class="btn btn-success">Add City</button>
                    </span>
                </div>
            </form>
            <div>
            <span class="label label-info">City found:</span> {{data.name}}
            </div>
        </section>
    `,
    providers: [WeatherService],
})
export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data: any = {};
    constructor(private _weatherService: WeatherService) {}
    onSubmit() {
        const weatherItem = new WeatherItem(this.data.name, this.data.weather[0].description, this.data.main.temp);
        this._weatherService.addWeatherItem(weatherItem);

    }

    onSearchLocation(cityName: string) {
         this.searchStream
            .next(cityName);
    }

    ngOnInit() {
        this.searchStream
           .debounceTime(300)
           .distinctUntilChanged()
           .switchMap((input: string) => this._weatherService.searchWeatherData(input))
           .subscribe(
              data => this.data = data
            );
    }
}
