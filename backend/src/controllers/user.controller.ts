import express, { Express, Request, Response } from 'express';
import User from '../models/user.model';

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
  };
  public async clearAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const result = await User.deleteMany({});
        res.status(200).json({ message: `Deleted ${result.deletedCount} user(s)` });
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
  };
}
export default new UserController();