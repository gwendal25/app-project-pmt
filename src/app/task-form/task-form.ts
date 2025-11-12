import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment, { Moment } from 'moment';
import { TaskDto } from '../interfaces/taskDto';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';
import { ProjectService } from '../services/project-service';
import { TaskService } from '../services/task-service';

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
  private taskService: TaskService = inject(TaskService);

  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  id:number = 0;
  projectId: number = 0;
  isAddMode: boolean = true;
  isLoading: boolean = false;

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(15)]),
    endDate: new FormControl<Moment>(moment(), Validators.required),
    taskPriority: new FormControl<TaskPriority>(TaskPriority.MEDIUM, Validators.required),
    taskStatus: new FormControl<TaskStatus>(TaskStatus.NOT_STARTED, Validators.required),
  });

  datePipe = new DatePipe('fr-FR');

  ngOnInit(): void {
    moment.locale('fr');

    this.projectId = this.route.snapshot.params['projectid'];
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.taskService.getTaskInfoWithoutHistoryById(this.id).subscribe({
        next: (task)=>{
          task.endDate = new Date(task.endDate);
          this.taskForm.patchValue({
            name: task.name,
            description: task.description,
            endDate: moment(task.endDate),
            taskPriority: task.taskPriority,
            taskStatus: task.taskStatus
          });
        }
      })
    } else {
      this.taskForm.patchValue({
        taskPriority: null,
        taskStatus: null
      })
    }
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
    const endDate = this.taskForm.value.endDate ?? moment(new Date());
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

    if(this.isAddMode) {
      this.createTask(this.projectId, taskDto);
    }
    else {
      this.updateTask(this.projectId, this.id, taskDto);
    }
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

  updateTask(projectId: number, id: number, taskDto: TaskDto) {
    this.taskService.updateTask(id, taskDto)
    .subscribe({
      next: ()=>{
        this.router.navigate(['/project-details', projectId]);
      },
      error: () => {
        console.log("Error when updating the task");
        this.isLoading = false;
      }
    })
  }
}
