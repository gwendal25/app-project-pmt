
import { TaskDetails } from './task-details';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task-service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';

describe('TaskDetails', () => {
  let component: TaskDetails;
  let fixture: ComponentFixture<TaskDetails>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    // Mock ActivatedRoute with snapshot.params
    activatedRouteStub = {
      snapshot: {
        params: { projectid: 1, id: 1 }
      }
    };
    // Mock TaskService
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskInfoById']);
    taskServiceSpy.getTaskInfoById.and.returnValue(of({
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
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [TaskDetails],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
