// import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostMetaDto {
  // @MaxLength(75, {
  //   message: "Key must not exceed 75 characters.",
  // })
  // @MinLength(1, {
  //   message: "Key must be at least 1 character long.",
  // })
  // @IsString({
  //   message: "Key must be a string.",
  // })
  // @IsNotEmpty({
  //   message: "Key is a required field.",
  // })
  key: string;

  // @IsString({
  //   message: "Content must be a string.",
  // })
  // @IsNotEmpty({
  //   message: "Content is a required field.",
  // })
  content: string;
}
