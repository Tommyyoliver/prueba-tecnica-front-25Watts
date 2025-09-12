import { inject, Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  private requestService = inject(RequestService);

  getAllCoupons(): Promise<any> {
    const source = `https://prueba-tecnica-back-25watts-production.up.railway.app/coupons`;

    return new Promise((resolve, reject) => {
      this.requestService.getRequest(source).subscribe({
        next: (data: any[]) => {
          resolve(data);
        },
        error: (err:any) => {
          reject(err);
        }
      })
    })
  }

  createCoupon(body:any): Promise<any> {
    const source = `https://prueba-tecnica-back-25watts-production.up.railway.app/create-coupon`;

    return new Promise((resolve, reject) => {
      this.requestService.postRequest(source, body).subscribe({
        next: (data: any[]) => {
          resolve(data);
        },
        error: (err:any) => {
          reject(err);
        }
      })
    })
  }

  updateCoupon(id:number, body:any): Promise<any> {
    const source = `https://prueba-tecnica-back-25watts-production.up.railway.app/edit-coupon/${id}`;

    return new Promise((resolve, reject) => {
      this.requestService.putRequest(source, body).subscribe({
        next: (data: any[]) => {
          resolve(data);
        },
        error: (err:any) => {
          reject(err);
        }
      })
    })
  }

  deleteCoupon(id:number): Promise<any> {
    const source = `https://prueba-tecnica-back-25watts-production.up.railway.app/delete-coupon/${id}`;

    return new Promise((resolve, reject) => {
      this.requestService.deleteRequest(source).subscribe({
        next: (data:any) => {
          resolve(data);
        },
        error: (err:any) => {
          reject(err);
        }
      })
    })
  }
}
