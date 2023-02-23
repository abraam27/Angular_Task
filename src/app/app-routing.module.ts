import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Components/add/add.component';
import { UpdateComponent } from './Components/update/update.component';
import { HomeComponent } from './Components/home/home.component';
import { StudentDetailsComponent } from './Components/student-details/student-details.component';
import { ErrorComponent } from './Components/error/error.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'students',component:HomeComponent},
  {path:'students/:id',component:StudentDetailsComponent},
  {path:'add',component:AddComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
