import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'warning' | 'error';

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private idCounter = 0;

  show(type: ToastType, title: string, message: string, duration = 4000) {
    const toast: Toast = {
      id: ++this.idCounter,
      type,
      title,
      message
    };

    const current = this.toastsSubject.getValue();
    this.toastsSubject.next([...current, toast]);

    // autodestruir después del tiempo
    setTimeout(() => this.remove(toast.id), duration);
  }

  remove(id: number) {
    const current = this.toastsSubject.getValue();
    this.toastsSubject.next(current.filter(t => t.id !== id));
  }

}
