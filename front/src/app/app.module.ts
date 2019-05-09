import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CourseComponent } from './views/admin/course/course.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CardCourseComponent } from './views/admin/course/Compoments/card-course/card-course.component';
import { CardCollegeComponent } from './views/admin/course/Compoments/card-college/card-college.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { MenuBarAdminComponent } from './views/admin/main-layout/menu-bar-admin/menu-bar-admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CardCourseComponent,
    CardCollegeComponent,
    MainPageComponent,
    MenuBarAdminComponent,
    DashboardComponent,
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
