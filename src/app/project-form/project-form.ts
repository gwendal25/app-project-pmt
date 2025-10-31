import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../project-service';
import { Project } from '../project/project';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-project-form',
  standalone: false,
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectForm {
  private router:Router = inject(Router);
  projectService = inject(ProjectService);

  projectForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    startDate: new FormControl(new Date())
  });

  submitProject() {
    if(!this.projectForm.valid) {
      return;
    }

    const name = this.projectForm.value.name ?? '';
    const description = this.projectForm.value.description ?? '';
    const startDate = this.projectForm.value.startDate ?? new Date();
    const projectInfo = { id: "0", name: name, description: description, startDate: startDate };
    this.projectService.submitProject(projectInfo);
    this.router.navigate(['/']);
  }

}
