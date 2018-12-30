import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { EventService } from '../../../admin/event.service'

@Component({
  selector: 'app-interviewer-registration',
  templateUrl: './interviewer-registration.component.html',
  styleUrls: ['./interviewer-registration.component.css']
})

export class InterviewerRegistrationComponent implements OnInit {
  interviewerFormGroup: FormGroup;
  state: string = '';
  error: any;
  data: any;
  skills: any;
  skillsArray: Array<any>;
  constructor(private httpService: Http, public eventService: EventService, public af: AngularFireAuth, private router: Router) {
    this.data = {};
    this.skills;
    this.skillsArray = [];
    this.eventService.fetchData('skills').subscribe((rsp) => {
      console.log(rsp.json());
      this.skills = rsp.json();
      for(let key in this.skills) 
        this.skillsArray.push(this.skills[key]);
      console.log(this.skillsArray);
    })
    this.interviewerFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z|A-Z][a-z|A-Z|0-9|]+@virtusa.com')]),
      password: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[9|8][0-9]{9}$')]),
      skills: new FormControl('', [Validators.required]),
    })
  }

  get email() {
    return this.interviewerFormGroup.get('email');
  }
  ngOnInit() {
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.af.auth.createUserWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
          this.data = {
            "name": formData.value.name,
            "email": formData.value.email,
            "password": formData.value.password,
            "mobile": formData.value.mobile,
            "role": "interviewer",
            "skills": formData.value.skills,
            "interviews": {
              "numberOfInterviewsTaken": 0,
              "totalPoints": 0
            },
            "eventPoints": [
              {
                "eventId": "Id",
                "event_date": "Date",
                "points": "Points"
              }
            ],
            "userId": success.user.uid
          }
          this.eventService.postData(this.data, 'user').subscribe(rsp => {
            console.log("rsp", rsp);
          });
          console.log(success);
          this.router.navigate(['/login'])
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
    }
  }
}