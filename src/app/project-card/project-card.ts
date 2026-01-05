import { Component, input } from '@angular/core';
import { SimpleProjectInfo } from '../interfaces/project/simpleProject';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  projectInfo = input.required<SimpleProjectInfo>();
}
