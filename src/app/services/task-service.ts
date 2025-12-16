import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TaskInfo } from '../interfaces/task';
import { TaskDto } from '../interfaces/taskDto';
import { SimpleTaskInfo } from '../interfaces/simpleTask';

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
    return this.httpClient.put<TaskInfo>(this.endpoint + "/" + id + "/assign", JSON.stringify({id: userId}), this.httpOptions);
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
