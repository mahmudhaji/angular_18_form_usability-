import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { AddSchoolComponent } from './pages/add-school/add-school.component';
import { EditSchoolComponent } from './pages/edit-school/edit-school.component';

export const routes: Routes = [
  {path:'',component:MainLayoutComponent,children:[
    {path:'schoolList',component:SchoolListComponent},
    {path:'addSchool',component:AddSchoolComponent},
    {path:'editSchool/:schoolId',component:EditSchoolComponent}
  ]}
];
