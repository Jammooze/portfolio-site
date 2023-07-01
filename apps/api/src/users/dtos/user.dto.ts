import { ApiProperty } from "@nestjs/swagger";
import { User as UserEntity } from "../user.entity";

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  static from(record: UserEntity): User {
    const userDto = new User();

    userDto.id = record.id;
    userDto.fullName = record.fullName;

    return userDto;
  }
}
