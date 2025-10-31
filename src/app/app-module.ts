import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Project } from './project/project';
import { ProjectCard } from './project-card/project-card';
import { ProjectDetails } from './project-details/project-details';
import { ProjectForm } from './project-form/project-form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Project,
    ProjectCard,
    ProjectDetails,
    ProjectForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
