import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

//Component responsible for displaying the list of projects by their project-header
@Component({
  selector: 'app-project-header-list',
  templateUrl: './project-header-list.component.html',
  styleUrls: ['./project-header-list.component.css'],
})
export class ProjectHeaderListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  deleteSubscription: Subscription = {} as Subscription;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects as Project[];
      },
      error: (error) => {
        //TODO: display an error message to the user
        console.log(error);
      },
    });

    this.deleteSubscription = this.projectService.projectDeleted.subscribe(
      (deletedProjectId) => {
        this.projects = this.projects.filter((project) => {
          return project.id !== deletedProjectId;
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
  }
}
