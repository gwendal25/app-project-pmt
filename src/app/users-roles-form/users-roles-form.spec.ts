
import { UsersRolesForm } from './users-roles-form';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel, MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserRole } from '../enums/userRole';

describe('UsersRolesForm', () => {
  let component: UsersRolesForm;
  let fixture: ComponentFixture<UsersRolesForm>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    activatedRouteStub = {
      snapshot: {
        params: { id: 1 }
      }
    };
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProjectInfoWithUserRolesById', 'changeUserRole']);
    projectServiceSpy.getProjectInfoWithUserRolesById.and.returnValue(of({
      id: 1,
      name: 'Test Project',
      description: 'Test Description',
      startDate: new Date(),
      users: [
        { id: 1, name: 'User 1', email: 'user1@example.com', role: UserRole.ADMIN },
        { id: 2, name: 'User 2', email: 'user2@example.com', role: UserRole.MEMBER }
      ]
    }));
    projectServiceSpy.changeUserRole.and.returnValue(of({
      project: { id: 1, name: 'Test Project', description: 'Test Description', startDate: new Date() },
      user: { id: 1, name: 'User 1', email: 'user1@example.com' },
      role: UserRole.ADMIN
    }));

    await TestBed.configureTestingModule({
      imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardFooter,
        MatLabel,
        MatSelect,
        MatOption,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [UsersRolesForm],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProjectService, useValue: projectServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersRolesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
