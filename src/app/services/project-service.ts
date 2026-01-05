import { inject, Injectable } from '@angular/core';
import { ProjectInfo } from '../interfaces/project/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProjectDto } from '../interfaces/project/projectDto';
import { TaskDto } from '../interfaces/task/taskDto';
import { TaskInfo } from '../interfaces/task/task';
import { SimpleProjectInfo } from '../interfaces/project/simpleProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  endpoint = 'http://localhost:8081/projects';
  private httpClient:HttpClient = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

    getAllProjectInfos(): Observable<SimpleProjectInfo[]> {
      return this.httpClient.get<SimpleProjectInfo[]>(this.endpoint);
    }

    getProjectInfoById(id: number): Observable<ProjectInfo> {
      return this.httpClient.get<ProjectInfo>(this.endpoint + "/" + id)
      .pipe(
        catchError(this.handleError)
      );
    }

    submitProject(projectDto: ProjectDto) {
      return this.httpClient.post<SimpleProjectInfo>(this.endpoint, JSON.stringify(projectDto), this.httpOptions);
    }

    createTask(id: number, taskDto: TaskDto) {
      return this.httpClient.post<TaskInfo>(this.endpoint + "/" + id + "/tasks", JSON.stringify(taskDto), this.httpOptions);
    }

    updateProject(id: number, projectDto: ProjectDto) {
      return this.httpClient.put<SimpleProjectInfo>(this.endpoint + "/" + id, JSON.stringify(projectDto), this.httpOptions);
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
