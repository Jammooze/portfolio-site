import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdatePostDto {
  @IsOptional()
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
  title: string | null;

  @IsOptional()
  @IsString({
    message: "Content must be a string.",
  })
  @IsNotEmpty({
    message: "Content is a required field.",
  })
  content: string | null;

  @IsOptional()
  @IsBoolean({
    message: "Published must be a boolean.",
  })
  @IsNotEmpty({
    message: "Published is a required field.",
  })
  published: boolean | null;

  @IsOptional()
  @IsString({
    message: "Summary must be a string.",
  })
  summary: string | null;
}
