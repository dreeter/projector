import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { TaskInfo } from '../models/taskinfo.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  addTask(taskInfo: TaskInfo) {
    this.http
      .post('http://localhost:3000/task', taskInfo)
      .subscribe((body) => {});
  }

  getTask(id: number): Observable<Task> {
    return this.http
      .get(`http://localhost:3000/task/${id}`, { withCredentials: true })
      .pipe(
        map((response) => {
          const task: Task = response as Task;
          return task;
        })
      );
  }

  updateTask(task: Task) {
    this.http
      .put(`http://localhost:3000/task/${task.id}`, task)
      .subscribe((body) => {});
  }

  deleteTask(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:3000/task/${id}`);
  }

  getChildTasks(parent_id: number): Observable<Task[]> {
    return this.http
      .get(`http://localhost:3000/task/children/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map((taskData) => {
          const taskArray: Task[] = taskData as Array<Task>;
          return taskArray;
        })
      );
  }
}
