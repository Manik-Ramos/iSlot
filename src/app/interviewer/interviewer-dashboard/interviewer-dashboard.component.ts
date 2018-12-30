import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { EventService } from '../../admin/event.service';


@Component({
  selector: 'app-interviewer-dashboard',
  templateUrl: './interviewer-dashboard.component.html',
  styleUrls: ['./interviewer-dashboard.component.css']
})
export class InterviewerDashboardComponent implements OnInit {
  data;
  dataArr;
  sortedArray;
  upcomingArr;
  recentArr;
  user;
  userArr;
  totalScore;
  eventArray;
  scores : Array<any>;
  date =  new Date().getMonth();
  currentMonthScore;

  constructor(public eventService: EventService) {
    this.eventArray;
    this.totalScore = 0;
    this.userArr = [];
    this.dataArr = [];
    this.upcomingArr = [];
    this.recentArr = [];
    this.sortedArray = [];
    this.scores = [1,2,3,4,5,6,7,8,9,10,11,12];
    this.eventService.fetchData('events').subscribe((rsp) => {
    this.data = rsp.json();
    
    this.currentMonthScore = this.scores[this.date];

    for(let index in this.scores)
      this.totalScore += this.scores[index];
    console.log("this.totalScore",this.totalScore);

    for (let key in this.data) {
      this.data[key]["key"] = key;
      this.dataArr.push(this.data[key]);
    }



    this.sortedArray = _.orderBy(this.dataArr, ['event_date'], ['asc']);
    this.upcomingArr = _.filter(this.sortedArray, function( a ){
      return  new Date() < new Date(a['event_date']);
      });
      this.recentArr = _.filter(this.sortedArray, function( a ){
        return  new Date() >= new Date(a['event_date']);
        });
    console.log("recentArr ", this.recentArr);
    console.log("dataArr ", this.dataArr);
    console.log("sortedArr ", this.sortedArray);
    console.dir(this.upcomingArr);
  });
   this.eventService.fetchData('user').subscribe((rsp) => {
      this.user = rsp.json();
      for (let key in this.user){
        if(this.user[key].userId == 'q7daZSPbZWfgQrjgkXJVEqalSH72')
        this.userArr.push(this.user[key]);
      }   
      console.log("userArr ",this.userArr);
    });
   
}

  ngOnInit() { }
  //   public signOut(){
  //     this.eventService.logout();
  //   }
}
