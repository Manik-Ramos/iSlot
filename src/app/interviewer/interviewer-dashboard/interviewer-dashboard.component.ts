import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { EventService } from '../../admin/event.service';
import { Points } from '../points';


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
  scores: Array<number>;
  date = new Date().getMonth();
  currentMonthScore;

  constructor(public eventService: EventService) {
    this.eventArray;
    this.totalScore = 0;
    this.userArr = [];
    this.dataArr = [];
    this.upcomingArr = [];
    this.recentArr = [];
    this.sortedArray = [];
    this.scores = [0,0,0,0,0,0,0,0,0,0,0,0];
    
    this.eventService.fetchData('events').subscribe((rsp) => {
      this.data = rsp.json();
      this.currentMonthScore = this.scores[this.date];

      for (let key in this.data) {
        this.data[key]["key"] = key;
        this.dataArr.push(this.data[key]);
      }

      this.sortedArray = _.orderBy(this.dataArr, ['event_date'], ['asc']);

      this.upcomingArr = _.filter(this.sortedArray, function (a) {
        return new Date() < new Date(a['event_date']);
      });

      this.recentArr = _.filter(this.sortedArray, function (a) {
        return new Date() >= new Date(a['event_date']);
      });
    });
  }

  ngOnInit() {
    this.eventService.fetchData('user')
      .subscribe((rsp) => {
        this.user = rsp.json();
        for (let key in this.user) {
          if (this.user[key].email === localStorage.getItem('email')) {
            this.user[key]["key"] = key;
            this.userArr.push(this.user[key]);
          }
        }
        let eventPoints:Array<Points> = this.userArr[0].eventPoints;
        for(var index of eventPoints) {
          let date: string = index.eventDate;
          let stringMonth: string = date.substr(5,2); 
          let month : number = +stringMonth;
          this.scores[month-1] += index.points;
        }

        for (let index in this.scores) 
          this.totalScore += this.scores[index];
      });
  }
  //   public signOut(){
  //     this.eventService.logout();
  //   }
}
