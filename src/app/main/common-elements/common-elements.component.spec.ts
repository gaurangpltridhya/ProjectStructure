import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonElementsComponent } from './common-elements.component';

describe('CommonElementsComponent', () => {
  let component: CommonElementsComponent;
  let fixture: ComponentFixture<CommonElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
