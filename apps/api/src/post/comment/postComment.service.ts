import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  PaginationService,
  PaginationQuery,
} from "src/pagination/pagination.service";
import { PostComment } from "../entities/postComment.entity";
import { CreatePostCommentBody } from "../dtos/comment/createPostComment.dto";
import {
  GetPostCommentsResponse,
  PostComment as PostCommentDto,
  UpdatePostCommentBody,
} from "../dtos/comment";
import { PostService } from "../post.service";
import { UserService } from "../../users/user.service";

export interface CommentData {
  postId: string;
  userId: string;
  parentId?: string;
  createCommentData: CreatePostCommentBody;
}

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly commentRepository: Repository<PostComment>,
    private readonly paginationService: PaginationService,
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {}

  async create({ postId, userId, parentId, createCommentData }: CommentData) {
    const post = await this.postService.getById(postId);
    const user = await this.userService.getById(userId);

    const comment = new PostComment();

    comment.user = user;
    comment.post = post;
    comment.published = true;
    comment.edited = false;
    comment.publishedAt = new Date();

    if (parentId) {
      comment.parentId = parentId;
    }

    comment.content = createCommentData.content;

    const createdComment = await comment.save();
    const createdCommentDto = PostCommentDto.from(createdComment);
    return createdCommentDto;
  }

  async getById(postId: string, commentId: string, relations?: string[]) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        postId,
      },
      relations,
    });

    if (comment === null) {
      throw new NotFoundException(
        `Comment with ID ${commentId} for Post ID ${postId} not found.`
      );
    }

    return comment;
  }

  async updateById(
    postId: string,
    commentId: string,
    updateData: UpdatePostCommentBody
  ) {
    const result = await this.commentRepository.update(
      { id: commentId, postId },
      {
        ...updateData,
        edited: true,
      }
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Comment with ID ${commentId} for Post ID ${postId} not found.`
      );
    }

    const comment = await this.getById(postId, commentId);
    return comment;
  }

  async getCommentsByPostId(
    postId: string,
    query: PaginationQuery
  ): Promise<GetPostCommentsResponse> {
    await this.postService.getById(postId);
    const paginationData = await this.paginationService.paginate({
      repository: this.commentRepository,
      query,
      transformFn: PostCommentDto.fromArray,
      options: {
        relations: ["user"],
      },
    });

    return paginationData;
  }

  async deleteCommentById(postId: string, commentId: string) {
    const comment = await this.getById(postId, commentId);
    const deletedComment = await this.commentRepository.remove(comment);
    return deletedComment;
  }

  async doesUserOwnComment(postId: string, commentId: string, userId: string) {
    const comment = await this.getById(postId, commentId);
    return comment.userId === userId;
  }

  async hasCommentParent(postId: string, commentId: string) {
    const comment = await this.getById(postId, commentId);
    return !!comment.parentId;
  }
}
