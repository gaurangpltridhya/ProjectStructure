import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGameSlidersComponent } from './home-game-sliders.component';

describe('HomeGameSlidersComponent', () => {
  let component: HomeGameSlidersComponent;
  let fixture: ComponentFixture<HomeGameSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGameSlidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGameSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
