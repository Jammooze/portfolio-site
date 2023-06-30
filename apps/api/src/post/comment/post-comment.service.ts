import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  PaginationService,
  PaginationResult,
  PaginationQuery,
} from "src/pagination/pagination.service";
import { PostComment } from "../entities/post-comment.entity";
import { CreatePostCommentDto } from "../dtos/comment/create-post-comment.dto";
import { PostCommentDto, UpdatePostCommentDto } from "../dtos/comment";
import { PostService } from "../post.service";
import { UserService } from "../../users/user.service";

interface CommentData {
  postId: string;
  userId: string;
  parentId?: string;
  createCommentData: CreatePostCommentDto;
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

    // comment.id = this.idService.generateId();
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

  async getById(postId: string, commentId: string) {
    const comment = await this.commentRepository.findOneBy({
      id: commentId,
      postId,
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
    updateData: UpdatePostCommentDto
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
  ): Promise<PaginationResult<PostCommentDto>> {
    await this.postService.getById(postId);
    const paginationData = await this.paginationService.paginate(
      this.commentRepository,
      query,
      ["user"],
      PostCommentDto.fromArray
    );

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
}
