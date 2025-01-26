import User, { IUser } from './models/user.model';

// type User = {
//   name: string;
//   id: string;
// };
export class UserState {
  private UserModel = User;

  // private users;

  public async activateUser(name: string, socketId: string) {
    let user = await this.findUserById(socketId);
    console.log("user", user)
    if(!user){
      user = new this.UserModel({name, socketId})
    } else{
      user.name = name;
    }

    await user.save();
  }

  public async findUserById(socketId: string) {
    // return this.users.find(({ id }) => id === socketId);
    return await this.UserModel.findOne({ socketId });
  }


}

export default new UserState();
