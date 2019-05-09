import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/student/main-page/main-page.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CourseComponent } from './views/admin/course/course.component';
import { CollegeComponent } from './views/admin/college/college.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'teste', component: MainPageComponent},
  {path: 'course', component: CourseComponent},
  {path: 'college', component: CollegeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
