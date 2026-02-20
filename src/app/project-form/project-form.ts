import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import moment, { Moment } from 'moment';
import { ProjectDto } from '../interfaces/project/projectDto';

@Component({
  selector: 'app-project-form',
  standalone: false,
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectForm implements OnInit {
  private router:Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService = inject(ProjectService);

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    startDate: new FormControl<Moment>(moment(), [Validators.required])
  });

  datePipe = new DatePipe('fr-FR');
  
  id: number = 0;
  isAddMode: boolean = true;
  isLoading: boolean = false;

  ngOnInit(): void {
    moment.locale("fr");

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.projectService.getProjectInfoById(this.id).subscribe({
        next: (project) => {
          project.startDate = new Date(project.startDate);
          this.projectForm.patchValue({
            name: project.name,
            description: project.description,
            startDate: moment(project.startDate)
          })
        },
        error: () => {
          console.log("Error when updating the project");
        }
      })
    }
  }

  submitProject() {
    if(this.projectForm.get("name")?.hasError("required") || this.projectForm.get("name")?.hasError("minlength")) {
      console.log("Le nom du projet est invalide");
      return;
    }
    if(this.projectForm.get("description")?.hasError("required") || this.projectForm.get("description")?.hasError("minlength")) {
      console.log("La description du projet est invalide");
      return;
    }
    if(this.projectForm.get("startDate")?.hasError("required")) {
      console.log("La date de début est requise");
      return;
    }

    this.isLoading = true;
    const name = this.projectForm.value.name ?? '';
    const description = this.projectForm.value.description ?? '';
    const startDate = this.projectForm.value.startDate?? moment(new Date());
    const formattedDate = startDate.format('YYYY-MM-DD HH:mm:ss') ?? '';
    const projectDto:ProjectDto = { name: name, description: description, startDate: formattedDate };

    if(this.isAddMode) {
      this.createProject(projectDto);
    }
    else {
      this.updateProject(projectDto);
    }
  }

  createProject(projectDto: ProjectDto) {
    this.projectService.submitProject(projectDto)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        console.log("Error when creating the project");
        this.isLoading = false;
      }
    })
  }

  updateProject(projectDto: ProjectDto) {
    this.projectService.updateProject(this.id, projectDto)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        console.log("Error when updating the project");
        this.isLoading = false;
      }
    })
  }

}
