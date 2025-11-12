import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ProjectInfo } from '../interfaces/project';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';
import { MatSelectChange } from '@angular/material/select';
import { ProjectTaskInfo } from '../interfaces/projectTask';

@Component({
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  projectService: ProjectService = inject(ProjectService);

  id:number = this.route.snapshot.params['id'];
  projectInfo: ProjectInfo;
  filteredTaskList: ProjectTaskInfo[] = []; 

  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  constructor() {
    this.projectInfo = { id: 0, name: "", description: "", startDate: new Date(), tasks: null };
  }

  ngOnInit(): void {
    this.projectService.getProjectInfoById(this.id)
    .subscribe((project) => {
      this.projectInfo = project;
      this.projectInfo.tasks = this.projectInfo.tasks ?? [];
      this.filteredTaskList = this.projectInfo.tasks;
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
}
