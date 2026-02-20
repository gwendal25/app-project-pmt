import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ProjectInfo } from '../interfaces/project/project';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';
import { MatSelectChange } from '@angular/material/select';
import { ProjectTaskInfo } from '../interfaces/task/projectTask';
import { TaskService } from '../services/task-service';
import { TaskNotificationDto } from '../interfaces/task/taskNotificationDto';
import { UserRole } from '../enums/userRole';

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

  UserRole = UserRole;
  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  constructor() {
    this.projectInfo = { id: 0, name: "", description: "", startDate: new Date(), userRole: UserRole.OBSERVER, tasks: null, users: null };
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
  
  isAdmin(userRole: UserRole) {
    return userRole === UserRole.ADMIN;
  }

  isMember(userRole: UserRole) {
    return userRole === UserRole.MEMBER;
  }

  isAdminOrMember(userRole: UserRole) {
    return this.isAdmin(userRole) || this.isMember(userRole);
  }

  getTaskStatusValue(value: TaskStatus): string {
    return (<any>TaskStatus)[value] ?? "";
  }

  getTaskPriorityValue(value: TaskPriority): string {
    return (<any>TaskPriority)[value] ?? "";
  }

  
  filterTasks(taskStatus: TaskStatus) {
    if(taskStatus === null || taskStatus === undefined) {
      this.filteredTaskList = this.projectInfo.tasks ?? [];
      return;
    }
    let filteredTaskList = this.projectInfo.tasks?.filter((taskInfo) => 
      taskStatus.toString().includes(taskInfo.taskStatus.toString())
    );
    this.filteredTaskList = filteredTaskList ?? [];
  }

  onUserAssignedSelected(taskId:number, userId: number) {
    if(userId === null || userId === undefined) {
      return;
    }
    if(userId !== -1) {
      this.assignTask(taskId, userId);
    }
    else {
      this.unassignTask(taskId);
    }
   }

  assignTask(taskId:number, userId:number) {
    this.taskService.assignTask(taskId, userId)
      .subscribe({
        next: (projectTaskInfo: ProjectTaskInfo) => {
          console.log(`successfully assigned task:`);
          console.log(projectTaskInfo);
        },
        error: (error) => {
          console.log("Error during task assignment:");
          console.log(error);
        }
      });
  }

  unassignTask(taskId:number) {
    this.taskService.unassignTask(taskId)
      .subscribe({
        next: (projectTaskInfo: ProjectTaskInfo) => {
          console.log("sucessfully unassigned task:");
          console.log(projectTaskInfo);
        },
        error: (error) => {
          console.log("Error during task unassignment:");
          console.log(error);
        } 
      });
  }

  updateNotificationStatus(taskId:number, update: boolean) {
    this.taskService.setNotificationTask(taskId, update)
    .subscribe({
      next: (taskNotificationDto:TaskNotificationDto) => {
        console.log(`isNotified:`);
        console.log(taskNotificationDto)
      },
      error: (error) => {
        console.log("Error during notification update:");
        console.log(error);
      }
    })
  }
}
