import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactUsComponent } from './add-contact-us.component';

describe('AddContactUsComponent', () => {
  let component: AddContactUsComponent;
  let fixture: ComponentFixture<AddContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
