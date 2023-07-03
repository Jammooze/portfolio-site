import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  PaginationQuery,
  PaginationService,
} from "src/pagination/pagination.service";
import { PostComment } from "src/post/entities/postComment.entity";
import { PostComment as PostCommentDto } from "src/post/dtos/comment";
import { PostCommentService, CommentData } from "../postComment.service";

@Injectable()
export class PostCommentReplyService {
  constructor(
    @InjectRepository(PostComment)
    private readonly commentRepository: Repository<PostComment>,
    private readonly commentService: PostCommentService,
    private readonly paginationService: PaginationService
  ) {}

  async create(commentData: CommentData) {
    const commentHasParent = await this.commentService.hasCommentParent(
      commentData.postId,
      commentData.parentId
    );

    if (commentHasParent) {
      throw new ForbiddenException(
        "Cannot reply to a comment that already has a parent."
      );
    }

    const comment = await this.commentService.create(commentData);
    return comment;
  }

  async getReplies(postId: string, commentId: string, query: PaginationQuery) {
    console.log(postId, commentId);

    const paginationData = await this.paginationService.offsetPaginate({
      repository: this.commentRepository,
      query,
      options: {
        relations: [
          {
            property: "user",
          },
        ],
        filters: [
          { field: "parentId", value: commentId, operator: "=" },
          { field: "postId", value: postId, operator: "=" },
        ],
      },
      transformFn: PostCommentDto.fromArray,
    });

    return paginationData;
  }
}
