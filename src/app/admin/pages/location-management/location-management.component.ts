import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { LocationService } from '../../location.service';
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
  locationsarray;
  locationsData: any;
  location1: FormGroup;
  constructor(private httpService: Http, private eventservice: EventService) {
    this.location;
    this.newarray = [];
    this.locations = [];
    this.locationsarray = [];
    this.location1 = new FormGroup({
      name: new FormControl('', [Validators.required])
    })

  }

  ngOnInit() {
    this.eventservice.fetchData('location').subscribe(locations => {
      this.locations = locations.json();

      for (let key in this.locations) {
        this.locations[key]["key"] = key;
        this.locationsarray.push(this.locations[key]);
      }
      let length = this.locationsarray.length
    })
  }

  onSubmit(formData) {
    this.location = {
      "id": (+(this.locationsarray[this.locationsarray.length - 1]["id"]) + 1).toString(),
      "name": formData.value.name
    };
    this.eventservice.addEntity('location',this.location);
    this.locationsarray.push(this.location);
    this.location1.reset();
  }

  deleteLocation(location) {
    let ID: string = location.id;
    let dbKey: string;
    this.eventservice.fetchData('location').subscribe(skill => {
      this.locations = skill.json();

      for (let key in this.locations) {
        if (this.locations[key]["id"] == ID) 
          dbKey = key;
      }

      this.eventservice.deleteEntity('location', dbKey);

      for (let key in this.locationsarray) {
        if (this.locationsarray[key]["id"] == ID) 
          this.locationsarray.splice(key, 1);
      }
    });
  }
}

