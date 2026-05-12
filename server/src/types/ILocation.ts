import { RowDataPacket } from "mysql2";

export interface ILocation extends RowDataPacket {
  location_id: number;
  name: string;
  address: string;
  capacity: number;
}
