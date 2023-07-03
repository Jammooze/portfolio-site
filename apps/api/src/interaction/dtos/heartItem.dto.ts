import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class HeartItemResponse {
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
}
