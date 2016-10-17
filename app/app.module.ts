import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';

import { WeatherListComponent } from './weather/list.component';
import { WeatherSearchComponent } from './weather/search.component';
import { SidebarComponent } from './weather/sidebar.component';
import {WeatherDetailComponent} from './weather/list-detail.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent ,
  WeatherListComponent ,
  WeatherSearchComponent,
  SidebarComponent,
  WeatherDetailComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
