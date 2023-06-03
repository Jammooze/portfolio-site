import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("user")
export class UserController {
  @Get("/me")
  async getAuthUser(@Req() req: Request) {
    return req.user;
  }
}
