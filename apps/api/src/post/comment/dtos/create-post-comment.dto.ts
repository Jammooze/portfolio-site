import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostCommentDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 750,
  })
  @MaxLength(750, {
    message: "Content must not exceed 750 characters.",
  })
  @MinLength(1, {
    message: "Content must be at least 1 character long.",
  })
  @IsString({
    message: "Content must be a string.",
  })
  @IsNotEmpty({
    message: "Content is a required field.",
  })
  content: string;
}
