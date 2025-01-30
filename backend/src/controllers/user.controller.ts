import express, { Express, Request, Response } from "express";
import User from "../models/user.model";

export class UserController {
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      console.log("loggin in...");
      //  const { email, password } = req.body;
      // const user = await User.findOne({ email });
      // if (!user ||!password){
      //   res.status(401).json({ message:'Invalid email or password' });
      // }
      //compare password
      //create jwt

      //return sucess
      res.json({ message: "Logged in" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      // const {email, username, password}= req.body;
      // const newUser = await User.create({ email, password, username });
      res.json({ message: "register in" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  public async clearAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const result = await User.deleteMany({});
      res
        .status(200)
        .json({ message: `Deleted ${result.deletedCount} user(s)` });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
export default new UserController();
