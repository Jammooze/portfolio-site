import { Module } from "@nestjs/common";
import { HeartInteractionService } from "./heartInteraction.service";
@Module({
  providers: [HeartInteractionService],
  exports: [HeartInteractionService],
})
export class InteractionModule {}
