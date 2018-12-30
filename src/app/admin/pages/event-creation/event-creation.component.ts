import { Http } from '@angular/http';
import { EventService } from '../../event.service';
import { Component, OnInit } from '@angular/core';
// import {IMultiSelectionOption} from 'angular-2-dropdown-multiselect';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {
  events: any;
  event;
  eventsData: any;
  eventEnrollment: any;
  interviewersArray;

  constructor(private eventService: EventService, private httpservice: Http) {
    this.event = {};
    this.events = [];
    this.eventEnrollment = [];
    this.eventsData = {};
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
    })
  }
  eventFormGroup: FormGroup;

  ngOnInit() { }

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
    })
  }
}
