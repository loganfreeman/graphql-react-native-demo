import { Database } from "./database";
import { TaskRepository } from "./repositories/task.repository";
import { UserRepository } from "./repositories/user.repository";
import { User } from "./model/user";
import { ReservationRepository } from "./repositories/reservation.repository";

let context: Context;

export interface Context {
  database: Database;
  repositories: {
    taskRepository: TaskRepository;
    userRepository: UserRepository;
    reservationRepository: ReservationRepository;
  };
  user: User | null;
}

export default async function getContext(): Promise<Context> {
  if (context) {
    return context;
  }

  const database = new Database();
  await database.use();

  const taskRepository = new TaskRepository(database);
  const userRepository = new UserRepository(database);
  const reservationRepository = new ReservationRepository(database);

  context = {
    database,
    repositories: {
      taskRepository,
      userRepository,
      reservationRepository
    },
    user: null
  };

  return context;
}
