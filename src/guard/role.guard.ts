import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const user = localStorage.getItem('user');
        if (!user) {
            this.router.navigate(['/login']);
            return false;
        }

        const parsedUser = JSON.parse(user);
        const requiredRoles = route.data['roles'] as Array<string>;

        if (requiredRoles.includes(parsedUser.role)) {
            return true;
        }

        // Redirect according to role
        if (parsedUser.role === 'admin') {
            this.router.navigate(['/admin-home']);
        } else {
            this.router.navigate(['/home']);
        }
        return false;
    }
}
