import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostComment } from "./post-comment.entity";
import { PostService } from "../post.service";
import { UserService } from "../../users/user.service";

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {}

  async create(postId: string, userId: string) {
    const post = await this.postService.getById(postId);
    const user = await this.userService.getById(userId);

    console.log(post, user);

    // const comment = new PostComment();
  }
}
