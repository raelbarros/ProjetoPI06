import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CourseComponent } from './views/admin/course/course.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MainPageComponent } from './views/student/main-page/main-page.component';
import { MenuBarAdminComponent } from './views/admin/main-layout/menu-bar-admin/menu-bar-admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CollegeComponent } from './views/admin/college/college.component';
import { FooterAdminComponent } from './views/admin/main-layout/footer-admin/footer-admin.component';
import { CategoryComponent } from './views/admin/category/category.component';
import { QuestionComponent } from './views/admin/question/question.component';
import { SurveyComponent } from './views/student/survey/survey.component';

import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from  'ngx-ui-loader';
import { HttpConfigInterceptor } from './interceptor/http.interceptor';
import { LoginComponent } from './views/admin/login/login.component';
import { PageNotFoundComponent } from './views/student/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    MainPageComponent,
    MenuBarAdminComponent,
    DashboardComponent,
    CollegeComponent,
    FooterAdminComponent,
    CategoryComponent,
    QuestionComponent,
    SurveyComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
