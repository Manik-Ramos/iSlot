import { Http } from '@angular/http';
import { EventService } from '../../event.service';
import { Component, OnInit } from '@angular/core';
// import {IMultiSelectionOption} from 'angular-2-dropdown-multiselect';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Skill } from '../../../interviewer/skill';
@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {
  events: any;
  event;
  locations:any;
  locationsData;
  skillsData;
  eventsData: any;
  eventEnrollment: any;
  interviewersArray;
  eventFormGroup: FormGroup;
  skills:any;
  eventSuccess;
  
  constructor(private eventService: EventService, private httpservice: Http) {
    this.event = {};
    this.events = [];
    this.eventEnrollment = [];
    this.eventsData = {};
    this.skills = []; 
    this.skillsData = {};
    this.locationsData = {};
    this.locations = [];
    this.eventFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      event_date: new FormControl('', [Validators.required]),
      start_time: new FormControl('', [Validators.required]),
      end_time: new FormControl('', [Validators.required]),
      slot1StartTime: new FormControl('', [Validators.required]),
      slot1EndTime: new FormControl('', [Validators.required]),
      slot2StartTime: new FormControl('', [Validators.required]),
      slot2EndTime: new FormControl('', [Validators.required]),
      slot3StartTime: new FormControl('', [Validators.required]),
      slot3EndTime: new FormControl('', [Validators.required]),
      slot4StartTime: new FormControl('', [Validators.required]),
      slot4EndTime: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required])
    });
}

  ngOnInit() {
    this.eventService.fetchData('skills').subscribe(skill => {
      this.skillsData = skill.json();
      for (let key in this.skillsData)
        this.skills.push(this.skillsData[key]);
    });
 
    this.eventService.fetchData('location').subscribe(rsp => {
      this.locationsData = rsp.json();
      for(let key in this.locationsData) {
        this.locations.push(this.locationsData[key]);
      }
    })
  }

  onSubmit(formData) {
    console.log(formData);
    this.eventService.fetchData('events').subscribe(rsp => {
      console.log(rsp);
      this.eventsData = rsp.json();

      for (let key in this.eventsData)
        this.events.push(this.eventsData[key]);

      this.event = {
        "id": (this.events.length) + 1,
        "name": formData.value.name,
        "description": formData.value.description,
        "event_date": formData.value.event_date,
        "slots": [
          {
            "interviewers": [
              {
                "interviewsTaken": "",
                "name": "",
                "phone": ""
              }
             ],
            "slotEndTime": formData.value.slot1EndTime,
            "slotId": 1,
            "slotStartTime": formData.value.slot1StartTime
          },
          {
            "interviewers": [
              {
                "interviewsTaken": "",
                "name": "",
                "phone": ""
              }
             ],
            "slotEndTime": formData.value.slot2EndTime,
            "slotId": 2,
            "slotStartTime": formData.value.slot2StartTime
          },
          {
            "interviewers": [
              {
                "interviewsTaken": "",
                "name": "",
                "phone": ""
              }
             ],
            "slotEndTime": formData.value.slot3EndTime,
            "slotId": 3,
            "slotStartTime": formData.value.slot3StartTime
          },
          {
            "interviewers": [
              {
                "interviewsTaken": "",
                "name": "",
                "phone": ""
              }
            ],
            "slotEndTime": formData.value.slot4EndTime,
            "slotId": 4,
            "slotStartTime": formData.value.slot4StartTime
          }
        ],
        "start_time": formData.value.start_time,
        "end_time": formData.value.end_time,
        "location": formData.value.location,
        "skills": formData.value.skills,
      }
      console.log(this.event);
      this.eventService.Addevent(this.event);
      formData.reset();
    })
    this.eventSuccess = '<div class="alert alert-success" *ngIf="eventFormGroup.valid && eventFormGroup.submit">Event Created Successfully!!</div>'
  }
}
