import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';

import { TaskForm } from './task-form';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { TaskService } from '../services/task-service';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatNativeDateModule } from '@angular/material/core';
import moment from 'moment';

describe('TaskFormCreate', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: {
        params: { projectid: 1, id: null }
      }
    };
    const projectSpy = jasmine.createSpyObj('ProjectService', ['createTask']);
    const taskSpy = jasmine.createSpyObj(['TaskService', []]);

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
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProjectService, useValue: projectSpy },
        { provide: TaskService, useValue: taskSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'createTask');
    component.taskForm.setValue({ name: '', description: '', endDate: moment(new Date()), taskPriority: TaskPriority.MEDIUM, taskStatus: TaskStatus.NOT_STARTED})
    component.submitTask();
    expect(component.createTask).not.toHaveBeenCalled();
  })

  it('should create task with valid form', () => {
    const taskDto = {
      name: 'Prepare terrain',
      description: 'Prepare the terrain for the new factory',
      endDate: moment(new Date()),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED,
    };
    const createdTaskDto = {
      id: 1,
      name: 'Prepare terrain',
      description: 'Prepare the terrain for the new factory',
      endDate: new Date(),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED,
      taskHistoryEntries: []
    };
    projectServiceSpy.createTask.and.returnValue(of(createdTaskDto));
    component.taskForm.setValue(taskDto);
    component.submitTask();
    expect(projectServiceSpy.createTask).toHaveBeenCalled();
  })

  it('should handle server error when creating task', () => {
    const taskDto = {
      name: 'Prepare terrain',
      description: 'Prepare the terrain for the new factory',
      endDate: moment(new Date()),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED,
    };
    projectServiceSpy.createTask.and.returnValue(throwError(() => new Error('fail')));
    component.taskForm.setValue(taskDto);
    component.submitTask();
    expect(component.isLoading).toBeFalse();
  })
});

describe('TaskFormUpdate', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: {
        params: { projectid: 1, id: 1 }
      }
    };
    const taskSpy = jasmine.createSpyObj('TaskService', ['getTaskInfoWithoutHistoryById', 'updateTask']);
    const projectSpy = jasmine.createSpyObj('ProjectService', ['createTask']);
    taskSpy.getTaskInfoWithoutHistoryById.and.returnValue(of({
      id: 1,
      name: 'Prepare terrain',
      description: 'Prepare the terrain for the new factory',
      endDate: new Date(2010, 1, 1),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED
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
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProjectService, useValue: projectSpy},
        { provide: TaskService, useValue: taskSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  it('should update task with valid form', () => {
    const updatedTaskDto = {
      id: 1,
      name: 'Prepare terrain',
      description: 'Prepare the terrain for the new factory',
      endDate: new Date(2010, 1, 1),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED,
      taskHistoryEntries: []
    };
    taskServiceSpy.updateTask.and.returnValue(of(updatedTaskDto));
    component.submitTask();
    expect(taskServiceSpy.updateTask).toHaveBeenCalled();
  })

  it('should handle server error when updating task', () => {
    taskServiceSpy.updateTask.and.returnValue(throwError(() => new Error('fail')));
    component.submitTask();
    expect(taskServiceSpy.updateTask).toHaveBeenCalled();
  })
});
