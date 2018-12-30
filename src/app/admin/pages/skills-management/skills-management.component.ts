import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {Http} from '@angular/http';
import { EventService } from "../../event.service";

@Component({
  selector: 'app-skills-management',
  templateUrl: './skills-management.component.html',
  styleUrls: ['./skills-management.component.css']
})
export class SkillsManagementComponent implements OnInit {

  skills: any;
  skill;
  skillsarray;
  skillsData:any;
  skills1: FormGroup;
   constructor(private httpService:Http, private eventservice: EventService) {
    this.skill;
    this.skillsarray=[];
    
     this.skills=[];
    this.skills1=new FormGroup({
     name:new FormControl('',[Validators.required])
    })
   }

  ngOnInit() {
  }
  

onSubmit(formData){
  
  
  console.log(formData);
  this.eventservice.fetchData('skills').subscribe(rsp => {
    console.log(rsp);
    this.skillsData= rsp.json();
    for (let key in this.skillsData) {
      this.skillsData[key]["key"] = key;
      this.skillsarray.push(this.skillsData[key]);
    }
    
    for(let key in this.skillsData) {
      this. skills.push(this.skillsData[key]);}
    this.skill={
      "id" : (this.skills.length) + 1,
      "name":formData.value.name
    }
    this.eventservice.addSkill(this.skill);
});
}
}


