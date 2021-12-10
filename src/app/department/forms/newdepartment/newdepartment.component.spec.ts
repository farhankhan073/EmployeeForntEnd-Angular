import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdepartmentComponent } from './newdepartment.component';

describe('NewdepartmentComponent', () => {
  let component: NewdepartmentComponent;
  let fixture: ComponentFixture<NewdepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewdepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
