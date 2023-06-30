import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreatePostDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 75,
  })
  @MaxLength(75, {
    message: "Title must not exceed 75 characters.",
  })
  @MinLength(1, {
    message: "Title must be at least 1 character long.",
  })
  @IsString({
    message: "Title must be a string.",
  })
  @IsNotEmpty({
    message: "Title is a required field.",
  })
  title: string;

  @ApiProperty()
  @IsString({
    message: "Content must be a string.",
  })
  @IsNotEmpty({
    message: "Content is a required field.",
  })
  content: string;

  @ApiProperty()
  @IsBoolean({
    message: "Published must be a boolean.",
  })
  @IsNotEmpty({
    message: "Published is a required field.",
  })
  published: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: "Summary must be a string.",
  })
  summary: string | null;
}
