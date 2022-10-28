import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { TaskInfo } from '../models/taskinfo.model';
import { map, Observable, Subject } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable()
export class TaskService {
  taskDeleted: Subject<number> = new Subject<number>();
  taskDeleteError: Subject<Error> = new Subject<Error>();
  taskAdded: Subject<boolean> = new Subject<boolean>();
  taskAddError: Subject<Error> = new Subject<Error>();
  taskUpdated: Subject<boolean> = new Subject<boolean>();
  taskUpdateError: Subject<Error> = new Subject<Error>();

  constructor(private http: HttpClient) {}

  addTask(taskInfo: TaskInfo): void {
    this.http.post('http://localhost:3000/task', taskInfo).subscribe({
      next: () => {
        this.taskAdded.next(true);
      },
      error: (error: Error) => {
        this.taskAddError.next(error);
      },
    });
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3000/task/${id}`, {
      withCredentials: true,
    });
  }

  updateTask(task: Task): void {
    this.http.put(`http://localhost:3000/task/${task.id}`, task).subscribe({
      next: () => {
        this.taskUpdated.next(true);
      },
      error: (error: Error) => {
        this.taskUpdateError.next(error);
      },
    });
  }

  deleteTask(id: number): void {
    this.http.delete(`http://localhost:3000/task/${id}`).subscribe({
      next: () => {
        this.taskDeleted.next(id);
      },
      error: (error: Error) => {
        this.taskDeleteError.next(error);
      },
    });
  }

  getChildTasks(parent_id: number): Observable<Task[]> {
    return this.http.get<Task[]>(
      `http://localhost:3000/task/children/${parent_id}`,
      {
        withCredentials: true,
      }
    );
  }
}
