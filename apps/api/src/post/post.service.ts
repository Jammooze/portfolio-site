import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SlugService } from "../slug/slug.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { Post } from "./entities/post.entity";
import { IdService } from "../id/id.service";
import { UserService } from "../users/user.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly slugService: SlugService,
    private readonly idService: IdService,
    private readonly userService: UserService
  ) {}

  // we need to find a way to
  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    // const user = await this.userService.findUserById(userId);

    // if (user === null) {
    //   throw new InternalServerErrorException(
    //     `Unable to fetch information about the user with ID: ${userId}.`
    //   );
    // }

    const post = new Post();
    const postId = this.idService.generateId();

    post.id = postId;
    post.metaTitle = "";
    post.slug = `${this.slugService.slugify(createPostDto.title)}-${postId}`;
    post.title = createPostDto.title;
    post.userId = userId;
    post.summary = createPostDto.summary;
    post.content = createPostDto.content;
    post.published = createPostDto.published;

    if (post.published) {
      post.publishedAt = new Date();
    }

    const savedPost = await this.postRepository.save(post);
    return savedPost;
  }
}
