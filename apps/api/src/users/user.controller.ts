import {
  Controller,
  // Get,
  // InternalServerErrorException,
  // Req,
  // UseGuards,
} from "@nestjs/common";
// import { ApiUnauthorizedResponse, ApiOkResponse } from "@nestjs/swagger";
// import { Request } from "express";
import { UserService } from "./user.service";
// import { AuthRequiredGuard } from "../auth/guards/auth-required.guard";
import { ApiTags } from "@nestjs/swagger";
// import { User } from "./user.entity";

@Controller("users")
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get("/me")
  // @ApiOkResponse({
  //   type: User,
  //   description: "OK.",
  // })
  // @ApiUnauthorizedResponse({
  //   description: "Authentication is required to access this resource.",
  // })
  // @UseGuards(AuthRequiredGuard)
  // async getAuthUser(@Req() req: Request) {
  //   const user = await this.userService.findUserByEmail(req.user.email);

  //   if (user === null) {
  //     throw new InternalServerErrorException(
  //       "Unable to fetch information about the authenticated user."
  //     );
  //   }

  //   return user;
  // }
}
