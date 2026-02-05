import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';

import { TaskForm } from './task-form';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { TaskService } from '../services/task-service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatNativeDateModule } from '@angular/material/core';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    activatedRouteStub = {
      snapshot: {
        params: { projectid: 1, id: 1 }
      }
    };
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['createTask']);
    projectServiceSpy.createTask.and.returnValue(of({
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      endDate: new Date(),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED,
      taskHistoryEntries: []
    }));
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskInfoWithoutHistoryById', 'updateTask']);
    taskServiceSpy.getTaskInfoWithoutHistoryById.and.returnValue(of({
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      endDate: new Date(),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED
    }));
    taskServiceSpy.updateTask.and.returnValue(of({
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      endDate: new Date(),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED,
      taskHistoryEntries: []
    }));

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [TaskForm],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
