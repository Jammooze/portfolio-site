import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

// maybe post id???
export class CreatePostCommentDto {
  @MaxLength(750, {
    message: "Content must not exceed 250 characters.",
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
