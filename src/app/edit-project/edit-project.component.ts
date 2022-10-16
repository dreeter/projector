import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
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

  ngOnInit(): void {
    //have the router pass in the project id to be edited
    //retrieve the project from the projectService
    //intialize the form with the project's fields
  }

  onSubmit() {
    // const title: string = this.projectForm.controls['title'].value;
    // const description: string = this.projectForm.controls['description'].value;
    // const owner: string = this.projectForm.controls['owner'].value;
    // const status: string = this.projectForm.controls['status'].value;
    // const dueDate: string = this.projectForm.controls['dueDate'].value;
    // const priority: string = this.projectForm.controls['priority'].value;
    // this.project = new Project(1,
    //   title,
    //   description,
    //   priority,
    //   owner,
    //   dueDate,
    //   status
    // );
    // console.log('Adding project');
    // this.projectService.addProject(this.project);
  }
}
