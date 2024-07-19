import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:() => import('./components/student-list/student-list.component')
    },
    {
        path:'new',
        loadComponent:() => import('./components/form-create/form-create.component')
    }

];
