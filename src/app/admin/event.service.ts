import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { Router, RouterLink } from '@angular/router';

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
  addSkill(skill){
    
    this.httpservice.post("https://islot-app.firebaseio.com/skills.json",skill).subscribe(rsp=>{
      this.skillsValue = rsp.json(),
      console.log("skill",rsp.json().name);
    });

}
addLocation(location){
  
  this.httpservice.post("https://islot-app.firebaseio.com/location.json",location).subscribe(rsp=>{
    this.locationValue = rsp.json(),
    console.log("location",rsp.json().name);
  });

}
//   logout(){
//     this.af.auth.signOut();
//     console.log('logged out');
//     this.router.navigateByUrl('/login');
//  }

  addNewInterviewer(entity,eventKey,slotId,pushArr){
    const url = this.mainUrl + `${entity}`+'/'+`${eventKey}`+'/slots.json';
    return this.httpservice.patch(url,pushArr[0]);
  }
  

}
