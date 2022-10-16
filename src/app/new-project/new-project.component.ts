import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PRIORITY, STATUS } from 'src/interfaces/IWorkItem.interface';
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

  priorities = PRIORITY;
  statuses = STATUS;

  priorityKeys: any;
  statusKeys: any;

  constructor(private projectService: ProjectService) {
    this.priorityKeys = Object.keys(this.priorities).filter((key) =>
      isNaN(Number(key))
    );

    this.statusKeys = Object.keys(this.statuses).filter((key) =>
      isNaN(Number(key))
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    const title: string = this.projectForm.controls['title'].value;
    const description: string = this.projectForm.controls['description'].value;
    const owner: string = this.projectForm.controls['owner'].value;
    const status: STATUS = STATUS.CREATED;
    const dueDate: Date = new Date();
    const priority: PRIORITY = this.projectForm.controls['priority'].value;

    console.log('The value is');
    console.log(priority);
    console.log(typeof priority);

    this.project = new Project(
      1,
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
