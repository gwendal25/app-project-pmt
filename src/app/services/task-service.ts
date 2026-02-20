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

  /**
   * Envoie une requête au serveur pour récupérer les informations d'une tâche via son id
   * @param {number} id l'id de la tâche
   * @returns {Observable<TaskInfo>} Un observable des informations de la tâche (id, nom, description, priorité, status, date de fin, entrées d'historique)
   */
  getTaskInfoById(id: number): Observable<TaskInfo> {
    return this.httpClient.get<TaskInfo>(this.endpoint + "/" + id)
    .pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Envoie une requête au serveur pour récupérer les informations d'une tâche sans son historique via son id
   * @param {number} id l'id de la tâche 
   * @returns {Observable<TaskInfo>} Un observable des informations de la tâche (id, nom, description, priorité, status, date de fin)
   */
  getTaskInfoWithoutHistoryById(id: number): Observable<SimpleTaskInfo> {
    return this.httpClient.get<SimpleTaskInfo>(this.endpoint + "/" + id + "/no-history")
    .pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Envoie une requête au serveur pour mettre à jour une tâche
   * @param {number} id l'id de la tâche
   * @param {TaskDto} taskDto Un Dto contenant les informations de mise à jour de la tâche
   * @returns {Observable<TaskInfo>} Un observable des informations de la tâche (id, nom, description, priorité, status, date de fin)
   */
  updateTask(id: number, taskDto: TaskDto): Observable<TaskInfo> {
    return this.httpClient.put<TaskInfo>(this.endpoint + "/" + id, JSON.stringify(taskDto), this.httpOptions);
  }

  /**
   * Envoie une requête au serveur pour assigner une tâche
   * @param {number} id l'id de la tâche
   * @param {number} userId l'id de l'utilisateur
   * @returns {Observable<ProjectTaskInfo>} Un observable des informations de la tâche (id, nom, description, priorité, status, date de fin, utilisateur assigné, notifications)
   */
  assignTask(id:number, userId:number): Observable<ProjectTaskInfo> {
    return this.httpClient.put<ProjectTaskInfo>(this.endpoint + "/" + id + "/assign", JSON.stringify({userId: userId}), this.httpOptions);
  }

  /**
   * Envoie une requête au serveur pour dé-assigner une tâche
   * @param {number} id l'id de la tâche
   * @returns {Observable<ProjectTaskInfo>} Un observable des informations de la tâche (id, nom, description, priorité, status, date de fin, utilisateur assigné, notifications)
   */
  unassignTask(id: number): Observable<ProjectTaskInfo> {
    return this.httpClient.put<ProjectTaskInfo>(this.endpoint + "/" + id + "/unassign", this.httpOptions);
  }

  /**
   * Envoie une requête au serveur pour changer le statut des notifications d'une tâche
   * @param {number} id l'id de la tâche
   * @param {boolean} isNotified le status des notifications
   * @returns {Observable<TaskNotificationDto>} Un observable du status des notifications de la tâche
   */
  setNotificationTask(id: number, isNotified: boolean): Observable<TaskNotificationDto> {
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
