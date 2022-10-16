import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { PRIORITY, STATUS } from 'src/interfaces/IWorkItem.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    new Task(
      1,
      2,
      'Task Title',
      'Description',
      PRIORITY.HIGH,
      'Derek',
      new Date(),
      STATUS.CREATED
    ),
  ];

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

  getChildTasks(projectID: number): Task[] | undefined {
    //given a project or a task id, retrieve all child tasks

    console.log('Getting child tasks for ' + projectID);

    const childTasks: Task[] | undefined = this.tasks.filter((task) => {
      console.log(
        'the task.project name: ' +
          task.parentId +
          ' the projectID ' +
          projectID
      );
      return task.parentId === projectID;
    });

    console.log('The actual childTasks');
    console.dir(childTasks);

    return childTasks;
  }

  deleteTask() {
    //delete task from database
  }
}
