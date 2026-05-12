import { RowDataPacket } from "mysql2";

export interface IInstructor extends RowDataPacket {
  instructor_id: number;
  fnamn: string;
  enamn: string;
}

export interface ICreateInstructor extends RowDataPacket {
  fnamn: string;
  enamn: string;
}
