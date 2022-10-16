import {
  IWorkItem,
  PRIORITY,
  STATUS,
} from 'src/interfaces/IWorkItem.interface';

export class Project implements IWorkItem {
  constructor(
    private _id: number,
    private _title: string,
    private _description: string,
    private _priority: PRIORITY,
    private _owner: string,
    private _dueDate: Date,
    private _status: STATUS
  ) {}

  set id(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  set title(projectTitle: string) {
    this._title = projectTitle;
  }

  get title(): string {
    return this._title;
  }

  set description(description: string) {
    this._description = description;
  }

  get description(): string {
    return this._description;
  }

  set priority(priority: PRIORITY) {
    this._priority = priority;
  }

  get priority(): PRIORITY {
    return this._priority;
  }

  set owner(owner: string) {
    this._owner = owner;
  }

  get owner(): string {
    return this._owner;
  }

  set dueDate(dueDate: Date) {
    this._dueDate = dueDate;
  }

  get dueDate(): Date {
    return this._dueDate;
  }

  set status(status: STATUS) {
    this._status = status;
  }

  get status(): STATUS {
    return this._status;
  }
}
