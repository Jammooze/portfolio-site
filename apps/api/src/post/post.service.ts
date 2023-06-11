import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SlugService } from "../slug/slug.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { Post } from "./post.entity";
import { IdService } from "../id/id.service";
import { UserService } from "../users/user.service";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { PostMetaService } from "./meta/post-meta.service";
import { PostMetaHelperService } from "./meta/post-meta.helper.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly slugService: SlugService,
    private readonly idService: IdService,
    private readonly userService: UserService,
    private readonly postMetaService: PostMetaService,
    private readonly postMetaHelperService: PostMetaHelperService
  ) {}

  async create(userId: string, createData: CreatePostDto): Promise<Post> {
    const user = await this.userService.getById(userId);
    const post = new Post();
    const postId = this.idService.generateId();

    post.id = postId;
    post.slug = `${this.slugService.slugify(createData.title)}-${postId}`;
    post.title = createData.title;
    post.metaTitle = this.postMetaHelperService.createMetaTitle(
      post.title,
      user.fullName
    );
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
    const metaTags = await this.postMetaService.createAll(post, user);
    savedPost.metas = metaTags;

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
    await this.postRepository.update(id, {
      ...updateData,
    });

    const updatedPost = await this.getById(id);
    return updatedPost;
  }

  async deleteById(id: string): Promise<Post> {
    const post = await this.getById(id);

    // Delete all of the meta tags that is related to this post.
    await this.postMetaService.deleteAll(post.id);
    const deletedPost = await this.postRepository.remove(post);
    return deletedPost;
  }

  async doesUserOwnPost(userId: string, postId: string) {
    const post = await this.getById(postId);
    return post.userId === userId;
  }
}
