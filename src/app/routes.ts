import { Routes } from "@angular/router";
import { Project } from "./project/project";
import { ProjectDetails } from "./project-details/project-details";

const routeConfig: Routes = [
    { path: '', component: Project, title: 'Home page'},
    { path: 'project-homepage', component: Project, title: 'Project home page' },
    { path: 'project-details/:id', component: ProjectDetails, title: 'Project details'}
]

export default routeConfig;