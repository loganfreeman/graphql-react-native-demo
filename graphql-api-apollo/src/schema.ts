import { makeExecutableSchema } from "graphql-tools";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

import * as ACTIONS_TASK from "./actions/tasks";
import * as ACTIONS_USER from "./actions/users";
import * as ACTIONS_RESERVATION from "./actions/reservation";
const typeDefs = `

  input updateTaskInput {
    id: ID!
    name: String!
    done: Boolean
  }

  type Query {
    reservations: [Reservation]

    reservation(id: ID!): Reservation
    """
      Get all tasks
    """
    tasks: [Task]
    """
      Get a task by id
    """
    task(id: ID!): Task

    """
      Get authenticated user
    """
    me: User
  }

  type Mutation {
    addReservation(name: String, hotelName: String, arrivalDate: String, departureDate: String): Reservation
    """
      Add a task
    """
    addTask(name: String!): Task
    """
      Remove a task
    """
    removeTask(id: ID!): Task
    """
      Mark task as done
    """
    markTaskDone(id: ID!): Task
    """
      Mark task as not done
    """
    markTaskNotDone(id: ID!): Task
    """
      Update a task
    """
    updateTask(input: updateTaskInput): Task
  }

  type Reservation {
    id: ID!
    name: String
    hotelName: String
    arrivalDate: String
    departureDate: String
  }

  """
    A Task
  """
  type Task {
    id: ID!
    done: Boolean
    name: String
  }

  """
    An user
  """
  type User {
    id: ID!
    """
      Username of user
    """
    username: String!
    """
      Password of user, mostly null
    """
    password: String
    """
      JWT Token used to login
    """
    token: String
  }
`;

const schema = makeExecutableSchema(<any>{
  typeDefs,
  resolvers: {
    Query: {
      tasks: ACTIONS_TASK.tasks,
      task: ACTIONS_TASK.task,
      me: ACTIONS_USER.me,
      reservations: ACTIONS_RESERVATION.reservations,
      reservation: ACTIONS_RESERVATION.reservation
    },
    Mutation: {
      addReservation: ACTIONS_RESERVATION.addReservation,
      addTask: ACTIONS_TASK.addTask,
      markTaskDone: ACTIONS_TASK.markTaskDone,
      markTaskNotDone: ACTIONS_TASK.markTaskNotDone,
      updateTask: ACTIONS_TASK.updateTask,
      removeTask: ACTIONS_TASK.removeTask
    }
  }
});

export default schema;
