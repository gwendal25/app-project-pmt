import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Project } from './project';
import { ProjectService } from '../services/project-service';
import { ProjectCard } from '../project-card/project-card';
import { ProjectUserRole } from '../interfaces/project/projectUserRole';
import { UserRole } from '../enums/userRole';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('Project', () => {
  let component: Project;
  let fixture: ComponentFixture<Project>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProjectService', ['getAllProjectInfosByUser']);
    spy.getAllProjectInfosByUser.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [Project, ProjectCard],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProjectService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Project);
    component = fixture.componentInstance;
    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllProjectInfosByUser on init', () => {
    expect(projectServiceSpy.getAllProjectInfosByUser).toHaveBeenCalled();
  });

  it('should render project cards for each project', () => {
    const projects: ProjectUserRole[] = [
      { id: 1, name: 'P1', description: 'D1', startDate: new Date(), userRole: UserRole.ADMIN },
      { id: 2, name: 'P2', description: 'D2', startDate: new Date(), userRole: UserRole.MEMBER }
    ];
    projectServiceSpy.getAllProjectInfosByUser.and.returnValue(of(projects));
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-project-card').length).toBe(2);
  });
});
