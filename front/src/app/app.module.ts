import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CourseComponent } from './views/admin/course/course.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MainPageComponent } from './views/student/main-page/main-page.component';
import { MenuBarAdminComponent } from './views/admin/main-layout/menu-bar-admin/menu-bar-admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CollegeComponent } from './views/admin/college/college.component';
import { FooterAdminComponent } from './views/admin/main-layout/footer-admin/footer-admin.component';
import { StudentSurveyComponent } from './views/student/student-survey/student-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    MainPageComponent,
    MenuBarAdminComponent,
    DashboardComponent,
    CollegeComponent,
    FooterAdminComponent,
    StudentSurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
