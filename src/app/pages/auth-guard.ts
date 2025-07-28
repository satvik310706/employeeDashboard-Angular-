import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const loggedData = localStorage.getItem("leaveUser")
        if (loggedData !== null) {
            return true;
        }
    }
    const router = inject(Router)
    router.navigateByUrl('/login');
    return false;
};
