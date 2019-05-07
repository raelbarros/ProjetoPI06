import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CourseComponent } from './views/course/course.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CardCourseComponent } from './views/course/Compoments/card-course/card-course.component';
import { CardCollegeComponent } from './views/course/Compoments/card-college/card-college.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CardCourseComponent,
    CardCollegeComponent
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
