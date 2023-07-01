import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsNumber } from "class-validator";

export class HeartCommentResponse {
  @ApiProperty()
  @IsNumber(
    {},
    {
      message: "heartCount must be a number.",
    }
  )
  @IsNotEmpty({
    message: "heartCount is a required field.",
  })
  heartCount: number;

  @ApiProperty()
  @IsBoolean({
    message: "isUserHearted must be a boolean.",
  })
  @IsNotEmpty({
    message: "isUserHearted is a required field.",
  })
  isUserHearted: boolean;
}
