type User = {
  name: string;
  id: string;
};
export class UserState {
  private users;
  constructor() {
    this.users = new Array<User>();
  }
  activateUser(name: string, id: string) {
    const user = {
      name,
      id,
    };
    this.users = [...this.users.filter((user) => user.id !== id), user];
    return user;
  }

  findUserById(socketId: string) {
    return this.users.find(({ id }) => id === socketId);
  }

  getAllActiveUsers() {
    return this.users.map( user => user.name);
  }
}
