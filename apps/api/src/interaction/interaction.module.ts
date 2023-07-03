import { Module } from "@nestjs/common";
import { HeartInteractionService } from "./heartInteraction.service";
import { FollowInteractionService } from "./followInteraction.service";
@Module({
  providers: [HeartInteractionService, FollowInteractionService],
  exports: [HeartInteractionService, FollowInteractionService],
})
export class InteractionModule {}
