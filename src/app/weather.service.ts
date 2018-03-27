import { CurrentWeather } from './current-weather';
import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WeatherService {

  //myWeather:CurrentWeather;

  constructor(private http:Http) {   }

  localWeather(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f9cd3610e9144f965638b5be216a0b1d`)
    .map((response:Response) => response.json());
  }

  public newCityData = new Subject<any>();

  sendNewCityData(data){
    this.newCityData.next(data);
  }

  public londonCitySubject = new Subject<any>();
  sendLondonCityData(data){
    this.londonCitySubject.next(data);
  }

  public phoenixCityData = new Subject<any>();
  sendPhoenixCityData(data){
    this.phoenixCityData.next(data);
  }

}
