import { inject, Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  private requestService = inject(RequestService);

  getAllCoupons(): Promise<any> {
    const source = `http://localhost:3000/coupons`;

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
    const source = `http://localhost:3000/create-coupon`;

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
    const source = `http://localhost:3000/edit-coupon/${id}`;

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
    const source = `http://localhost:3000/delete-coupon/${id}`;

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
