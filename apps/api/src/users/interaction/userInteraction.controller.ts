import { Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { ApiAccessDeniedResponse } from "src/decorators/apiAccessDeniedResponse";
import { FollowUserResponse } from "src/interaction/dtos/followUser.dto";
import { AuthRequiredGuard } from "src/auth/guards/auth-required.guard";
import { UserInteractionService } from "./userInteraction.service";

@Controller("users/:userId/interaction")
@ApiTags("User Interaction")
export class UserInteractionController {
  constructor(private readonly interactionService: UserInteractionService) {}

  @Post("follow")
  @UseGuards(AuthRequiredGuard)
  @ApiOkResponse({
    description: "Successfully followed user.",
    type: FollowUserResponse,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse({
    description: "User profile cannot be found.",
  })
  @ApiAccessDeniedResponse()
  async followUser(@Req() req: Request, @Param("userId") userId: string) {
    const followingResult = await this.interactionService.followUser(
      req.user.id,
      userId
    );

    return followingResult;
  }

  @Post("unfollow")
  @UseGuards(AuthRequiredGuard)
  @ApiOkResponse({
    description: "Successfully unfollowed user.",
    type: FollowUserResponse,
  })
  @ApiNotFoundResponse({
    description: "User profile cannot be found.",
  })
  @ApiAccessDeniedResponse()
  async unfollowUser(@Req() req: Request, @Param("userId") userId: string) {
    const followingResult = await this.interactionService.unfollowUser(
      req.user.id,
      userId
    );

    return followingResult;
  }
}
