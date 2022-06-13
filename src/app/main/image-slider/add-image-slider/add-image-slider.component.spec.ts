import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageSliderComponent } from './add-image-slider.component';

describe('UploadImagesComponent', () => {
  let component: AddImageSliderComponent;
  let fixture: ComponentFixture<AddImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImageSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
