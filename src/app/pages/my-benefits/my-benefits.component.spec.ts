import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBenefitsComponent } from './my-benefits.component';

describe('MyBenefitsComponent', () => {
  let component: MyBenefitsComponent;
  let fixture: ComponentFixture<MyBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBenefitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
