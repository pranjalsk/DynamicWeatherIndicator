import { WeatherService } from '../weather.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CurrentWeather } from 'app/current-weather';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit, AfterViewInit {


  @ViewChild ('avgTemp') avgTemp;
  @ViewChild ('avgHum') avgHum;
  @ViewChild ('hottestTemp') hottestTemp;
  @ViewChild ('mostHum') mostHum;
  @ViewChild ('nicestCity') goodCity;
  @ViewChild ('badestCity') badestCity;

 

  londonObj:any;
  phoenixObj:any;
  cityObj:any;
  constructor(private ws:WeatherService) { }

  ngOnInit() {
    this.getLondonData().subscribe(()=>{

      this.getPhoenixData().subscribe(()=>{

        this.avgTemp.nativeElement.innerHTML = ` The average temperature is: `+ this.averageTempCalculator(this.londonObj.temp,this.phoenixObj.temp,'');
        this.avgHum.nativeElement.innerHTML = ` The average humidity is: `+ this.averageHumidityCalculator(this.londonObj.humidity,this.phoenixObj.humidity,'');
        this.hottestTemp.nativeElement.innerHTML = ` The hottest city is: `+ this.findHottestCity(this.londonObj,this.phoenixObj,void 0);
        this.mostHum.nativeElement.innerHTML = ` The most humid city is: `+ this.findHumidCity(this.londonObj,this.phoenixObj,void 0);
        this.nicestCity(this.londonObj,this.phoenixObj,void 0);
        
        this.getCityData().subscribe(()=>{

          this.avgTemp.nativeElement.innerHTML = ` The average temperature is: `+ this.averageTempCalculator(this.londonObj.temp,this.phoenixObj.temp,this.cityObj.temp);
          this.avgHum.nativeElement.innerHTML = ` The average humidity is: `+ this.averageHumidityCalculator(this.londonObj.humidity,this.phoenixObj.humidity,this.cityObj.humidity);
          this.hottestTemp.nativeElement.innerHTML = ` The hottest city is: `+ this.findHottestCity(this.londonObj,this.phoenixObj,this.cityObj);
          this.mostHum.nativeElement.innerHTML = ` The most humid city is: `+ this.findHumidCity(this.londonObj,this.phoenixObj,this.cityObj);
          this.nicestCity(this.londonObj,this.phoenixObj,this.cityObj);

        });
      });
    });

    

    





  }

  getLondonData(){
    return this.ws.londonCitySubject.map((data)=>{
      this.londonObj = data;
    });
  }

  getPhoenixData(){
    return this.ws.phoenixCityData.map((data)=>{
      this.phoenixObj = data;
    });
  }

  getCityData(){
    return this.ws.newCityData.map((data)=>{
      this.cityObj = data ;
    });

  }

    
  


  ngAfterViewInit(){  }


  averageTempCalculator(londonTemp,phoenixTemp,cityTemp){

    let sum, avg;
    if(cityTemp !== undefined && cityTemp!==''){
      sum = parseFloat(londonTemp) + parseFloat(phoenixTemp) + parseFloat(cityTemp);
      avg = (sum / 3).toFixed(2); 
    }else{
      sum = parseFloat(londonTemp) + parseFloat(phoenixTemp);
      avg = (sum / 2).toFixed(2); 
    }

    return avg;
  }

  averageHumidityCalculator(londonHum,phoenixHum,cityHum){

    let sum, avg;
    if(cityHum !== undefined && cityHum!==''){
      sum = parseFloat(londonHum) + parseFloat(phoenixHum) + parseFloat(cityHum);
      avg = (sum / 3).toFixed(2); 
    }else{
      sum = parseFloat(londonHum) + parseFloat(phoenixHum);
      avg = (sum / 2).toFixed(2); 
    }

    return avg;
  }

  findHottestCity(londonObj,phoenixObj,cityObj){
    let maxTemp;
    if(cityObj !== undefined && cityObj.temp!== null){      
      maxTemp = Math.max(londonObj.temp,phoenixObj.temp,cityObj.temp);
      if(londonObj.temp == maxTemp) return 'London,GB';
      else if(phoenixObj.temp == maxTemp) return 'Phoenix,US';
      else return cityObj.cityName;
    }else{
      if(londonObj.temp == Math.max(londonObj.temp,phoenixObj.temp)) return 'London,GB';
      else return 'Phoenix,US';
    }
    
  }

  findHumidCity(londonObj,phoenixObj,cityObj){
    let maxHum;
    if(cityObj !== undefined && cityObj.humidity!== null){      
      maxHum = Math.max(londonObj.humidity,phoenixObj.humidity,cityObj.humidity);
      if(londonObj.humidity == maxHum) return 'London,GB';
      else if(phoenixObj.humidity == maxHum) return 'Phoenix,US';
      else return cityObj.cityName;
    }else{
      if(londonObj.humidity == Math.max(londonObj.humidity,phoenixObj.humidity)) return 'London,GB';
      else return 'Phoenix,US';
    }
    
  }


  //NIcest city Algo
  nicestCity(londonObj,phoenixObj,cityObj){
    
        let londonPts = 0, phoenixPts = 0, cityPts = 0;
    
        //lowest humidity
        let minHum;
        if(cityObj !== undefined && cityObj.humidity!== null){    
          minHum = Math.min(londonObj.humidity,phoenixObj.humidity,cityObj.humidity);
          if(londonObj.humidity == minHum) londonPts++;
          else if(phoenixObj.humidity == minHum) phoenixPts++;
          else cityPts++;
        }else{
          if(londonObj.humidity == Math.min(londonObj.humidity,phoenixObj.humidity)) londonPts++;
          else phoenixPts++;
        }

        //lowest windSpeed
        let minWindSpeed;
        if(cityObj !== undefined && cityObj.windSpeed!== null){      
          minWindSpeed = Math.min(londonObj.windSpeed,phoenixObj.windSpeed,cityObj.windSpeed);
          if(londonObj.windSpeed == minWindSpeed) londonPts++;
          else if(phoenixObj.windSpeed == minWindSpeed) phoenixPts++;
          else cityPts++;
        }else{
          if(londonObj.windSpeed == Math.min(londonObj.windSpeed,phoenixObj.windSpeed)) londonPts++;
          else phoenixPts++;
        }

        //lowest cloudiness
        let mincloudiness;
        if(cityObj !== undefined && cityObj.cloudiness!== null){      
          mincloudiness = Math.min(londonObj.cloudiness,phoenixObj.cloudiness,cityObj.cloudiness);
          if(londonObj.cloudiness == mincloudiness) londonPts++;
          else if(phoenixObj.cloudiness == mincloudiness) phoenixPts++;
          else cityPts++;
        }else{
          if(londonObj.cloudiness == Math.min(londonObj.cloudiness,phoenixObj.cloudiness)) londonPts++;
          else phoenixPts++;;
        }
    
            
        //check for good temp
        if(this.goodTemperature(londonObj.temp)) londonPts++;
        if(this.goodTemperature(phoenixObj.temp)) phoenixPts++;
        if(cityObj !== undefined && cityObj.temp!== null) if(this.goodTemperature(cityObj.temp)) cityPts++;
        
    
        console.log("POints:London="+londonPts+"--Phx="+phoenixPts+"--City="+cityPts);
    
        //check for max points
        let bestCity = this.getLargestPoints(londonPts,phoenixPts,cityPts);
        if(cityObj !== undefined && cityObj.temp!== null && bestCity === 'city') bestCity = cityObj.cityName;
    
        //check for bad city
        let badCity;
        if(cityObj !== undefined && cityObj.temp!== null){
            badCity = this.getSmallestPoints(londonPts,phoenixPts,cityPts);
            if(badCity == 'city') badCity = cityObj.cityName;
        }else{
            badCity = this.getSmallestPointTwoCities(londonPts,phoenixPts);
        }

        this.goodCity.nativeElement.innerHTML = ` The nicest weather city is: `+ bestCity;
        this.badestCity.nativeElement.innerHTML = ` The worst weather city is: `+ badCity;
            
    }
    
    
    goodTemperature(temp){
        if(temp>=20 && temp<=27) 
            return true;
        else
            return false;
    }
    
    getLargestPoints(a,b,c){
        if (a >= b && a >= c) {
            return 'London,GB';
        } else if (b >= a && b >= c) {
            return 'Phoenix,US';
        } else {
            return 'city';
        }
    }
    
    getSmallestPoints(a,b,c){
        if (a <= b && a <= c) {
            return 'London,GB';
        } else if (b <= a && b <= c) {
            return 'Phoenix,US';
        } else {
            return 'city';
        }
    }
    getSmallestPointTwoCities(a,b){
        if (a <= b) {
            return 'London,GB';
        } else{
            return 'Phoenix,US';
        } 
    }

}
