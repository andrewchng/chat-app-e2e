import User from "../models/user.model"
// type User = {
//   name: string;
//   id: string;
// };
class UserService {
  private UserModel = User;

  // private users;

  public async activateUser(name: string, socketId: string) {
    let user = await this.findUserById(socketId);
    try {
      if(!user){
        user = new this.UserModel({name, socketId})
      } else{
        user.name = name;
      }
  
      await user.save();
    } catch (error) {
      console.error(`Error activating user: ${name}`)
      throw new Error(`Error activating user: ${name}`)
    }

  }

  public async findUserById(socketId: string) {
    // return this.users.find(({ id }) => id === socketId);
    try {
      const user = await User.findOne({socketId})
      return user;
    } catch (error) {
      console.error(`Error finding user by socketID : ${error}`)
      throw new Error(`Error finding user by socketID : ${socketId}`)
    }
  }


}

export default new UserService();
