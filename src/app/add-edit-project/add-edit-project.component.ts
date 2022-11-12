import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
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
  projectAddErrorSub: Subscription = {} as Subscription;
  projectAddedSub: Subscription = {} as Subscription;
  projectUpdateErrorSub: Subscription = {} as Subscription;
  projectUpdatedSub: Subscription = {} as Subscription;

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

    this.projectAddedSub = this.projectService.projectAdded.subscribe(
      (added: boolean) => {
        console.log('Navigating back after adding project');
        this.navigationService.back();
      }
    );

    this.projectAddErrorSub = this.projectService.projectAddError.subscribe(
      (error: Error) => {
        //TODO: give user an error message
      }
    );

    this.projectUpdatedSub = this.projectService.projectUpdated.subscribe(
      (updated: boolean) => {
        this.navigationService.back();
      }
    );

    this.projectUpdateErrorSub =
      this.projectService.projectUpdateError.subscribe((error: Error) => {
        //TODO: give user an error message
      });
  }

  onSubmit() {
    if (this.isAddMode) {
      const taskInfo: TaskInfo = new TaskInfo(
        null,
        this.projectForm.get('title')!.value,
        this.projectForm.get('description')!.value,
        this.projectForm.get('priority')!.value,
        null,
        null,
        this.projectForm.get('due')!.value,
        this.projectForm.get('status')!.value
      );

      this.projectService.addProject(taskInfo);
    } else {
      this.project.task.title = this.projectForm.get('title')!.value;
      this.project.task.description =
        this.projectForm.get('description')!.value;
      this.project.task.priority = this.projectForm.get('priority')!.value;
      this.project.task.due = this.projectForm.get('due')!.value;
      this.project.task.status = this.projectForm.get('status')!.value;

      this.projectService.updateProject(this.project);
    }
  }

  onCancel() {
    this.navigationService.back();
  }

  ngOnDestroy() {
    this.projectAddedSub.unsubscribe();
    this.projectAddErrorSub.unsubscribe();
    this.projectUpdatedSub.unsubscribe();
    this.projectUpdateErrorSub.unsubscribe();
  }
}
