import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CouponsService } from '../../../../services/coupons.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupon-panel',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './coupon-panel.component.html',
  styleUrl: './coupon-panel.component.scss'
})
export class CouponPanelComponent implements OnInit {
  @Input() coupon: any = null;   // si se pasa, es edición
  @Output() cerrar = new EventEmitter<boolean>();
  
  private fb = inject(FormBuilder);
  private couponsService = inject(CouponsService);
  
  couponForm!: FormGroup;
  isEditMode = false;

  ngOnInit() {
    this.isEditMode = !!this.coupon;

    this.couponForm = this.fb.group({
      description: [this.coupon?.description || ''],
      value: [this.coupon?.value || 0],
      expiration_date: [ this.coupon ? this.toISODate(this.coupon.expiration_date) : '' ],
      active: [this.coupon?.active || false],
    });
  }

  private toISODate(dateInput: string | Date | null): string {
    if (!dateInput) return '';

    let d: Date;

    if (typeof dateInput === 'string') {
      // Si es formato yyyy-mm-dd lo parseamos manualmente como fecha local
      const match = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (match) {
        const [_, y, m, day] = match.map(Number);
        d = new Date(y, m - 1, day); // local
      } else {
        d = new Date(dateInput); // fallback (ej: ISO con horas)
      }
    } else {
      d = dateInput;
    }

    if (isNaN(d.getTime())) return '';

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`; // formato yyyy-mm-dd que espera el input date
  }

  onSubmit() {
    if (this.isEditMode) {
      this.couponsService.updateCoupon(this.coupon.id, this.couponForm.value)
        .then(() => this.cerrar.emit(true))
        .catch(err => console.error(err));
    } else {
      this.couponsService.createCoupon(this.couponForm.value)
        .then(() => this.cerrar.emit(true))
        .catch(err => console.error(err));
    }
  }

  onCancel() {
  this.cerrar.emit(false);
}
}
