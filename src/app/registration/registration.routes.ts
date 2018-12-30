import { InterviewerRegistrationComponent } from './pages/interviewer-registration/interviewer-registration.component';
import { AdminRegistrationComponent } from './pages/admin-registration/admin-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { Route } from '@angular/router';



export const routes: Route[] = [
    
    {
        path: 'login',
        component: LoginComponent
    },                                                                
    {
        path: 'admin-registration',
        component: AdminRegistrationComponent
    },
    {
        path: 'interviewer-registration',
        component: InterviewerRegistrationComponent
    },
    {
        path: '',
        component: LandingPageComponent
    }
]