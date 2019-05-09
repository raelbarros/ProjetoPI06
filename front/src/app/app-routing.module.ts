import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CourseComponent } from './views/admin/course/course.component';
import { CardCourseComponent } from './views/admin/course/Compoments/card-course/card-course.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'teste', component: MainPageComponent},
  {path: 'curso', component: CardCourseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
