import { Routes } from "@angular/router";
import { Project } from "./project/project";
import { ProjectDetails } from "./project-details/project-details";
import { ProjectForm } from "./project-form/project-form";
import { TaskForm } from "./task-form/task-form";
import { TaskDetails } from "./task-details/task-details";
import { SigninForm } from "./signin-form/signin-form";
import { LoginForm } from "./login-form/login-form";
import { authGuard, notAuthGuard } from "./guards/auth-guard-guard";

const routeConfig: Routes = [
    { path: '', component: Project, title: 'Home page', canActivate: [authGuard]},
    { path: 'signin-form', component: SigninForm, title: 'Sign in', canActivate: [notAuthGuard]},
    { path: 'login-form', component: LoginForm, title: 'Login', canActivate: [notAuthGuard]},
    { path: 'project-homepage', component: Project, title: 'Project home page', canActivate: [authGuard] },
    { path: 'project-details/:id', component: ProjectDetails, title: 'Project details', canActivate: [authGuard]},
    { path: 'project-form', component: ProjectForm, title: 'New project', canActivate: [authGuard] },
    { path: 'project-form/:id', component: ProjectForm, title: 'Update project', canActivate: [authGuard] },
    { path: 'project/:projectid/task-form', component: TaskForm, title: 'Create task', canActivate: [authGuard] },
    { path: 'project/:projectid/task-form/:id', component: TaskForm, title: 'Update task', canActivate: [authGuard] },
    { path: 'project-details/:projectid/task-details/:id', component: TaskDetails, title: 'Task history', canActivate: [authGuard]},
    { path: '**', redirectTo: 'login-form'}
]

export default routeConfig;