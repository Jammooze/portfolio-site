import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  InternalServerErrorException,
  Req,
  UseInterceptors,
} from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/me")
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
