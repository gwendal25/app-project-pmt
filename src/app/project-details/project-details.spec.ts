
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetails } from './project-details';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { TaskService } from '../services/task-service';
import { of } from 'rxjs';
import { UserRole } from '../enums/userRole';

describe('ProjectDetails', () => {
  let component: ProjectDetails;
  let fixture: ComponentFixture<ProjectDetails>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { params: { id: 1 } }
    };
    const projectSpy = jasmine.createSpyObj('ProjectService', ['getProjectInfoById']);
    const taskSpy = jasmine.createSpyObj('TaskService', ['assignTask', 'unassignTask', 'setNotificationTask']);

    await TestBed.configureTestingModule({
      declarations: [ProjectDetails],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProjectService, useValue: projectSpy },
        { provide: TaskService, useValue: taskSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetails);
    component = fixture.componentInstance;
    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;

    // Mock projectInfo data
    const mockProjectInfo = {
      id: 1,
      name: 'Test Project',
      description: 'A test project',
      startDate: new Date(),
      userRole: UserRole.ADMIN,
      tasks: [],
      users: []
    };
    projectServiceSpy.getProjectInfoById.and.returnValue(of(mockProjectInfo));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should identify admin role', () => {
    expect(component.isAdmin(UserRole.ADMIN)).toBeTrue();
    expect(component.isAdmin(UserRole.MEMBER)).toBeFalse();
  });

  it('should identify member role', () => {
    expect(component.isMember(UserRole.MEMBER)).toBeTrue();
    expect(component.isMember(UserRole.ADMIN)).toBeFalse();
  });

  it('should identify admin or member', () => {
    expect(component.isAdminOrMember(UserRole.ADMIN)).toBeTrue();
    expect(component.isAdminOrMember(UserRole.MEMBER)).toBeTrue();
    expect(component.isAdminOrMember(UserRole.OBSERVER)).toBeFalse();
  });
});
