import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSidebarComponent } from './add-edit-sidebar.component';

describe('AddEditSidebarComponent', () => {
  let component: AddEditSidebarComponent;
  let fixture: ComponentFixture<AddEditSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
