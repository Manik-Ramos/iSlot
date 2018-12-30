import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable(
//     {
//   providedIn: 'root'
//}
)
export class LocationService {

  constructor(private httpservice:Http) { }
locationValue;
name;

addLocation(location){
  
  this.httpservice.post("https://islot-app.firebaseio.com/location.json",location).subscribe(rsp=>{
    this.locationValue = rsp.json(),
    console.log("location",rsp.json().name);
  });

}
}