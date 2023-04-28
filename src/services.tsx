import { pool } from './mysql-pool';
import type { RowDataPacket } from 'mysql2';


type Message = {
  text: string,
  chatRoomId: number
}

type RoomType = {
  id?: number,
  title: string,
  description: string
  messages?: Message[]
}

class RoomService {

  getRooms(): Promise<RoomType[]> {
    return new Promise<RoomType[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM ChatRooms",
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results as RoomType[]);
        }
      );
    });
  }

  getRoom(id: number): Promise<RoomType> {
    return new Promise<RoomType>((resolve, reject) => {
      pool.query(
        "SELECT * FROM ChatRooms WHERE id = ?",
        [id],
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results[0] as RoomType);
        }
      );
    });
  } 

  getMessages(id: number): Promise<Message[]> {
    return new Promise<Message[]>((resolve, reject) => {
      pool.query(
        "SELECT Messages.* FROM ChatRooms INNER JOIN Messages ON ChatRooms.id = Messages.chatRoomId WHERE Messages.chatRoomId = ?",
        [id],
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results as Message[]);
        }
      );
    });
  }

  insertRoom(room: RoomType): Promise<RowDataPacket[]> {
    return new Promise<RowDataPacket[]>((resolve, reject) => {
      pool.query(
        "INSERT INTO ChatRooms (title, description) VALUES (?, ?)",
        [room.title, room.description],
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results)
        }
      )
    });
  }

  addMessage(text: string, id: number): Promise<RowDataPacket[]> {
    return new Promise<RowDataPacket[]>((resolve, reject) => {
      pool.query(
        "INSERT INTO Messages (text, chatRoomId) VALUES (?, ?)",
        [text, id],
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results);
        }
      )
    });
  }
}

export const roomService = new RoomService();
