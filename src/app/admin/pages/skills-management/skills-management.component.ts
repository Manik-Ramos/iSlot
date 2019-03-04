import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { EventService } from "../../event.service";
import { Skill } from '../../../interviewer/skill';

@Component({
  selector: 'app-skills-management',
  templateUrl: './skills-management.component.html',
  styleUrls: ['./skills-management.component.css']
})
export class SkillsManagementComponent implements OnInit {

  skills: any;
  skill;
  skillsarray2;
  skillsarray;
  skills1: FormGroup;
  constructor(private httpService: Http, private eventservice: EventService) {
    this.skill;
    this.skillsarray = [];
    this.skillsarray2 = [];
    this.skills = [];
    this.skills1 = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.eventservice.fetchData('skills').subscribe(skills => {
      this.skills = skills.json();

      for (let key in this.skills) {
        this.skills[key]["key"] = key;
        this.skillsarray.push(this.skills[key]);
      }
      let length = this.skillsarray.length
    })
  }

  onSubmit(formData) {
    this.skill = {
      "id": (+(this.skillsarray[this.skillsarray.length - 1]["id"]) + 1).toString(),
      "name": formData.value.name
    };
    this.eventservice.addEntity('skills', this.skill);
    this.skillsarray.push(this.skill);
    this.skills1.reset();
  }

  deleteSkill(skill) {
    let ID: string = skill.id;
    let dbKey: string;
    this.eventservice.fetchData('skills').subscribe(skill => {
      this.skills = skill.json();
      for (let key in this.skills) {
        if (this.skills[key]["id"] == ID)
          dbKey = key;
      }
      this.eventservice.deleteEntity('skills', dbKey);

      for (let key in this.skillsarray) {
        if (this.skillsarray[key]["id"] == ID) 
          this.skillsarray.splice(key, 1);
      }
    });
  }
}
