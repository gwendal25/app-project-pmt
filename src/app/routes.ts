import { Routes } from "@angular/router";
import { Project } from "./project/project";
import { ProjectDetails } from "./project-details/project-details";
import { ProjectForm } from "./project-form/project-form";

const routeConfig: Routes = [
    { path: '', component: Project, title: 'Home page'},
    { path: 'project-homepage', component: Project, title: 'Project home page' },
    { path: 'project-details/:id', component: ProjectDetails, title: 'Project details'},
    { path: 'project-form', component: ProjectForm, title: 'New project' }
]

export default routeConfig;