import { SkillsManagementComponent } from './pages/skills-management/skills-management.component';
import { LocationManagementComponent } from './pages/location-management/location-management.component';
import { EventCreationComponent } from './pages/event-creation/event-creation.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ViewEventComponent } from './pages/components/view-event/view-event.component';
import { UpdateEventComponent } from './pages/components/update-event/update-event.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { Route } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';


export const routes: Route[] = [

    {
        path: '',
        component: AdminHomeComponent,
        children: [

            {
                path: 'update-event/:key',
                component: UpdateEventComponent
            },
            {
                path: 'view-event/:key',
                component: ViewEventComponent
            },
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            {
                path: 'event-creation',
                component: EventCreationComponent
            },
            {
                path: 'location-management',
                component: LocationManagementComponent
            },
            {
                path: 'skills-management',
                component: SkillsManagementComponent
            },
            {
                path: '',
                component: AdminDashboardComponent
            }
        ]
    }
]
