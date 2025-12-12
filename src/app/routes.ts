import { Routes } from "@angular/router";
import { Project } from "./project/project";
import { ProjectDetails } from "./project-details/project-details";
import { ProjectForm } from "./project-form/project-form";
import { TaskForm } from "./task-form/task-form";
import { TaskDetails } from "./task-details/task-details";
import { SigninForm } from "./signin-form/signin-form";
import { LoginForm } from "./login-form/login-form";

const routeConfig: Routes = [
    { path: '', component: Project, title: 'Home page'},
    { path: 'signin-form', component: SigninForm, title: 'Sign in'},
    { path: 'login-form', component: LoginForm, title: 'Login'},
    { path: 'project-homepage', component: Project, title: 'Project home page' },
    { path: 'project-details/:id', component: ProjectDetails, title: 'Project details'},
    { path: 'project-form', component: ProjectForm, title: 'New project' },
    { path: 'project-form/:id', component: ProjectForm, title: 'Update project' },
    { path: 'project/:projectid/task-form', component: TaskForm, title: 'Create task' },
    { path: 'project/:projectid/task-form/:id', component: TaskForm, title: 'Update task' },
    { path: 'project-details/:projectid/task-details/:id', component: TaskDetails, title: 'Task history'}
]

export default routeConfig;