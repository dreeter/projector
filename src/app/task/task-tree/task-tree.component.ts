import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';

interface TaskNode {
  id: number;
  name: string;
  children?: TaskNode[];
}

@Component({
  selector: 'app-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.css'],
})
export class TaskTreeComponent implements OnInit {
  @Input() task: Task = {} as Task;

  taskNodesData: TaskNode[] = [];
  treeControl = new NestedTreeControl<TaskNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TaskNode>();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.task.id) {
      this.taskService.getChildTasks(this.task.id).subscribe((tasks) => {
        const childTasks: TaskNode[] = [];

        tasks.forEach((childTask) => {
          childTasks.push({ id: childTask.id, name: childTask.title });
        });

        this.taskNodesData.push({
          id: this.task.id,
          name: this.task.title,
          children: childTasks,
        });

        this.dataSource.data = this.taskNodesData;
        this.treeControl.dataNodes = this.taskNodesData;
        this.treeControl.expand(this.taskNodesData[0]);
      });
    }
  }

  onToggleExpand(node: TaskNode): void {
    if (!node.children) this.setChildNodes(node);
  }

  private setChildNodes(node: TaskNode): void {
    this.taskService.getChildTasks(node.id).subscribe((tasks) => {
      const childNodes: TaskNode[] = [];

      tasks.forEach((childTask) => {
        childNodes.push({
          id: childTask.id,
          name: childTask.title,
        });
      });

      node.children = childNodes;

      this.treeControl.dataNodes = [];
      this.dataSource.data = [];
      this.treeControl.dataNodes = this.taskNodesData;
      this.dataSource.data = this.taskNodesData;
    });
  }

  onNavigate(node: TaskNode) {
    if (node.id === this.taskNodesData[0].id) return;

    this.router.navigateByUrl(`/home/task/${node.id}`);
  }

  canExpand = () => {
    return true;
  };
}
