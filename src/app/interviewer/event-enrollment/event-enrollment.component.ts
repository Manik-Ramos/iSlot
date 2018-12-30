import { Component, OnInit } from '@angular/core';
import { EventService } from '../../admin/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../event';
import { Slot } from '../slot';

@Component({
  selector: 'app-event-enrollment',
  templateUrl: './event-enrollment.component.html',
  styleUrls: ['./event-enrollment.component.css']
})
export class EventEnrollmentComponent implements OnInit {
  allEventsList:Object;
  allEventsListAsArray;
  eventKey;
  selectedEvent: Event;
  user;
  userArr;
  slots;
  slotArr;
  patchObj;
  userDetails;
  pushArr;
  newArray;
  slotObject;
  slotArray: Array<Slot>;
  eventName: String;

  constructor(public eventService: EventService, private route: ActivatedRoute, private router: Router) {
    this.allEventsList = {};
    this.allEventsListAsArray = [];
    this.eventKey = "";
    this.eventName = "";
    this.slotObject = {};
    this.slotArray = [];
    // this.selectedEvent = {};
    this.userArr = [];
    this.slotArr = [];
    this.newArray = [];
    this.slots;
    this.patchObj = {};
    this.userDetails = {};
    this.pushArr = [];
    this.route.params.subscribe(params => {
      this.eventKey = params.key;
    });

    this.eventService.fetchData('events').subscribe((rsp) => {
      this.allEventsList = rsp.json();
      //console.log("this.allEventsList", this.allEventsList);
      for (let key in this.allEventsList) {
        this.allEventsList[key]["key"] = key;
        this.allEventsListAsArray.push(this.allEventsList[key]);
      }
      //console.log("this.allEventsListasArray", this.allEventsListAsArray);
      for (let index in this.allEventsListAsArray) {
        if (this.allEventsListAsArray[index].key === this.eventKey) {
          this.selectedEvent = this.allEventsListAsArray[index];
          this.eventName = this.selectedEvent.name;
        }
      }
      this.slotObject = this.selectedEvent.slots;
      //console.log("this.slotObject",this.slotObject);
      
      for(let index in this.slotObject)
        this.slotArray[index] = this.slotObject[index];
     
      //console.log("this.slotArray",this.slotArray);
    });
  }

  enrollInterviewer(event,slotId) {
    console.log("this.pushArr",this.pushArr);
      console.log("this.pushArr",event);
    if(event.target.checked)
      this.pushArr.push(slotId);
    else 
      this.pushArr.splice(this.pushArr.indexOf(slotId),1);  
      console.log("this.pushArr",this.pushArr);
      console.log("this.pushArr",event);
    // this.pushArr = [];
    // console.log("event status", eventStatus);
    // console.log("slotId", slotId);
    // this.eventService.fetchData('user').subscribe((rsp) => {
    //   this.user = rsp.json();
    //   for (let key in this.user) {
    //     if (this.user[key].userId == 'q7daZSPbZWfgQrjgkXJVEqalSH72') {
    //       this.patchObj = {
    //         "name": this.user[key]['name'],
    //         "phone": this.user[key]['mobile'],
    //         "interviewsTaken" : 0
    //       }
    //     }
    //   }
    // });
    // if (eventStatus.target.checked) {
    //   console.log("event key assigned", this.eventKey);
    //   for (let key in this.allEventsListAsArray) {
    //     if (this.allEventsListAsArray[key].key === this.eventKey)
    //       this.slots = this.allEventsListAsArray[key].slots;
    //   }
    //   console.log("this.slots",this.slots);
    //   this.pushArr.push(this.slots);
    //   console.log("this.push",this.pushArr);
    //   for (let index = 0; index < 4; index++) {
    //     if (index == slotId - 1) {
    //       this.pushArr[0][index].interviewers.push(this.patchObj);
    //       console.log("this.push",this.pushArr);
    //     }
    //   }
    //   this.eventService.addNewInterviewer('events',this.eventKey,slotId,this.pushArr[0]).subscribe((rsp) => {
    //     console.log(rsp.json);
    //   });
    //}
  }

  ngOnInit() { }
}
