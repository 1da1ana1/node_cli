import { Repository} from "typeorm";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";


class UserRepository extends Repository<User> {}

export default AppDataSource.getRepository(User).extend(UserRepository);