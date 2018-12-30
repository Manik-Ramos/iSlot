import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminRegistrationComponent } from './pages/admin-registration/admin-registration.component';
import { InterviewerRegistrationComponent } from './pages/interviewer-registration/interviewer-registration.component';
import { routes } from "./registration.routes";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

export const config = {
  apiKey: "AIzaSyDi7NmM4rjI_D0uPpw4ht20-87Ko1TiJjU",
  authDomain: "islot-app.firebaseapp.com",
  databaseURL: "https://islot-app.firebaseio.com",
  projectId: "islot-app",
  storageBucket: "islot-app.appspot.com",
  messagingSenderId: "395855202200"
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    RouterModule.forChild(routes)
  ],
  declarations: [LandingPageComponent, LoginComponent, AdminRegistrationComponent, InterviewerRegistrationComponent]
})
export class RegistrationModule { }

