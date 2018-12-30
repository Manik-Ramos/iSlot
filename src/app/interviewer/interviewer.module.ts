import { routes } from './interviewer.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewerDashboardComponent } from './interviewer-dashboard/interviewer-dashboard.component';
import { EventEnrollmentComponent } from './event-enrollment/event-enrollment.component';
import { InterviewerHomeComponent } from './interviewer-home/interviewer-home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InterviewerDashboardComponent, 
    EventEnrollmentComponent, 
    InterviewerHomeComponent
  ]
})
export class InterviewerModule { }
