import { FormsModule } from '@angular/forms';
import { routes } from './admin.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ComponentsComponent } from './pages/components/components.component';
import { EventCreationComponent } from './pages/event-creation/event-creation.component';
import { LocationManagementComponent } from './pages/location-management/location-management.component';
import { SkillsManagementComponent } from './pages/skills-management/skills-management.component';
import { ViewEventComponent } from './pages/components/view-event/view-event.component';
import { UpdateEventComponent } from './pages/components/update-event/update-event.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { EventService } from './event.service';
import {LocationService} from './location.service';
import {SkillsService} from './skills.service';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    
  ],
  providers:[EventService,LocationService,SkillsService],
  declarations: [
    AdminDashboardComponent,
    AnalyticsComponent,
    ComponentsComponent,
    EventCreationComponent, 
    LocationManagementComponent, 
    SkillsManagementComponent, 
    ViewEventComponent, 
    UpdateEventComponent, 
    AdminHomeComponent
  ],
})
export class AdminModule { }
