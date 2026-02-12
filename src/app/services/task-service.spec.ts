import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskService } from './task-service';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TaskService', () => {
  let httpClientServiceSpy: jasmine.SpyObj<HttpClient>;
  let service: TaskService;

    beforeEach(() => {
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          TaskService,
          { provide: HttpClient, useValue: httpClientSpy }
        ]
      }).compileComponents();

      httpClientServiceSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
      service = TestBed.inject(TaskService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected task info (HttpClient called once)', (done: DoneFn) => {
    const expectedTaskInfo = {
      id: 1,
      name: "Design plans",
      description: "Design plans for the test factory",
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.REQUIRE_EVALUATION,
      endDate: new Date(2010, 1, 1),
      taskHistoryEntries: []
    }

    httpClientServiceSpy.get.and.returnValue(of(expectedTaskInfo));

    service.getTaskInfoById(1).subscribe({
      next: (task) => {
        expect(task).withContext('expected task').toEqual(expectedTaskInfo);
        done();
      },
      error: done.fail,
    })
    expect(httpClientServiceSpy.get.calls.count()).withContext('one call').toBe(1);
  })

    it('should return expected task info without history (HttpClient called once)', (done: DoneFn) => {
    const expectedTaskInfo = {
      id: 1,
      name: "Design plans",
      description: "Design plans for the test factory",
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.REQUIRE_EVALUATION,
      endDate: new Date(2010, 1, 1)
    }

    httpClientServiceSpy.get.and.returnValue(of(expectedTaskInfo));

    service.getTaskInfoWithoutHistoryById(1).subscribe({
      next: (task) => {
        expect(task).withContext('expected task').toEqual(expectedTaskInfo);
        done();
      },
      error: done.fail,
    })
    expect(httpClientServiceSpy.get.calls.count()).withContext('one call').toBe(1);
  })
});
