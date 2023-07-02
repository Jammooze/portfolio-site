import { Controller, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { FollowInteractionService } from "src/interaction/followInteraction.service";

@Controller("users/:userId/interaction")
@ApiTags("User Interaction")
export class UserInteractionController {
  constructor(private readonly interactionService: FollowInteractionService) {}

  @Post("follow")
  async followUser(@Req() req: Request, @Param("userId") userId: string) {}
}
