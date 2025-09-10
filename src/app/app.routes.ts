import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../guard/auth.guard';
import { MyCouponsComponent } from './pages/my-coupons/my-coupons.component';
import { CouponsComponent } from './pages/admin/coupons/coupons.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'admin/login' },

    { path: 'login', component: LoginComponent },

    { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
    { path: 'coupons', component: MyCouponsComponent, canActivate:[AuthGuard] },


    { path: 'admin/coupons', component: CouponsComponent, canActivate:[AuthGuard] },

    { path:'**', redirectTo:'login' }
];
