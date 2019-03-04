import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  data;
  dataArr;
  sortedArray;
  upcomingArr;
  recentArr;
  constructor(public eventService: EventService) {

    this.dataArr = [];
    this.upcomingArr = [];
    this.recentArr = [];
    this.sortedArray = [];
    this.eventService.fetchData('events').subscribe((rsp) => {
      this.data = rsp.json();

      for (let key in this.data) {
        this.data[key]["key"] = key;
        this.dataArr.push(this.data[key]);
      }

      this.sortedArray = _.orderBy(this.dataArr, ['event_date'], ['asc']);

      this.upcomingArr = _.filter(this.sortedArray, function (event) {
        return new Date() < new Date(event['event_date']);
      });
      this.recentArr = _.filter(this.sortedArray, function (event) {
        return new Date() >= new Date(event['event_date']);
      });

      console.log("recentArr ", this.recentArr);
      console.log("dataArr ", this.dataArr);
      console.log("sortedArr ", this.sortedArray);
      console.dir(this.upcomingArr);
    });
  }

  ngOnInit() { }
  //   public signOut(){
  //     this.eventService.logout();
  //   }
}
