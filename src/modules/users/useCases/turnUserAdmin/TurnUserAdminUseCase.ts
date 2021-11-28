import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const requestUser = this.usersRepository.findById(user_id);

    if (!requestUser) throw new Error("Could not turn User to Admin.");
    return this.usersRepository.turnAdmin(requestUser);
  }
}

export { TurnUserAdminUseCase };
