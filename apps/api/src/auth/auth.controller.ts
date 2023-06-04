import {
  Controller,
  Get,
  UseGuards,
  Res,
  Body,
  Post,
  ConflictException,
  HttpCode,
} from "@nestjs/common";
import { Response } from "express";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { FacebookAuthGuard } from "./guards/facebook-auth.guard";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UserService } from "../users/user.service";
import { AuthStrategy } from "./auth-strategy.enum";
import { User } from "../users/user.entity";
// import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @HttpCode(201)
  async handleBasicRegister(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    const user = await this.userService.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException("Email has already been taken.");
    }

    const createdUser = await this.userService.createUser(
      createUserDto,
      AuthStrategy.Email
    );

    return createdUser;
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin(): void {
    return;
  }

  @Get("facebook")
  @UseGuards(FacebookAuthGuard)
  handleFacebookLogin(): void {
    console.log("dqwe");
    return;
  }

  @Get("facebook/callback")
  @UseGuards(FacebookAuthGuard)
  handleFacebookCallback(@Res() res: Response): void {
    return res.redirect("http://localhost:3001/user/me");
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  handleGoogleCallback(@Res() res: Response) {
    return res.redirect("http://localhost:3001/user/me");
  }
}
