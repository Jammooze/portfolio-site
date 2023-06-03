import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
  private readonly saltRounds = 15;

  async hash(data: string): Promise<string> {
    const hash = await bcrypt.hash(data, this.saltRounds);
    return hash;
  }

  async compare(data: string, hash: string): Promise<boolean> {
    const isSame = await bcrypt.compare(data, hash);
    return isSame;
  }
}
