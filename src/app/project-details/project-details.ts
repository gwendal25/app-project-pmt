import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ProjectInfo } from '../interfaces/project';
import { TaskPriority } from '../enums/TaskPriority';
import { TaskStatus } from '../enums/TaskStatus';
import { MatSelectChange } from '@angular/material/select';
import { ProjectTaskInfo } from '../interfaces/projectTask';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);
  taskService: TaskService = inject(TaskService);

  id:number = this.route.snapshot.params['id'];
  projectInfo: ProjectInfo;
  filteredTaskList: ProjectTaskInfo[] = []; 

  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  constructor() {
    this.projectInfo = { id: 0, name: "", description: "", startDate: new Date(), tasks: null, users: null };
  }

  ngOnInit(): void {
    this.projectService.getProjectInfoById(this.id)
    .subscribe((project) => {
      this.projectInfo = project;
      this.projectInfo.tasks = this.projectInfo.tasks ?? [];
      this.projectInfo.users = this.projectInfo.users ?? [];
      this.filteredTaskList = this.projectInfo.tasks;
      this.projectInfo.tasks.forEach((task:ProjectTaskInfo) => {
        task.user = task.user ?? { id: -1, name: "" };
      })
    })
  }

  getTaskStatusValue(value: TaskStatus): string {
    return (<any>TaskStatus)[value] ?? "";
  }

  getTaskPriorityValue(value: TaskPriority): string {
    return (<any>TaskPriority)[value] ?? "";
  }

  
  filterTasks(event: MatSelectChange) {
    if(event.value === null || event.value === undefined) {
      this.filteredTaskList = this.projectInfo.tasks ?? [];
      return;
    }

    let enumKey = event.value as keyof typeof TaskStatus;
    let filteredTaskList = this.projectInfo.tasks?.filter((taskInfo) => 
      enumKey.toString().includes(taskInfo.taskStatus.toString())
    );
    this.filteredTaskList = filteredTaskList ?? [];
  }

  assignTask(taskId:number, event: MatSelectChange) {
    if(event.value === null || event.value === undefined) {
      return;
    }
    let userId:number = event.value;
    this.taskService.assignTask(taskId, userId)
    .subscribe({
      next: () => {
        console.log("successfully assigned task");
      }
    })
  }
}
