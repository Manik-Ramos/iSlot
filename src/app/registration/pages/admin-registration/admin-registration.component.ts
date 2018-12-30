import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { EventService } from '../../../admin/event.service'

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  adminFormGroup: FormGroup;
  state: string = '';
  error: any;
  data: any;
  location: any;
  locationArray: Array<any>

  constructor(private httpService: Http, public eventService: EventService, public af: AngularFireAuth, private router: Router) {
    this.location;
    this.locationArray = [];
    this.data = {};
    this.eventService.fetchData('location').subscribe((rsp) => {
      this.location = rsp.json();
      for(let key in this.location)
        this.locationArray.push(this.location[key]);
      console.log(this.locationArray);
    })
    this.adminFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z|A-Z][a-z|A-Z|0-9|]+@virtusa.com')]),
      password: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[9|8][0-9]{9}$')]),
      location: new FormControl('', [Validators.required]),
    });
  }
  get email() {
    return this.adminFormGroup.get('email');
  }

  ngOnInit() {  }

  onSubmit(formData) {
    if(formData.valid) {
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
          "role": "admin",
          "location": formData.value.location,
          "userId": success.user.uid
        }
        this.eventService.postData(this.data,'user').subscribe(rsp => {
          console.log("rsp",rsp);
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


