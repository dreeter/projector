export enum PRIORITY {
  HIGH,
  MEDIUM,
  LOW,
}

export enum STATUS {
  CREATED,
  INPROGRESS,
  COMPLETE,
}

export class Project {
  constructor(
    private _title: string,
    private _description: string,
    private _priority: string,
    private _owner: string,
    private _dueDate: string,
    private _status: string
  ) {}

  set title(projectTitle: string) {
    this._title = projectTitle;
  }

  get title() {
    return this._title;
  }

  set description(description: string) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  set priority(priority: string) {
    this._priority = priority;
  }

  get priority() {
    return this._priority;
  }

  set owner(owner: string) {
    this._owner = owner;
  }

  get owner() {
    return this._owner;
  }

  set dueDate(dueDate: string) {
    this._dueDate = dueDate;
  }

  get dueDate() {
    return this._dueDate;
  }

  set status(dueDate: string) {
    this._status = dueDate;
  }

  get status() {
    return this._status;
  }
}
