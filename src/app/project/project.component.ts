import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from '../models/project.model';
import { NavigationService } from '../services/navigation.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project = {} as Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;

      //make a call to get this project
      this.projectService.getProject(params['id']).subscribe((project) => {
        this.project = project;

        //inform navigation about this
        this.navigationService.addRouteToTree({
          url: this.router.url,
          name: this.project.task.title,
        });
      });
    });
  }
}
