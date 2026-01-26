import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TaskInfo } from '../interfaces/task/task';
import { TaskDto } from '../interfaces/task/taskDto';
import { SimpleTaskInfo } from '../interfaces/task/simpleTask';
import { TaskNotificationDto } from '../interfaces/task/taskNotificationDto';
import { ProjectTaskInfo } from '../interfaces/task/projectTask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  endpoint = 'http://localhost:8081/tasks';
  private httpClient:HttpClient = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  getTaskInfoById(id: number): Observable<TaskInfo> {
    return this.httpClient.get<TaskInfo>(this.endpoint + "/" + id)
    .pipe(
      catchError(this.handleError)
    )
  }

  getTaskInfoWithoutHistoryById(id: number): Observable<SimpleTaskInfo> {
    return this.httpClient.get<SimpleTaskInfo>(this.endpoint + "/" + id + "/no-history")
    .pipe(
      catchError(this.handleError)
    )
  }

  updateTask(id: number, taskDto: TaskDto) {
    return this.httpClient.put<TaskInfo>(this.endpoint + "/" + id, JSON.stringify(taskDto), this.httpOptions);
  }

  assignTask(id:number, userId:number) {
    return this.httpClient.put<ProjectTaskInfo>(this.endpoint + "/" + id + "/assign", JSON.stringify({userId: userId}), this.httpOptions);
  }

  unassignTask(id: number) {
    return this.httpClient.put<ProjectTaskInfo>(this.endpoint + "/" + id + "/unassign", this.httpOptions);
  }

  setNotificationTask(id: number, isNotified: boolean) {
    return this.httpClient.put<TaskNotificationDto>(this.endpoint + "/" + id + "/set-assign-notifications", JSON.stringify({ isNotified: isNotified }), this.httpOptions);
  }

  handleError(error:any) {
    let errorMessage = '';

     if (error.error instanceof ErrorEvent) {
        errorMessage = error.message;
      } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    }
}
