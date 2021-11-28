import { Response, Request } from "express";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { email, name } = request.body as ICreateUserDTO;

    try {
      const user = this.createUserUseCase.execute({
        email,
        name,
      });
      return response.status(201).send(user);
    } catch (error) {
      return response.status(400).send({ error });
    }
  }
}

export { CreateUserController };
