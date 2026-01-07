import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToProjectForm } from './add-user-to-project-form';

describe('AddUserToProjectForm', () => {
  let component: AddUserToProjectForm;
  let fixture: ComponentFixture<AddUserToProjectForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserToProjectForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToProjectForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
