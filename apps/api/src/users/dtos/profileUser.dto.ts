import { ApiProperty } from "@nestjs/swagger";
import { User as UserEntity } from "../user.entity";
import { User } from "./user.dto";

export class ProfileUser extends User {
  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  registeredAt: Date;

  @ApiProperty({
    nullable: true,
  })
  intro: string | null;

  @ApiProperty({
    nullable: true,
  })
  profile: string | null;

  @ApiProperty()
  followingCount: number;

  @ApiProperty()
  followerCount: number;

  static from(record: UserEntity) {
    const user = new ProfileUser();

    user.id = record.id;
    user.fullName = record.fullName;
    user.profileUrl = record.profileUrl;
    user.isVerified = record.isVerified;
    user.registeredAt = record.registeredAt;
    user.intro = record.intro;
    user.profile = record.profile;
    user.followingCount = record.followingCount || 0;
    user.followerCount = record.followerCount || 0;

    return user;
  }
}
