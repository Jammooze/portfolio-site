import { Injectable } from "@nestjs/common";
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
    comment.publishedAt = new Date();

    comment.content = createCommentData.content;

    const createdComment = await comment.save();
    const createdCommentDto = PostCommentDto.from(createdComment);
    return createdCommentDto;
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
