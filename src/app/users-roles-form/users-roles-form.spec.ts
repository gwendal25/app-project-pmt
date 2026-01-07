import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesForm } from './users-roles-form';

describe('UsersRolesForm', () => {
  let component: UsersRolesForm;
  let fixture: ComponentFixture<UsersRolesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersRolesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRolesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
