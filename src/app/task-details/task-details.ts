import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task-service';
import { TaskInfo } from '../interfaces/task';
import { TaskPriority } from '../enums/TaskPriority';
import { TaskStatus } from '../enums/TaskStatus';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  taskService: TaskService = inject(TaskService);

  projectId:number = this.route.snapshot.params['projectid'];
  id:number = this.route.snapshot.params['id'];
  taskInfo: TaskInfo;
  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  constructor() {
    this.taskInfo = { 
      id: 0, 
      name: "", 
      description: "", 
      endDate: new Date(),
      taskPriority: TaskPriority.MEDIUM,
      taskStatus: TaskStatus.NOT_STARTED, 
      taskHistoryEntries: null 
    };
  }

  ngOnInit(): void {
    this.taskService.getTaskInfoById(this.id)
    .subscribe((task) => {
      this.taskInfo = task;
    })
  }

  getTaskStatusValue(value: TaskStatus): string {
    return (<any>TaskStatus)[value] ?? "";
  }

  getTaskPriorityValue(value: TaskPriority): string {
    return (<any>TaskPriority)[value] ?? "";
  }
}
