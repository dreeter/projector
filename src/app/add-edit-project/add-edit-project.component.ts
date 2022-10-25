import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from '../models/project.model';
import { PRIORITY, STATUS, TaskInfo } from '../models/taskinfo.model';
import { NavigationService } from '../services/navigation.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css'],
})
export class AddEditProjectComponent implements OnInit {
  isAddMode: boolean = true;

  project: Project = {} as Project;

  projectForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    owner: new FormControl(''),
    status: new FormControl(''),
    due: new FormControl(''),
    priority: new FormControl(''),
  });

  priorities = PRIORITY;
  statuses = STATUS;

  priorityKeys: any;
  statusKeys: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    this.priorityKeys = Object.keys(this.priorities).filter((key) =>
      isNaN(Number(key))
    );

    this.statusKeys = Object.keys(this.statuses).filter((key) =>
      isNaN(Number(key))
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id']);

      //No project to retrieve, just return
      if (!params['id']) return;

      this.isAddMode = false;

      this.projectService.getProject(params['id']).subscribe((project) => {
        this.project = project;

        this.projectForm.controls['title'].setValue(this.project.task.title);
        this.projectForm.controls['description'].setValue(
          this.project.task.description
        );
        this.projectForm.controls['owner'].setValue(this.project.task.owner_id);
        this.projectForm.controls['status'].setValue(this.project.task.status);
        this.projectForm.controls['due'].setValue(this.project.task.due);
        this.projectForm.controls['priority'].setValue(
          this.project.task.priority
        );
      });
    });
  }

  onSubmit() {
    if (this.isAddMode) {
      const taskInfo: TaskInfo = new TaskInfo(
        null,
        this.projectForm.controls['title'].value,
        this.projectForm.controls['description'].value,
        this.projectForm.controls['priority'].value,
        null,
        null,
        this.projectForm.controls['due'].value,
        this.projectForm.controls['status'].value
      );

      this.projectService.addProject(taskInfo).subscribe((body) => {
        this.navigationService.back();
      });
    } else {
      (this.project.task.title = this.projectForm.controls['title'].value),
        (this.project.task.description =
          this.projectForm.controls['description'].value),
        (this.project.task.priority =
          this.projectForm.controls['priority'].value),
        (this.project.task.due = this.projectForm.controls['due'].value),
        (this.project.task.status = this.projectForm.controls['status'].value),
        this.projectService.updateProject(this.project).subscribe((body) => {
          this.navigationService.back();
        });
    }
  }

  onCancel() {
    this.navigationService.back();
  }
}
