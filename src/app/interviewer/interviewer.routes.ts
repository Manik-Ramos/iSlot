import { EventEnrollmentComponent } from './event-enrollment/event-enrollment.component';
import { InterviewerDashboardComponent } from './interviewer-dashboard/interviewer-dashboard.component';
import { Route } from '@angular/router';
import { InterviewerHomeComponent } from './interviewer-home/interviewer-home.component';


export const routes: Route[] = [
    {
        path: '',
        component: InterviewerHomeComponent,
        children:[
                {
                    path: '',
                    component: InterviewerDashboardComponent
                },
                {
                    path: 'event-enrollment/:key',
                    component: EventEnrollmentComponent
                }

            ]
    }
]