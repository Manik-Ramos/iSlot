import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../event.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  users;
  userArray;
  interviewerArray;
  event;
  eventArr;
  eventKey;
  eventToBeViewed;
  constructor(public eventService: EventService,private route: ActivatedRoute, private router: Router) {
    this.eventArr = [];
    this.eventToBeViewed = [];
    
    this.route.params.subscribe(params => {
      console.log("params", params.key);
      this.eventKey = params.key;
    });
    this.eventService.fetchData('events').subscribe((rsp) => {
      this.event = rsp.json();
      for (let key in this.event) {
        this.event[key]["key"] = key;
        this.eventArr.push(this.event[key]);
       }
       console.log("event key assigned",this.eventKey)
      for(let index in this.eventArr){
           if(this.eventArr[index].key===this.eventKey){
             this.eventToBeViewed.push(this.eventArr[index]);
           } 
      }

      console.log("event key assigned", this.eventKey);
      console.log("event array", this.eventArr);
      console.log("data to be viewed", this.eventToBeViewed);
    }
    );
    this.userArray = [];
    this.interviewerArray = [];
    this.eventService.fetchData('user').subscribe((rsp) => {
      this.users=rsp.json();
      for(let key in this.users) {
        console.log(key);
        this.userArray.push(this.users[key]);
      }
      console.log(this.userArray);
      for(let key in this.userArray) {
        if(this.userArray[key].role === "interviewer")
          this.interviewerArray.push(this.userArray[key]);
      }
      console.log(this.interviewerArray);
    }); 
  }

  ngOnInit() {
  }
}
