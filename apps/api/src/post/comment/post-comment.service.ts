import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  PaginationService,
  PaginationResult,
  PaginationQuery,
} from "src/pagination/pagination.service";
import { PostComment } from "./post-comment.entity";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";
import { PostCommentDto } from "./dtos/post-comment.dto";
import { PostService } from "../post.service";
import { UserService } from "../../users/user.service";
import { UpdatePostCommentDto } from "./dtos/update-post-comment.dto";

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly commentRepository: Repository<PostComment>,
    private readonly paginationService: PaginationService,
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {}

  async create(
    postId: string,
    userId: string,
    createCommentData: CreatePostCommentDto
  ) {
    const post = await this.postService.getById(postId);
    const user = await this.userService.getById(userId);

    const comment = new PostComment();

    // comment.id = this.idService.generateId();
    comment.user = user;
    comment.post = post;
    comment.published = true;
    comment.edited = false;
    comment.publishedAt = new Date();

    comment.content = createCommentData.content;

    const createdComment = await comment.save();
    const createdCommentDto = PostCommentDto.from(createdComment);
    return createdCommentDto;
  }

  async getById(id: string) {
    const comment = await this.commentRepository.findOneBy({ id });

    if (comment === null) {
      throw new NotFoundException(`Comment with ID: ${id} not found.`);
    }

    return comment;
  }

  async updateById(
    postId: string,
    commentId: string,
    updateData: UpdatePostCommentDto
  ) {
    await this.postService.getById(postId);

    const result = await this.commentRepository.update(commentId, {
      ...updateData,
      edited: true,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID: ${commentId} not found.`);
    }

    const comment = await this.getById(commentId);
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
}
