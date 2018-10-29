import { Repository } from "./repository";
import { Reservation } from "../model/reservation";

export class ReservationRepository extends Repository<Reservation> {
  table = "reservation";

  constructor(database) {
    super(database);
  }
}
