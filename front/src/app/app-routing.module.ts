import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './views/course/course.component';
import { MainPageComponent } from './views/main-page/main-page.component';

const routes: Routes = [
  {path: '', component: CourseComponent},
  {path: 'teste', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
