import { RowDataPacket } from "mysql2";

export interface GymClass extends RowDataPacket {
  class_id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  difficulty: number;
  max_participants: number;
  instructor_id: number;
  location_id: number;
}

export interface ICreateGymClass extends RowDataPacket {
  title: string;
  start_time: Date;
  end_time: Date;
  difficulty: number;
  max_participants: number;
  instructor_id: number;
  location_id: number;
}

export interface IDate extends RowDataPacket {
  date: string;
}

export interface IClassSchedule extends RowDataPacket {
  class_id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  location: string;
  fnamn: string;
  max_participants: number;
  booked: number;
}
