import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../../../admin/event.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  loginFormGroup;
  successUserId;
  roleFinder1;
  roleArr;
  userRole;
  constructor(public eventService: EventService, public af: AngularFireAuth, private router: Router) {
    this.roleFinder1;
    this.roleArr = [];
    this.userRole;
    this.successUserId = "";
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z|A-Z][a-z|A-Z|0-9]+@virtusa.com')]),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData);
      this.af.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
          console.log("successful login id", success.user.uid);
          this.successUserId = success.user.uid;
          this.eventService.fetchLoginUserId('user', this.successUserId)
            .subscribe(rsp => {
              this.roleFinder1 = rsp.json();
              for (let key in this.roleFinder1)
                this.roleArr.push(this.roleFinder1[key].role);
              this.userRole = this.roleArr[0];
              console.log(this.userRole);
              if (this.userRole == "admin") 
                this.router.navigate(['/admin']);
              else 
                this.router.navigate(['/interviewer']);
            });
        })
      .catch (
        (err) => {
      console.log(err);
      this.error = err;
    }
      )
  }
}
}