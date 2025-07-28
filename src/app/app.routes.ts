import { Routes } from '@angular/router';
import { Tasks } from './tasks/tasks';
import { Signin } from './signin/signin';
import { Login } from './login/login';
export const routes: Routes = [
    {
        path: '',
        component: Signin
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'users',
        component: Tasks
    }
];
