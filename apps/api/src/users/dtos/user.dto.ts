import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user.entity";

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  static from(record: User): UserDto {
    const userDto = new UserDto();

    userDto.id = record.id;
    userDto.fullName = record.fullName;

    return userDto;
  }
}
