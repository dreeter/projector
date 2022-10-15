import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {}

  addTask(task: Task) {
    this.tasks.push(task);

    //TODO: post request to insert new task into the database
  }

  updateTask(task: Task) {
    //TODO: update request to update task in database
  }

  getTask(name: string): Task | undefined {
    const requestedTask = this.tasks.find((task) => {
      return task.title === name;
    });

    if (requestedTask) {
      return requestedTask;
    }

    return undefined;
  }

  getChildTasks(project: Project) {
    //given a project or a task id, retrieve all child tasks
  }
}
