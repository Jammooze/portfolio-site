import { Controller, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UserInteractionService } from "./userInteraction.service";

@Controller("users/:userId/interaction")
@ApiTags("User Interaction")
export class UserInteractionController {
  constructor(private readonly interactionService: UserInteractionService) {}

  @Post("follow")
  async followUser(@Req() req: Request, @Param("userId") userId: string) {
    const followingResult = await this.interactionService.followUser(
      "1",
      userId
    );

    return followingResult;
  }
}
