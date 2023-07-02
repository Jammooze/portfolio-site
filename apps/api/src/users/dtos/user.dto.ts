import { ApiProperty } from "@nestjs/swagger";
import { User as UserEntity } from "../user.entity";

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  profileUrl: string;

  static from(record: UserEntity): User {
    const user = new User();

    user.id = record.id;
    user.fullName = record.fullName;
    user.profileUrl = record.profileUrl;

    return user;
  }
}
