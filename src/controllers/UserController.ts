import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import UserRepository from "../repositories/UserRepository";
class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;
        
        const userRepository = AppDataSource.getRepository(User).extend(UserRepository);
        const userAlreadyExists = await userRepository.findOneBy({ email });
        
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists!" });
        }
        
        const user = userRepository.create({        
            name, email
        })

        await userRepository.save(user);
        return res.status(201).json(user);

    }
}

export { UserController };

