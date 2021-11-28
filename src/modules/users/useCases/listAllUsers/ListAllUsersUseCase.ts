import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const requestUser = this.usersRepository.findById(user_id);

    if (!requestUser || !requestUser.admin)
      throw new Error("Could not get list of all Users.");

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
