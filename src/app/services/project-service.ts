import { inject, Injectable } from '@angular/core';
import { ProjectInfo } from '../interfaces/project/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProjectDto } from '../interfaces/project/projectDto';
import { TaskDto } from '../interfaces/task/taskDto';
import { TaskInfo } from '../interfaces/task/task';
import { SimpleProjectInfo } from '../interfaces/project/simpleProject';
import { AddProjectUserDto } from '../interfaces/user/addProjectUserDto';
import { ProjectUserDto } from '../interfaces/projectuser/projectUserDto';
import { ProjectUserRolesDto } from '../interfaces/project/projectUserRolesDto';
import { ChangeUserRoleDto } from '../interfaces/user/changeUserRoleDto';
import { ProjectUserRole } from '../interfaces/project/projectUserRole';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  endpoint = 'http://localhost:8081/api/projects';
  private httpClient:HttpClient = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

    /**
     * Envoie une requête au serveur pour récupérer les informations de tous les projets dans la base de données
     * @returns {Observable<SimpleProjectInfo>} Un observable des informations simplifiés des projets (id, nom, description, date de début)
     * @deprecated
     */
    getAllProjectInfos(): Observable<SimpleProjectInfo[]> {
      return this.httpClient.get<SimpleProjectInfo[]>(this.endpoint);
    }

    /**
     * Envoie une requête au serveur pour récupérer les informations des projets dont l'utilisateur connecté fait partie
     * @returns {Observable<ProjectUserRole[]>} Un observable des informations simplifiés des projets (id, nom, description, date de départ, rôle de l'utilisateur)
     */
    getAllProjectInfosByUser(): Observable<ProjectUserRole[]> {
      return this.httpClient.get<ProjectUserRole[]>(this.endpoint + "/all")
      .pipe(
        catchError(this.handleError)
      );
    }

    /**
     * Envoie une requête au serveur pour récupérer les informations d'un projet avec son id
     * @param {number} id L'id du projet
     * @returns {Observable<ProjectInfo>} Un observable des informations simplifiés des projets (id, nom, description, date de début, rôle utilisateur, liste des tâches, liste des utilisateurs)
     */
    getProjectInfoById(id: number): Observable<ProjectInfo> {
      return this.httpClient.get<ProjectInfo>(this.endpoint + "/" + id)
      .pipe(
        catchError(this.handleError)
      );
    }

    /**
     * Envoie une requête au serveur pour récupérer les informations du projet avec la liste des utilisateurs et leurs rôles
     * @param {number} id L'id du projet
     * @returns {Observable<ProjectUserRolesDto>} Un observable des informations du projet (id, nom, description, date de début, utilisateurs)
     */
    getProjectInfoWithUserRolesById(id: number): Observable<ProjectUserRolesDto> {
      return this.httpClient.get<ProjectUserRolesDto>(this.endpoint + "/" + id + "/user-roles")
      .pipe(
        catchError(this.handleError)
      );
    }

    /**
     * Envoie une requête au serveur pour créer un nouveau projet
     * @param {ProjectDto} projectDto Les informations du projet à créer (nom, description et date de début)
     * @returns {Observable<SimpleProjectInfo>} Un observable des informations simplifiés du projet (id, nom, description, date de début)
     */
    submitProject(projectDto: ProjectDto): Observable<SimpleProjectInfo> {
      return this.httpClient.post<SimpleProjectInfo>(this.endpoint, JSON.stringify(projectDto), this.httpOptions);
    }

    /**
     * Envoie une requête au serveur pour créer une nouvelle tâche sur un projet via l'id du projet
     * @param {number} id L'id du projet
     * @param {TaskDto} taskDto Un Dto contenant les informations de la tâche (nom, description, date de fin, priorité et status)
     * @returns {Observable<TaskInfo>} Un observable des informations de la tâche qui vient d'être créer (id, nom, description, priorité, status, date de fin, entrées d'historique)
     */
    createTask(id: number, taskDto: TaskDto): Observable<TaskInfo> {
      return this.httpClient.post<TaskInfo>(this.endpoint + "/" + id + "/tasks", JSON.stringify(taskDto), this.httpOptions);
    }

    /**
     * Envoie une requête au serveur pour mettre à jour un projet via son id
     * @param {number} id L'id de la tâche
     * @param {ProjectDto} projectDto Un Dto contenant les informations du projet (nom, description, date de début)
     * @returns {Observable<SimpleProjectInfo>} Un observable des informations simplifiés du projet qui vient d'être crée (id, nom, description, date de début)
     */
    updateProject(id: number, projectDto: ProjectDto) {
      return this.httpClient.put<SimpleProjectInfo>(this.endpoint + "/" + id, JSON.stringify(projectDto), this.httpOptions);
    } 

    /**
     * Envoie une requête au serveur pour ajouter un utilisateur sur un projet
     * @param {number} id L'id du projet
     * @param {AddProjectUserDto} addProjectUserDto Un Dto contenant les informations d'ajout de l'utilisateur (email, rôle utilisateur)
     * @returns {Observable<ProjectUserDto>} Un observable des informations de la relation entre le projet et l'utilisateur (projet, utilisateur et rôle)
     */
    addUserToProject(id: number, addProjectUserDto: AddProjectUserDto): Observable<ProjectUserDto> {
      return this.httpClient.put<ProjectUserDto>(this.endpoint + "/" + id + "/add-user", JSON.stringify(addProjectUserDto), this.httpOptions);
    }

    /**
     * Envoie une requête au serveur pour changer le rôle d'un utilisateur
     * @param {number} id L'id du projet
     * @param {ChangeUserRoleDto} changeUserRoleDto Un Dto contenant les informations de mise à jour du rôle de l'utilisateur
     * @returns {Observable<ProjectUserDto>} Un observable des informations de la relation entre le projet et l'utilisateur (projet, utilisateur, rôle)
     */
    changeUserRole(id: number, changeUserRoleDto: ChangeUserRoleDto): Observable<ProjectUserDto> {
      return this.httpClient.put<ProjectUserDto>(this.endpoint + "/" + id + "/change-user-role", JSON.stringify(changeUserRoleDto), this.httpOptions);
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
