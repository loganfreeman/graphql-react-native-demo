import Command from "../command";
import { UserRepository } from "../../repositories/user.repository";
import { CliContext } from "../context";

export default class DatabaseCreateCommand extends Command {
  userRepository: UserRepository = this.context.repositories.userRepository;

  constructor(private context: CliContext) {
    super("user:create");
  }

  async run() {
    await this.userRepository.insert({
      username: "admin",
      password: "admin"
    });

    console.log("User admin with password admin");

    return 0;
  }
}
