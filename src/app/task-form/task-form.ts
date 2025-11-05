import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { TaskDto } from '../TaskDto';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/TaskStatus';
import { ProjectService } from '../project-service';
import { TaskPriorityLookup } from '../taskPriorityLookup';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm implements OnInit {
  private router:Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  private projectService:ProjectService = inject(ProjectService);

  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  projectId: number = 0;
  isLoading: boolean = false;

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    endDate: new FormControl(moment([2025, 0, 1]), Validators.required),
    taskPriority: new FormControl(null, Validators.required),
    taskStatus: new FormControl(null, Validators.required),
  });

  datePipe = new DatePipe('fr-FR');

  ngOnInit(): void {
    moment.locale('fr');

    this.projectId = this.route.snapshot.params['projectid'];
  }

  submitTask() {
    if(!this.taskForm.valid) {
      return;
    }

    if(this.isLoading) {
      return;
    }

    this.isLoading = true;
    const name = this.taskForm.value.name ?? '';
    const description = this.taskForm.value.description ?? '';
    const endDate = this.taskForm.value.endDate ?? new Date();
    const formattedDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss') ?? '';
    const priority = this.taskForm.value.taskPriority ?? '';
    const status = this.taskForm.value.taskStatus ?? '';
    const taskDto: TaskDto = {
      name: name,
      description,
      endDate: formattedDate,
      taskPriority: priority,
      taskStatus: status
    }

    console.log(this.taskForm.value.taskPriority);
    console.log(this.taskForm.value.taskStatus);

    this.createTask(this.projectId, taskDto);
  }

  createTask(projectId: number, taskDto: TaskDto) {
    this.projectService.createTask(projectId, taskDto)
    .subscribe({
      next: () => {
        this.router.navigate(['/project-details', projectId]);
      },
      error: () => {
        console.log("Error when creating the task");
        this.isLoading = false;
      }
    })
  }
}
