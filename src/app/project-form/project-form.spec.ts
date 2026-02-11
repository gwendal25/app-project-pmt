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
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { of, throwError } from 'rxjs';
import { ProjectInfo } from '../interfaces/project/project';
import { UserRole } from '../enums/userRole';
import moment from 'moment';
import { SimpleProjectInfo } from '../interfaces/project/simpleProject';

describe('ProjectFormCreate', () => {
  let component: ProjectForm;
  let fixture: ComponentFixture<ProjectForm>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { params: { id: undefined } }
    };
    const projectSpy = jasmine.createSpyObj('ProjectService', ['submitProject']);

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
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'createProject');
    component.projectForm.setValue({ name: '', description: '', startDate: moment()})
    component.submitProject();
    expect(component.createProject).not.toHaveBeenCalled();
  });

  it('should create project with valid form', () => {
    const projectDto = { 
      name: 'Test project', 
      description: "Test factory in the new eridu", 
      startDate:moment(new Date(2010, 1, 1)) 
    };
    const createdProjectDto: SimpleProjectInfo = {
      id: 1,
      name: 'Test project', 
      description: "Test factory in the new eridu", 
      startDate: new Date(2010, 1, 1)
    }
    projectServiceSpy.submitProject.and.returnValue(of(createdProjectDto));
    component.projectForm.patchValue(projectDto);
    component.submitProject();
    expect(projectServiceSpy.submitProject).toHaveBeenCalled();
  });

    it('should handle error when creating project', () => {
    const projectDto = { 
      name: 'Test project', 
      description: "Test factory in the new eridu",
      startDate:moment(new Date(2010, 1, 1)) 
    };
    projectServiceSpy.submitProject.and.returnValue(throwError(() => new Error('fail')));
    component.projectForm.patchValue(projectDto);
    component.submitProject();
    expect(component.isLoading).toBeFalse();
  });
});

describe('ProjectFormUpdate', () => {
  let component: ProjectForm;
  let fixture: ComponentFixture<ProjectForm>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { params: { id: 1 } }
    };
    const projectSpy = jasmine.createSpyObj('ProjectService', ['getProjectInfoById', 'updateProject']);

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
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock project data for edit mode
    const mockProject:ProjectInfo = {
      id: 1,
      name: 'Test Project',
      description: 'Test factory in the new eridu',
      startDate: new Date(2010, 1, 1),
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

  it('should update project with valid form', () => {
    const updatedProjectDto: SimpleProjectInfo = {
      id: 1,
      name: 'Test project', 
      description: "Test factory in the new eridu", 
      startDate: new Date(2010, 1, 1)
    }
    projectServiceSpy.updateProject.and.returnValue(of(updatedProjectDto));
    component.submitProject();
    expect(projectServiceSpy.updateProject).toHaveBeenCalled();
  });

    it('should handle error when updating project', () => {
    projectServiceSpy.updateProject.and.returnValue(throwError(() => new Error('fail')));
    component.submitProject();
    expect(component.isLoading).toBeFalse();
  });
})
