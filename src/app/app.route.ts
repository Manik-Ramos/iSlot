import { Route } from '@angular/router';


export const routes: Route[] = [
    
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'interviewer',
        loadChildren: './interviewer/interviewer.module#InterviewerModule'
    },
    {
        path: '',
        loadChildren: './registration/registration.module#RegistrationModule'
    }
]
