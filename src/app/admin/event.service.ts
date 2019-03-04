import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { Router, RouterLink } from '@angular/router';
import { Interviewer } from '../interviewer/interviewer';
import { Points } from '../interviewer/points';

@Injectable(
  //{
  //providedIn: 'root'
  //}
)
export class EventService {
  constructor(private httpservice: Http) { }
  skillsValue;
  eventValue;
  locationValue;
  mainUrl = "https://islot-app.firebaseio.com/";

  fetchData(entity) {
    const url = this.mainUrl + `${entity}.json`;
    return this.httpservice.get(url);
  }

  Addevent(event) {
    this.httpservice.post("https://islot-app.firebaseio.com/events.json", event).subscribe(rsp => {
      this.eventValue = rsp.json(),
        console.log("eventId", rsp.json().name);
    });
  }

  fetchLoginUserId(entity, successId) {
    const url = `https://islot-app.firebaseio.com/${entity}.json?orderBy=\"userId\"&equalTo=\"${successId}\"`;
    return this.httpservice.get(url);
  }

  postData(value, entity) {
    console.log('value service', value);
    const finalValue = JSON.stringify(value);
    const url = this.mainUrl + `${entity}.json`;
    return this.httpservice.post(url, finalValue);
  }

  addEntity(entity:String,value:any) {
    this.httpservice.post("https://islot-app.firebaseio.com/"+`${entity}.json`, value).subscribe(rsp => {});
  }

  deleteEntity(entity:String,key:String) {
    const url=this.mainUrl + `${entity}/` + `${key}.json`;
    this.httpservice.delete(url).subscribe(rsp => { }); 
  }

  //   logout(){
  //     this.af.auth.signOut();
  //     console.log('logged out');
  //     this.router.navigateByUrl('/login');
  //  }

  addNewInterviewer(entity: String, eventKey: String, slotId: number, slotArray: Array<Interviewer>, index: number) {
    const url = this.mainUrl + `${entity}` + '/' + `${eventKey}` + '/slots/' + slotId + '.json';
    return this.httpservice.patch(url, slotArray);
  }

  updateInterviewer(entity: String, interviewerKey: String, interviewer) {
    const url = this.mainUrl + `${entity}` + '/' + `${interviewerKey}` + '.json';
    let interviews = interviewer.interviews;
    return this.httpservice.patch(url, JSON.stringify({ interviews }));
  }

  updatePoints(entity: String, interviewerKey: string, points: Array<Points>) {
    const url = this.mainUrl + `${entity}` + '/' + `${interviewerKey}` + '/eventPoints.json';
    return this.httpservice.put(url, points);
  }


}
