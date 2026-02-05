
import { AddUserToProjectForm } from './add-user-to-project-form';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddUserToProjectForm', () => {
  let component: AddUserToProjectForm;
  let fixture: ComponentFixture<AddUserToProjectForm>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let activatedRouteStub: any;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    activatedRouteStub = {
      snapshot: {
        params: { id: 1 }
      }
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['addUserToProject']);
    projectServiceSpy.addUserToProject.and.returnValue(of({
      project: { id: 1, name: 'Test Project', description: 'Test Description', startDate: new Date() },
      user: { id: 1, name: 'User 1', email: 'user1@example.com' },
      role: 'OBSERVER'
    }));

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [AddUserToProjectForm],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        { provide: ProjectService, useValue: projectServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserToProjectForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
