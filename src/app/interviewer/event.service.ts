import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable(
//     {
//   providedIn: 'root'
// }
)
export class EventService {
  
  constructor(private httpservice: Http) {
    
    // this.af.auth.subscribe(auth => {
    //   if(auth) {
    //     this.name = auth;
    //   }
    // });
  }
  eventValue;
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
//   logout(){
//     this.af.auth.signOut();
//     console.log('logged out');
//     this.router.navigateByUrl('/login');
//  }

}

