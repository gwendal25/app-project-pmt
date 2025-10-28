import { Injectable } from '@angular/core';
import { ProjectInfo } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectInfoList: ProjectInfo[] = [
      {
        id: "1",
        name: "Project Legends Platinium",
        description: "A game set in the Kanto region where the protagonist goes to the mirror world.",
        startDate: new Date()
      },
      {
        id: "2",
        name: "Project Legends Soulsilver",
        description: "A game set in the Kanto region where the protagonist goes to the mirror world.",
        startDate: new Date()
      },
      {
        id: "3",
        name: "Project Legends Heartgold",
        description: "A game set in the Kanto region where the protagonist goes to the mirror world.",
        startDate: new Date()
      },
      {
        id: "4",
        name: "Project Zelda Dark Princess",
        description: "A game set in the Kanto region where the protagonist goes to the mirror world.",
        startDate: new Date()
      },
      {
        id: "5",
        name: "Project Zelda Sky kingdoms",
        description: "A game set in the Kanto region where the protagonist goes to the mirror world.",
        startDate: new Date()
      },
    ];

    getAllProjectInfos(): ProjectInfo[] {
      return this.projectInfoList;
    }

    getProjectInfoById(id: string): ProjectInfo | undefined {
      return this.projectInfoList.find((projectInfo) => projectInfo.id === id);
    }
}
