import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginUserDto {
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

  @ApiProperty()
  @IsString({
    message: "Password must be a string.",
  })
  @IsNotEmpty({
    message: "Password is a required field.",
  })
  password: string;
}
