import { Controller, Post } from "@nestjs/common";

@Controller("posts/:postId/comments/:commentId/interaction")
export class PostCommentInteractionController {
  @Post("reply")
  async addReply() {
    return;
  }

  @Post("like")
  async likeComment() {
    return;
  }

  @Post("dislike")
  async dislikeComment() {
    return;
  }
}
