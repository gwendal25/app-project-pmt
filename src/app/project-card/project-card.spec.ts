import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCard } from './project-card';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { UserRole } from '../enums/userRole';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCard],
      imports: [MatCardModule, MatButtonModule, MatIconModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
    // Provide mock input data
    // fallback for readonly signals
    Object.defineProperty(component, 'projectInfo', {
      value: () => ({
        id: 1,
        name: 'Test Project',
        description: 'A test project',
        startDate: new Date(),
        userRole: UserRole.ADMIN
      })
    });
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
