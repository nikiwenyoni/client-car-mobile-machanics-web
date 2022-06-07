import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentDetailsComponent } from './new-payment-details.component';

describe('NewPaymentDetailsComponent', () => {
  let component: NewPaymentDetailsComponent;
  let fixture: ComponentFixture<NewPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
