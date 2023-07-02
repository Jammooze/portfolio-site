/* eslint-disable no-unused-vars */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PostComment } from "src/post/entities";
import { PostService } from "src/post/post.service";
import { PostCommentService } from "src/post/comment/postComment.service";
import { UserService } from "src/users/user.service";
import { Post } from "src/post/entities";

export enum HeartItemType {
  Comment = "comment",
  Post = "post",
}

@Injectable()
export class HeartInteractionService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: PostCommentService
  ) {}

  private async getHeartedItemById(itemId: string, itemType: HeartItemType) {
    let item: PostComment | Post;

    if (itemType === HeartItemType.Comment) {
      item = await this.commentService.getByCommentId(itemId, ["heartedUsers"]);
    } else if (itemType === HeartItemType.Post) {
      item = await this.postService.getById(itemId, ["heartedUsers"]);
    } else {
      throw new InternalServerErrorException(
        "HeartInteractionService - Invalid heart item type."
      );
    }

    return item;
  }

  async heartItem(itemId: string, itemType: HeartItemType, userId: string) {
    const user = await this.userService.getById(userId);
    const item = await this.getHeartedItemById(itemId, itemType);

    const isUserHearted = item.heartedUsers.find(
      (heartedUser) => heartedUser.id === user.id
    );

    if (!isUserHearted) {
      item.heartedUsers.push(user);
    } else {
      item.heartedUsers = item.heartedUsers.filter(
        (heartedUser) => heartedUser.id !== user.id
      );
    }

    const updatedItem = await item.save();

    return {
      heartCount: updatedItem.heartedUsers.length,
      isUserHearted: !isUserHearted,
    };
  }
}
