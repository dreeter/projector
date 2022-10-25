import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-header-list',
  templateUrl: './project-header-list.component.html',
  styleUrls: ['./project-header-list.component.css'],
})
export class ProjectHeaderListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log('ngOnInit being called');
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects as Project[];
    });
  }

  onProjectDelete(event: number | null) {
    if (event) {
      this.projects = this.projects.filter((project) => {
        return project.id !== event;
      });
    }
  }
}
