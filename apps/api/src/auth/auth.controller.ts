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
import {
  ApiExcludeEndpoint,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { Request, Response } from "express";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { FacebookAuthGuard } from "./guards/facebook-auth.guard";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UserService } from "../users/user.service";
import { AuthStrategy } from "./auth-strategy.enum";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { BlockAuthGuard } from "./guards/block-auth.guard";
import { AuthRequiredGuard } from "./guards/auth-required.guard";
import { LoginUserDto } from "./dtos/login-user.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiCreatedResponse({
    description: "User has been successfully registered.",
    schema: {
      properties: {
        id: { type: "number" },
      },
    },
  })
  @ApiForbiddenResponse({
    description: "Forbidden.",
  })
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
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description: "User has successfully logged in.",
    schema: {
      properties: {
        id: { type: "number" },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Incorrect email or password.",
  })
  @ApiForbiddenResponse({
    description: "Forbidden",
  })
  @HttpCode(200)
  @UseGuards(BlockAuthGuard, LocalAuthGuard)
  handleBasicLogin(@Req() req: Request) {
    return {
      id: req.user.id,
    };
  }

  @ApiExcludeEndpoint()
  @Get("google")
  @UseGuards(BlockAuthGuard, GoogleAuthGuard)
  handleGoogleLogin(): void {
    return;
  }

  @ApiExcludeEndpoint()
  @Get("facebook")
  @UseGuards(BlockAuthGuard, FacebookAuthGuard)
  handleFacebookLogin(): void {
    return;
  }

  @ApiExcludeEndpoint()
  @Get("facebook/callback")
  @UseGuards(FacebookAuthGuard)
  handleFacebookCallback(@Res() res: Response): void {
    return res.redirect("/user/me");
  }

  @ApiExcludeEndpoint()
  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  handleGoogleCallback(@Res() res: Response) {
    return res.redirect("/user/me");
  }

  @Post("logout")
  @ApiNoContentResponse({
    description: "User has been successfully logged out.",
    schema: {
      properties: {},
    },
  })
  @ApiForbiddenResponse({
    description: "Forbidden.",
  })
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
