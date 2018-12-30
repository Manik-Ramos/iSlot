import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable(
  // {
  // providedIn: 'root'
//}
)
export class SkillsService {

  constructor(private httpservice:Http) { }
  skillsValue;
  name;
  
  addSkill(skill){
    
    this.httpservice.post("https://islot-app.firebaseio.com/skills.json",skill).subscribe(rsp=>{
      this.skillsValue = rsp.json(),
      console.log("skill",rsp.json().name);
    });

}
}
