import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class FollowUserResponse {
  @ApiProperty()
  @IsNumber(
    {},
    {
      message: "followerCount must be a number.",
    }
  )
  @IsNotEmpty({
    message: "followerCount is a required field.",
  })
  followerCount: number;
}
