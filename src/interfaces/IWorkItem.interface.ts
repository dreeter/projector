export enum PRIORITY {
  HIGH,
  MEDIUM,
  LOW,
}

export enum STATUS {
  CREATED,
  WORKING,
  COMPLETE,
}

export interface IWorkItem {
  set id(id: number);

  get id(): number;

  set title(projectTitle: string);

  get title(): string;

  set description(description: string);

  get description(): string;

  set priority(priority: PRIORITY);

  get priority(): PRIORITY;

  set owner(owner: string);

  get owner(): string;

  set dueDate(dueDate: Date);

  get dueDate(): Date;

  set status(status: STATUS);

  get status(): STATUS;
}
