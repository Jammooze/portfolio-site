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
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { BlockAuthGuard } from "./guards/block-auth.guard";
import { AuthRequiredGuard } from "./guards/auth-required.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @HttpCode(201)
  @UseGuards(BlockAuthGuard)
  async handleBasicRegister(
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto
  ) {
    const user = await this.userService.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException("Email has already been taken.");
    }

    const createdUser = await this.userService.createUser(
      createUserDto,
      AuthStrategy.Email
    );

    const sessionUser = {
      id: createdUser.id,
      email: createdUser.email,
    };

    return new Promise((resolve, reject) => {
      req.login(sessionUser, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: sessionUser.id });
        }
      });
    });
  }

  @Post("login")
  @UseGuards(BlockAuthGuard, LocalAuthGuard)
  handleBasicLogin(@Req() req: Request) {
    return req.user;
  }

  @Get("google")
  @UseGuards(BlockAuthGuard, GoogleAuthGuard)
  handleGoogleLogin(): void {
    return;
  }

  @Get("facebook")
  @UseGuards(BlockAuthGuard, FacebookAuthGuard)
  handleFacebookLogin(): void {
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
  @UseGuards(AuthRequiredGuard)
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
