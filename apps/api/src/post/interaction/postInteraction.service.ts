import { Injectable } from "@nestjs/common";
import {
  HeartItemType,
  InteractionService,
} from "src/interaction/interaction.service";

@Injectable()
export class PostInteractionService {
  constructor(private readonly interactionService: InteractionService) {}

  async heartPost(postId: string, userId) {
    const data = await this.interactionService.heartItem(
      postId,
      HeartItemType.Post,
      userId
    );

    return data;
  }
}
