import { CurrentWeather } from './../current-weather';
import { WeatherService } from '../weather.service';
import { WeatherinitComponent } from '../weatherinit/weatherinit.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-city-menu',
  templateUrl: './city-menu.component.html',
  styleUrls: ['./city-menu.component.css']
})
export class CityMenuComponent implements OnInit {

  constructor(private ws:WeatherService) { }

  cityWeather:CurrentWeather = new CurrentWeather('','','','','','');

  ngOnInit() {
  }

  SelectedCity:any;
  AllCities:any = ["Boston","Amsterdam","Mumbai","Shanghai","Sydney"];

  Filter(value:any){
    console.log(value);
    this.sendCityRequest(value);

  }

  sendCityRequest(city:string){
    this.ws.localWeather(city).subscribe(
      (data)=>{
        this.cityWeather = new CurrentWeather(
            data.name+","+data.sys.country,
            this.convertDate(data.dt),
            this.temperatureConverter(data.main.temp),
            data.main.humidity,
            this.converWindSpeed(data.wind.speed),
            data.clouds.all
        );
        
        this.ws.sendNewCityData(this.cityWeather);

      }
    );
  }
  temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    let celc = valNum - 273.15;
    return celc.toFixed(2);
  }

  convertDate(getDate){
    var date = new Date(getDate * 1000);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = (date.getHours() + 24) % 12 || 12;
    var seconds = date.getSeconds();
    var myFormattedDateIs = year+":"+(monthIndex+1)+":"+day+":"+hours+":"+minutes+":"+seconds;
    return myFormattedDateIs;
  }

  converWindSpeed(mps) {
    return (mps / 0.44704).toFixed(2);
  }

}
