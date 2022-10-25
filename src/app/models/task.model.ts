import { PRIORITY, STATUS } from './taskinfo.model';

export class Task {
  constructor(
    public id: number | null = null,
    public parent_id: number | null = null,
    public title: string,
    public description: string,
    public priority: PRIORITY,
    public owner_id: number | null,
    public creator_id: number | null,
    public due: Date,
    public completed: Date,
    public status: STATUS,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
