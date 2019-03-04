import { Component, OnInit } from '@angular/core';
import { EventService } from '../../admin/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Event } from '../event';
import { Slot } from '../slot';
import { Interviewer } from '../interviewer';
import { Interview } from '../interview';
import { Points } from '../points';

@Component({
  selector: 'app-event-enrollment',
  templateUrl: './event-enrollment.component.html',
  styleUrls: ['./event-enrollment.component.css']
})
export class EventEnrollmentComponent implements OnInit {
  allEventsList;
  allEventsListAsArray;
  eventKey;
  selectedEvent: Event;
  user;
  userArr;
  slots;
  slotArr;
  patchObj;
  userDetails;
  updateSlot;
  pushArr;
  newArray;
  slotObject;
  slotArray: Array<Slot>;
  eventName: String;
  updateEvent;
  interviewer: any;
  updateSlotInterviewers: Array<Interviewer>;
  interview: Interview;
  points: Points

  constructor(public eventService: EventService, private route: ActivatedRoute, private router: Router) {
    this.allEventsList = {};
    this.allEventsListAsArray = [];
    this.eventKey = "";
    this.eventName = "";
    this.slotObject = {};
    this.slotArray = [];
    this.updateSlot = {
      interviewers: Array,
      slotEndTime: String,
      slotId: Number,
      slotStartTime: String
    }
    // this.selectedEvent = {};
    this.updateEvent = {};
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
    // this.interview = {
    //   eventId: String,
    //   eventName: String,
    //   totalInterviews : Number,
    //   totalPoints : Number;
    // }

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

      for (let index in this.slotObject)
        this.slotArray[index] = this.slotObject[index];

      //console.log("this.slotArray",this.slotArray);
    });
  }

  enrollInterviewer(event, slotId) {
    if (event.target.checked)
      this.pushArr.push(slotId);
    else
      this.pushArr.splice(this.pushArr.indexOf(slotId), 1);
    console.log("this.pushArr", this.pushArr);
  }

  updateEventInterviewerList(array) {
    for (let i = 0; i < array.length; i++) {
      let slotId = array[i];
      // slotArr(4) -> updateSlot(1) -> updateSlotInterviewers(interviewer[]) -> 
      for (let j = 0; j < 4; j++) {
        if (this.slotArr[j]['slotId'] == slotId) {
          this.updateSlot = this.slotArr[slotId - 1];

          let interviewer = {
            name: this.interviewer.name,
            phone: this.interviewer.mobile,
            interviewsTaken: 0,
            id: this.interviewer.key
          };

          this.interview = {
            eventId: this.updateEvent.key,
            eventName: this.updateEvent.name,
            totalInterviews: 0
          }

          this.points = {
            eventID: this.updateEvent.key,
            eventName: this.updateEvent.name,
            eventDate: this.updateEvent.event_date,
            skill: this.updateEvent.skills,
            points: 0
          }

          console.log("this.points ", this.points);

          console.log("interviewer ", interviewer);
          console.log("interview ", this.interview);

          this.updateSlotInterviewers = this.updateSlot.interviewers;

          if (this.updateSlotInterviewers[0].name === "") {
            this.updateSlotInterviewers.splice(0);
            this.updateSlotInterviewers.push(interviewer);
          }
          else
            this.updateSlotInterviewers.push(interviewer);

          this.updateSlot.interviewers = this.updateSlotInterviewers;

          this.eventService.addNewInterviewer('events', this.updateEvent.key, slotId - 1, this.updateSlot, this.updateSlotInterviewers.length - 1).subscribe((rsp) => {
            console.log("addInterviewer Event rsp ", rsp.json());
          })

          this.updateInterviewer(this.interviewer, this.interview);
        }
      }
    }
    let points : Array<Points> = this.interviewer.eventPoints;
    points.push(this.points);
    this.eventService.updatePoints('user', this.interviewer.key, points).subscribe((rsp) => {
      console.log("rsp for points ", rsp.json());
    })
  }

  updateInterviewer(interviewer, interviewDetails: Interview) {
    let interviews: Array<Interview>;
    console.log("interviewer inside updateInterviewer... ", interviewer);
    if (!interviewer.interviews) {
      interviews.push(interviewDetails);
      console.log("in if...");
    }
    else {
      console.log("in else...");
      interviews = interviewer.interviews;
      console.log("interviews ", interviews);
      interviews.push(interviewDetails);
      console.log("interviews ", interviews);
    }
    interviewer.interviews = interviews;
    console.log("interviewer ", interviewer);
    // this.eventService.updateInterviewer('user',interviewer.key,interviewer).subscribe((rsp) => {
    //   console.log("updateInterviewer user rsp ",rsp.json());
    // })
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventKey = params['key'];
      this.eventService.fetchData('events')
        .subscribe((events) => {
          this.allEventsListAsArray.push(events.json());
          for (let index = 0; index < this.allEventsListAsArray.length; index++) {
            if (this.allEventsListAsArray[index].key == this.eventKey)
              this.updateEvent = this.allEventsListAsArray[index];
          }
          console.log("this.updateEvent ", this.updateEvent);
          this.slotArr = this.updateEvent['slots'];
          console.log("this.slotArr before ", this.slotArr);
        })
    });


    this.eventService.fetchData('user')
      .subscribe((rsp) => {
        this.user = rsp.json();
        for (let user in this.user) {
          if (this.user[user].email == localStorage.getItem('email')) {
            this.user[user].key = user;
            this.interviewer = this.user[user];
          }
        }
          console.log("interviewer ", this.interviewer);
      })
  }
}
