import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Http} from '@angular/http';
import {LocationService} from '../../location.service';
import { EventService } from "../../event.service";


@Component({
  selector: 'app-location-management',
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.css']
})
export class LocationManagementComponent implements OnInit {
 
  
    locations: any;
    location;
    newarray;
    locationsData:any;
    location1: FormGroup;
  constructor(private httpService:Http, private eventservice:EventService) {
    this.location;
    this.newarray=[];
    this.locations = [];
    this.location1 = new FormGroup({
     name:new FormControl('',[Validators.required])
    }) 

   }
 
  ngOnInit() {
  }
  onSubmit(formData){
    console.log(formData);
    this.eventservice.fetchData('locations').subscribe(rsp => {
      console.log(rsp);
      this.locationsData= rsp.json();
     for (let key in this.locationsData) {
        this.locationsData[key]["key"] = key;
        this.location.push(this.locationsData[key]);
      }
    
      
      for(let key in this.locationsData) 
        this. locations.push(this.locationsData[key]);
      this.location={
         "id" : (this.locations.length) + 1,
        "name":formData.value.name
       
      }
      
      this.eventservice.addLocation(this.location);
     

    });

  }
}

