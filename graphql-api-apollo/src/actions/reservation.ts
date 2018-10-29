import { Context } from "../context";
import { Reservation } from "../model/reservation";

interface AddReservationArgs {
  name: string;

  hotelName: string;

  arrivalDate: Date;

  departureDate: Date;
}

export function reservations(
  obj,
  args,
  { repositories: { reservationRepository } }: Context
): Promise<Reservation[]> {
  return reservationRepository.findAll();
}

export function reservation(
  obj,
  { id },
  { repositories }: Context
): Promise<Reservation> {
  return repositories.reservationRepository.find(id);
}

export function addReservation(
  obj,
  { name, hotelName, arrivalDate, departureDate }: AddReservationArgs,
  { database, repositories, user }: Context
): Promise<Reservation> {
  return repositories.reservationRepository.insert({
    name,
    hotelName,
    arrivalDate,
    departureDate
  });
}
