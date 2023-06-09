import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import { AuthRequiredGuard } from "../auth/guards/auth-required.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  @UseGuards(AuthRequiredGuard)
  async getAuthUser(@Req() req: Request) {
    const user = await this.userService.findUserByEmail(req.user.email);

    if (user === null) {
      throw new InternalServerErrorException(
        "Unable to fetch information about the authenticated user."
      );
    }

    return user;
  }
}
