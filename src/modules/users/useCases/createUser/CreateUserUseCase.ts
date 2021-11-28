import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const existingUser = this.usersRepository.findByEmail(email);

    if (existingUser) throw new Error("User with this email already exists.");
    return this.usersRepository.create({ email, name });
  }
}

export { CreateUserUseCase };
