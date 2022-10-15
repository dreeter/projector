import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    //on initialization we'll get all existing projects
    console.log('Calling to get projects in init');
    this.projects = this.projectService.getProjects();

    console.log(this.projects);
  }

  ngOnChanges() {
    console.log('Calling to get projects in onChanges');
    this.projects = this.projectService.getProjects();
  }
}
