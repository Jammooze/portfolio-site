import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 50,
  })
  @MaxLength(50, {
    message: "Fullname must not exceed 50 characters.",
  })
  @MinLength(1, {
    message: "Fullname must be at least 1 character long.",
  })
  @IsString({
    message: "Fullname must be a string.",
  })
  @IsNotEmpty({
    message: "Fullname is a required field.",
  })
  fullName: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: "Invalid email format.",
    }
  )
  @IsString({
    message: "Email must be a string.",
  })
  @IsNotEmpty({
    message: "Email is a required field.",
  })
  email: string;

  @ApiProperty({
    minLength: 8,
    example: "JaMeSFallen123!@",
    description:
      "Password must be at least 8 characters long and contain at least 2 uppercase letters , 2 numbers, and 2 symbols.",
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 2,
      minUppercase: 2,
      minSymbols: 2,
    },
    {
      message:
        "Password must be at least 8 characters long and contain at least 2 uppercase letters , 2 numbers, and 2 symbols.",
    }
  )
  @ApiProperty()
  @IsString({
    message: "Password must be a string.",
  })
  @IsNotEmpty({
    message: "Password is a required field.",
  })
  password: string;
}
