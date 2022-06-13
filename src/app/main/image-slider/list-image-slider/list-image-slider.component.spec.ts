import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImageSliderComponent } from './list-image-slider.component';

describe('ListImageSliderComponent', () => {
  let component: ListImageSliderComponent;
  let fixture: ComponentFixture<ListImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImageSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
