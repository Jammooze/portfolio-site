import {
  Controller,
  Get,
  UseGuards,
  Res,
  Body,
  Post,
  ConflictException,
  HttpCode,
  Req,
} from "@nestjs/common";
import { Request, Response } from "express";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { FacebookAuthGuard } from "./guards/facebook-auth.guard";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UserService } from "../users/user.service";
import { AuthStrategy } from "./auth-strategy.enum";
import { User } from "../users/user.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
// import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @HttpCode(201)
  async handleBasicRegister(
    @Req() req: Request,
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

    return new Promise<User>((resolve, reject) => {
      req.login(createdUser, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(createdUser);
        }
      });
    });
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  handleBasicLogin(@Req() req: Request) {
    return req.user;
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

  @Post("logout")
  @HttpCode(204)
  handleLogout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        }

        resolve(null);
      });
    });
  }
}
