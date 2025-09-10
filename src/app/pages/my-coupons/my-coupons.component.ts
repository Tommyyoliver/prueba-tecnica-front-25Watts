import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponsService } from '../../services/coupons.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-my-coupons',
  imports: [],
  templateUrl: './my-coupons.component.html',
  styleUrl: './my-coupons.component.scss'
})
export class MyCouponsComponent implements OnInit {

  coupons: any[] = [];

  private router = inject(Router);
  private couponsService = inject(CouponsService);
  private toastService = inject(ToastService);

  showSidebarProfile: boolean = false;

  
  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons() {
    this.couponsService.getAllCoupons()
      .then((data:any) => {
        this.coupons = data;
      })
      .catch((err:any) => {
        console.log(err);
        this.toastService.show('error', 'Ocurrió un error', '')
      })
  }

  useCoupon(ticket: any): void {
    const body = ticket;
    body.active = false;
    this.couponsService.updateCoupon(ticket.id, body)
      .then((data:any) => {
        this.getAllCoupons();
        this.toastService.show('success', 'Cupón canjeado', '')
      })
      .catch((err:any) => {
        console.log(err);
        this.toastService.show('error', 'Ocurrió un error', '')
      })
  }

  handlerShowSidebarProfile(value:boolean) {
    this.showSidebarProfile = value;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.goTo('login');
  }

  goTo(path:string) {
    this.router.navigate([path]);
  }
}
