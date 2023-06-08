import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SlugService } from "../slug/slug.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { Post } from "./entities/post.entity";
import { IdService } from "../id/id.service";
import { UserService } from "../users/user.service";
// import { PostMetaService } from "./meta/post-meta.service";
import { UpdatePostDto } from "./dtos/update-post.dto";
// import { PostMetaHelperService } from "./meta/post-meta.helper.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly slugService: SlugService,
    private readonly idService: IdService,
    private readonly userService: UserService // private readonly metaService: PostMetaService, // private readonly metaHelperService: PostMetaHelperService
  ) {}

  async create(userId: string, createData: CreatePostDto): Promise<Post> {
    const user = await this.userService.findUserById(userId);

    if (user === null) {
      throw new InternalServerErrorException(
        `Unable to fetch information about the user with ID: ${userId}.`
      );
    }

    const post = new Post();
    const postId = this.idService.generateId();

    post.id = postId;
    post.slug = `${this.slugService.slugify(createData.title)}-${postId}`;
    post.title = createData.title;
    // post.metaTitle = this.metaHelperService.createMetaTitle(
    //   post.title,
    //   user.fullName
    // );
    post.user = user;
    post.summary = createData.summary;
    post.content = createData.content;
    post.published = createData.published;

    if (post.published) {
      post.publishedAt = new Date();
    }

    const savedPost = await this.postRepository.save(post);

    // We need to access information that is created only when the post is created to create
    // the necessary meta tags. Ex. slug
    // const metaTags = await this.metaService.createAll(post, user);
    // savedPost.meta = metaTags;

    const updatedPost = await savedPost.save();
    return updatedPost;
  }

  async getById(id: string): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    if (post === null) {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }

    return post;
  }

  async updateById(id: string, updateData: UpdatePostDto) {
    const updatedPost = await this.postRepository.update(id, {
      ...updateData,
    });

    return updatedPost;
  }

  async deleteById(id: string): Promise<Post> {
    const post = await this.getById(id);
    const deletedPost = await this.postRepository.remove(post);
    return deletedPost;
  }
}
