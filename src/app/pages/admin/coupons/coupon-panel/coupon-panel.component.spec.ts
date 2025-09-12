import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponPanelComponent } from './coupon-panel.component';
import { of, throwError } from 'rxjs';
import { CouponsService } from '../../../../services/coupons.service';
import { RequestService } from '../../../../services/request.service';

describe('CouponsService', () => {
  let service: CouponsService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RequestService', [
      'getRequest',
      'postRequest',
      'putRequest',
      'deleteRequest',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CouponsService,
        { provide: RequestService, useValue: spy },
      ],
    });

    service = TestBed.inject(CouponsService);
    requestServiceSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
  });

  it('debería obtener todos los cupones (getAllCoupons)', async () => {
    const mockCoupons = [{ id: 1, description: 'Test coupon' }];
    requestServiceSpy.getRequest.and.returnValue(of(mockCoupons));

    const result = await service.getAllCoupons();
    expect(result).toEqual(mockCoupons);
    expect(requestServiceSpy.getRequest).toHaveBeenCalledOnceWith('http://prueba-tecnica-back-25watts-production.up.railway.app/coupons');
  });

  it('debería crear un cupón (createCoupon)', async () => {
    const body = { description: 'New coupon' };
    const mockResponse = { success: true, id: 1 };
    requestServiceSpy.postRequest.and.returnValue(of(mockResponse));

    const result = await service.createCoupon(body);
    expect(result).toEqual(mockResponse);
    expect(requestServiceSpy.postRequest).toHaveBeenCalledOnceWith('http://prueba-tecnica-back-25watts-production.up.railway.app/create-coupon', body);
  });

  it('debería actualizar un cupón (updateCoupon)', async () => {
    const body = { description: 'Updated coupon' };
    const mockResponse = { success: true };
    requestServiceSpy.putRequest.and.returnValue(of(mockResponse));

    const result = await service.updateCoupon(1, body);
    expect(result).toEqual(mockResponse);
    expect(requestServiceSpy.putRequest).toHaveBeenCalledOnceWith('http://prueba-tecnica-back-25watts-production.up.railway.app/edit-coupon/1', body);
  });

  it('debería eliminar un cupón (deleteCoupon)', async () => {
    const mockResponse = { success: true };
    requestServiceSpy.deleteRequest.and.returnValue(of(mockResponse));

    const result = await service.deleteCoupon(1);
    expect(result).toEqual(mockResponse);
    expect(requestServiceSpy.deleteRequest).toHaveBeenCalledOnceWith('http://prueba-tecnica-back-25watts-production.up.railway.app/delete-coupon/1');
  });

  it('debería manejar errores (getAllCoupons)', async () => {
    const mockError = { status: 500, message: 'Error' };
    requestServiceSpy.getRequest.and.returnValue(throwError(() => mockError));

    try {
      await service.getAllCoupons();
      fail('Debería lanzar un error');
    } catch (err) {
      expect(err).toEqual(mockError);
    }
  });
});