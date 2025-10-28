import { Component, input } from '@angular/core';
import { ProjectInfo } from '../project';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  projectInfo = input.required<ProjectInfo>();
}
