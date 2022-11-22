import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    private projectService: ProjectService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects as Project[];
        // this.changeDetector.detach();
        // this.changeDetector.detectChanges();
        // this.changeDetector.reattach();
        console.dir(this.projects);
      },
      error: (error: Error) => {
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
    console.log('Project header being destroyed');
    this.deleteSubscription.unsubscribe();
  }
}
