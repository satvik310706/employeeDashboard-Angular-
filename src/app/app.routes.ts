import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Leave } from './pages/leave/leave';
import { LoginModel } from './pages/model/employee.model';
import { Empl } from './pages/empl/empl';
import { Lm } from './pages/lm/lm';
import { authGuard } from './pages/auth-guard';
import { Signin } from './pages/signin/signin';

export const routes: Routes = [
    {
        path: "",
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: "login",
        loadComponent: () => import('./pages/login/login').then(c => c.Login)
    },
    {
        path: "signin",
        component: Signin
    },
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'employee',
                component: Employee
            },
            {
                path: "leave",
                component: Leave
            },
            {
                path: "empleavemanager",
                component: Empl
            },
            {
                path: "leavemanagement",
                component: Lm
            }
        ]
    }
];
