import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    owner: new FormControl(''),
    status: new FormControl(''),
    dueDate: new FormControl(''),
    priority: new FormControl(''),
  });

  private project: Project = {} as Project;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {}

  onSubmit() {
    const title: string = this.projectForm.controls['title'].value;
    const description: string = this.projectForm.controls['description'].value;
    const owner: string = this.projectForm.controls['owner'].value;
    const status: string = this.projectForm.controls['status'].value;
    const dueDate: string = this.projectForm.controls['dueDate'].value;
    const priority: string = this.projectForm.controls['priority'].value;

    this.project = new Project(
      title,
      description,
      priority,
      owner,
      dueDate,
      status
    );

    console.log('Adding project');
    this.projectService.addProject(this.project);
  }
}
