import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/student/main-page/main-page.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CourseComponent } from './views/admin/course/course.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'teste', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
