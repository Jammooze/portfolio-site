import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostCommentDto {
  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 750,
  })
  @IsOptional()
  @MaxLength(750, {
    message: "content must not exceed 750 characters.",
  })
  @MinLength(1, {
    message: "content must be at least 1 character long.",
  })
  @IsString({
    message: "content must be a string.",
  })
  content: string;
}
