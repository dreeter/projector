import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from '../models/project.model';
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
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    //On initialization if a project parameter is given, we'll use that as the project

    this.route.params.subscribe((params: Params) => {
      if (!params['id']) return;

      //make a call to get this project
      this.projectService.getProject(params['id']).subscribe((project) => {
        this.project = project;
        console.log('Got project');
        console.dir(this.project);
      });

      //make a call to get all of this projects tasks
    });
  }
}
