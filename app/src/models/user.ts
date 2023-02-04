export class User {

  constructor(
    public id: number,
    public name: string,
    public username: string,
    public email: string,
    public type_user_id: number,
  ){}

  static criar(
    id: number,
    name: string,
    username: string,
    email: string,
    type_user_id: number,
  ) {
    return new User(id, name, username, email, type_user_id);
  }

}
