import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user.entity";

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  static from(user: User): UserDto {
    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.fullName = user.fullName;

    return userDto;
  }
}
