import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Project } from './project/project';
import { ProjectCard } from './project-card/project-card';
import { ProjectDetails } from './project-details/project-details';

@NgModule({
  declarations: [
    App,
    Project,
    ProjectCard,
    ProjectDetails
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
