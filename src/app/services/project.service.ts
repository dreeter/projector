import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {
  //class responsible for http CRUD request for projects and providing those projects

  private projects: Project[] = [];

  constructor() {}

  ngOnDestroy() {
    console.log('Project Service being destroyed');
  }

  addProject(project: Project) {
    this.projects.push(project);
    console.log('Project added the the array of projects');
    console.log(this.projects);
  }

  getProject(name: string): Project | undefined {
    const requestedProject = this.projects.find((project) => {
      return project.title === name;
    });

    if (requestedProject) {
      return requestedProject;
    }

    return undefined;
  }

  getProjects() {
    return this.projects;
  }
}
