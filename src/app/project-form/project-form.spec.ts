
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectForm } from './project-form';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { of } from 'rxjs';
import { ProjectInfo } from '../interfaces/project/project';
import { UserRole } from '../enums/userRole';

describe('ProjectForm', () => {
  let component: ProjectForm;
  let fixture: ComponentFixture<ProjectForm>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { params: { id: undefined } }
    };
    const projectSpy = jasmine.createSpyObj('ProjectService', ['getProjectInfoById', 'submitProject', 'updateProject']);

    await TestBed.configureTestingModule({
      declarations: [ProjectForm],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatIconModule,
        MatNativeDateModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProjectService, useValue: projectSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectForm);
    component = fixture.componentInstance;
    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;

    // Mock project data for edit mode
    const mockProject:ProjectInfo = {
      id: 1,
      name: 'Test Project',
      description: 'A test project',
      startDate: new Date(),
      userRole: UserRole.ADMIN,
      tasks: [],
      users: []
    };
    projectServiceSpy.getProjectInfoById.and.returnValue(of(mockProject));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
