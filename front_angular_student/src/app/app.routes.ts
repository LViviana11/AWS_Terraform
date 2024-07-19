import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:() => import('./components/student/student-list/student-list.component')
    },
    {
        path:'new',
        loadComponent:() => import('./components/student/form-create/form-create.component')
    },
    {
        path:':id/edit',
        loadComponent:() => import('./components/student/form-create/form-create.component')
    }, 
    {
        path:':id/view',
        loadComponent:() => import('./components/student/view-student/view-student.component')
    }

];
