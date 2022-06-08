import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConfirmationPopupComponent } from './custom-confirmation-popup.component';

describe('CustomConfirmationPopupComponent', () => {
  let component: CustomConfirmationPopupComponent;
  let fixture: ComponentFixture<CustomConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConfirmationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
