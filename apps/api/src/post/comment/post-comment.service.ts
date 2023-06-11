import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostComment } from "./post-comment.entity";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";
import { PostService } from "../post.service";
import { IdService } from "../../id/id.service";
import { UserService } from "../../users/user.service";
import { GetCommentsQueryDto } from "./dtos/get-comments-query.dto";
import { PostCommentDto } from "./dtos/post-comment.dto";
import { PostCommentUserDto } from "./dtos/post-comment-user.dto";

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly idService: IdService
  ) {}

  async create(
    postId: string,
    userId: string,
    createCommentData: CreatePostCommentDto
  ) {
    const post = await this.postService.getById(postId);
    const user = await this.userService.getById(userId);

    const comment = new PostComment();

    comment.id = this.idService.generateId();
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
    getCommentsData: GetCommentsQueryDto
  ) {
    await this.postService.getById(postId);

    const queryBuilder = await this.postCommentRepository.createQueryBuilder(
      "comment"
    );

    queryBuilder
      .leftJoinAndSelect("comment.user", "user")
      .where("comment.postId = :postId", { postId });

    if (getCommentsData.sort === "desc") {
      queryBuilder.orderBy("comment.createdAt", "DESC");
    } else {
      queryBuilder.orderBy("comment.createdAt", "ASC");
    }

    queryBuilder.limit(getCommentsData.limit);

    const comments = await queryBuilder.getMany();
    const commentDtos = comments.map((comment) =>
      PostCommentUserDto.from(comment)
    );

    return commentDtos;
  }
}
