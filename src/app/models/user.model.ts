export class User {
  constructor(
    private _id: number | null,
    private _name: string,
    private _email: string,
    private _password: string | null
  ) {}

  set id(id: number | null) {
    this._id = id;
  }

  get id(): number | null {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set email(email: string) {
    this._email = email;
  }

  get email(): string {
    return this._email;
  }

  set password(password: string | null) {
    this._password = password;
  }

  get password(): string | null {
    return this._password;
  }
}
