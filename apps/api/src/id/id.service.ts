import { Injectable } from "@nestjs/common";

const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

@Injectable()
export class IdService {
  generateId(): string {
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
