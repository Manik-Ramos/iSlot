import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  event;
  eventArr;
  eventKey;
  eventToBeViewed;
  returnArray: Array<any>;

  constructor(public eventService: EventService, private route: ActivatedRoute, private router: Router) {
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
      this.returnArray = this.eventToBeViewed;
    }
    );
  }

  ngOnInit() {
  }

}
