import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-project-form',
  standalone: false,
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectForm implements OnInit {
  private router:Router = inject(Router);
  projectService = inject(ProjectService);

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    startDate: new FormControl(moment([2025, 0, 1]), Validators.required)
  });

  datePipe = new DatePipe('fr-FR');

  ngOnInit(): void {
    moment.locale("fr");
  }

  submitProject() {
    if(!this.projectForm.valid) {
      return;
    }

    const name = this.projectForm.value.name ?? '';
    const description = this.projectForm.value.description ?? '';
    const startDate = this.projectForm.value.startDate ?? new Date();
    const formattedDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss') ?? '';
    const projectDto = { name: name, description: description, startDate: formattedDate };
    this.projectService.submitProject(projectDto)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        console.log("Error when creating the project");
      }
    })
  }

}
