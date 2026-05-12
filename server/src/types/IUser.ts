import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket {
  user_id: number;
  fnamn: string;
  enamn: string;
  created_at: Date;
}

export interface ICreateUser extends RowDataPacket {
  fnamn: string;
  enamn: string;
}
