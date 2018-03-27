import { WeatherService } from '../weather.service';
import { CurrentWeather } from './../current-weather';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-weatherinit',
  templateUrl: './weatherinit.component.html',
  styleUrls: ['./weatherinit.component.css']
})
export class WeatherinitComponent implements OnInit, AfterViewInit {

  @ViewChild('citydata1') cityInfo;

  londonWeather: CurrentWeather = new CurrentWeather('', '', '', '', '', '');
  phoenixWeather: CurrentWeather = new CurrentWeather('', '', '', '', '', '');


  constructor(private ws: WeatherService) { }

  ngOnInit() {

    this.ws.localWeather("london").subscribe(
      (data) => {
        this.londonWeather = new CurrentWeather(
          data.name + "," + data.sys.country,
          this.convertDate(data.dt),
          this.temperatureConverter(data.main.temp),
          data.main.humidity,
          this.converWindSpeed(data.wind.speed),
          data.clouds.all
        );
        this.ws.sendLondonCityData(this.londonWeather);
      }
    );

    this.ws.localWeather("phoenix").subscribe(
      (data) => {
        this.phoenixWeather = new CurrentWeather(
          data.name + "," + data.sys.country,
          this.convertDate(data.dt),
          this.temperatureConverter(data.main.temp),
          data.main.humidity,
          this.converWindSpeed(data.wind.speed),
          data.clouds.all
        );
        this.ws.sendPhoenixCityData(this.phoenixWeather);
      }
    );

   

  }

  ngAfterViewInit(){
    this.ws.newCityData.subscribe(
      (data) => {       
        this.cityInfo.nativeElement.innerHTML = 
        `
        <td>` + data.cityName + `</td>
        <td>` + data.timeStamp + `</td>
        <td>` + data.temp + `</td>
        <td>` + data.humidity + `</td>
        <td>` + data.windSpeed + `</td>
        <td>` + data.cloudiness + `</td>
        `;
      }
    );
   
  }

  converWindSpeed(mps) {
    return (mps / 0.44704).toFixed(2);
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

  
}
