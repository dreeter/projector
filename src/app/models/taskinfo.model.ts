export enum PRIORITY {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum STATUS {
  CREATED = 'CREATED',
  WORKING = 'WORKING',
  COMPLETE = 'COMPLETE',
}

export class TaskInfo {
  constructor(
    public parent_id: number | null = null,
    public title: string,
    public description: string,
    public priority: PRIORITY,
    public owner_id: number | null,
    public creator_id: number | null,
    public due: Date,
    public status: STATUS
  ) {}
}
