import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostCommentDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 750,
  })
  @MaxLength(750, {
    message: "content must not exceed 750 characters.",
  })
  @MinLength(1, {
    message: "content must be at least 1 character long.",
  })
  @IsString({
    message: "content must be a string.",
  })
  @IsNotEmpty({
    message: "content is a required field.",
  })
  content: string;
}
