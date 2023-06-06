import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SlugService } from "../slug/slug.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { Post } from "./entities/post.entity";
import { IdService } from "../id/id.service";

@Injectable()
export class PostService {
  constructor(
    private readonly slugService: SlugService,
    private readonly idService: IdService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const post = new Post();
    const postId = this.idService.generateId();

    post.id = postId;
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
