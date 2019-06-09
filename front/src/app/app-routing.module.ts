import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/student/main-page/main-page.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CourseComponent } from './views/admin/course/course.component';
import { CollegeComponent } from './views/admin/college/college.component';
import { CategoryComponent } from './views/admin/category/category.component';
import { QuestionComponent } from './views/admin/question/question.component';
import { SurveyComponent } from './views/student/survey/survey.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'admin', component: DashboardComponent},
  {path: 'admin/student', component: MainPageComponent},
  {path: 'admin/course', component: CourseComponent},
  {path: 'admin/college', component: CollegeComponent},
  {path: 'admin/category', component: CategoryComponent},
  {path: 'admin/question', component: QuestionComponent},
  {path: 'survey/:student', component: SurveyComponent} 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}