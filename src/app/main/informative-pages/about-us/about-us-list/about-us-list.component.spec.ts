import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsListComponent } from './about-us-list.component';

describe('AboutUsListComponent', () => {
  let component: AboutUsListComponent;
  let fixture: ComponentFixture<AboutUsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
