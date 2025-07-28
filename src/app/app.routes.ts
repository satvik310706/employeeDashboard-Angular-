import { Routes } from '@angular/router';
import { authGuard } from './pages/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login').then((m) => m.Login),
    },
    {
        path: 'signin',
        loadComponent: () =>
            import('./pages/signin/signin').then((m) => m.Signin),
    },
    {
        path: '',
        loadComponent: () =>
            import('./pages/layout/layout').then((m) => m.Layout),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
            },
            {
                path: 'employee',
                loadComponent: () =>
                    import('./pages/employee/employee').then((m) => m.Employee),
            },
            {
                path: 'leave',
                loadComponent: () =>
                    import('./pages/leave/leave').then((m) => m.Leave),
            },
            {
                path: 'empleavemanager',
                loadComponent: () =>
                    import('./pages/empl/empl').then((m) => m.Empl),
            },
            {
                path: 'leavemanagement',
                loadComponent: () =>
                    import('./pages/lm/lm').then((m) => m.Lm),
            },
        ],
    },
];
