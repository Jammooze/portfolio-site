import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostComment } from "./post-comment.entity";
import { PostService } from "../post.service";
import { UserService } from "../../users/user.service";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
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

    comment.user = user;
    comment.post = post;

    // default published
    // comment.published = true;
    comment.content = createCommentData.content;

    const createdComment = await comment.save();
    return createdComment;
  }
}
