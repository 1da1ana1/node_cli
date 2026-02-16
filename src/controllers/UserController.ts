import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import * as yup from "yup";
import { AppErrors } from "../errors/AppErrors";
class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;
        
        const schema = yup.object().shape({
            name: yup.string().required("Name is required!"),
            email: yup.string().email("Invalid email format!").required("Email is required!"),
        });

        if (!(await schema.isValid(req.body))) {
           throw new AppErrors("Validation fails!");
        }

        const userRepository = AppDataSource.getRepository(User).extend(UserRepository);
        const userAlreadyExists = await userRepository.findOneBy({ email });
        
        if (userAlreadyExists) {
           throw new AppErrors("User already exists!");
        }
        
        const user = userRepository.create({        
            name, email
        })

        await userRepository.save(user);
        return res.status(201).json(user);

    }
}

export { UserController };

