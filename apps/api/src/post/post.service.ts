import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SlugService } from "../slug/slug.service";
import { Post } from "./entities/post.entity";
import { Post as PostDto } from "./dtos/post";
import { IdService } from "../id/id.service";
import { UserService } from "../users/user.service";
import { UpdatePostBody, CreatePostBody } from "./dtos/post";
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

  async create(userId: string, createData: CreatePostBody): Promise<Post> {
    const user = await this.userService.getById(userId);
    const post = new Post();
    const postSlugId = this.idService.generateId();

    post.slugId = postSlugId;
    post.slug = `${this.slugService.slugify(createData.title)}-${postSlugId}`;
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

  async getById(postId: string, relations?: string[]): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations,
    });

    if (post === null) {
      throw new NotFoundException(`Post with ID: ${postId} not found.`);
    }

    return post;
  }

  async fetchById(postId: string): Promise<PostDto> {
    // we forgot the author?!?!??!
    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      // .leftJoinAndSelect("post.user", "user")
      .leftJoin("post.comments", "comments")
      .leftJoin("post.heartedUsers", "heartedUsers")
      .loadRelationCountAndMap("post.commentCount", "post.comments")
      .loadRelationCountAndMap("post.heartCount", "post.heartedUsers")
      .where("post.id = :id", { id: postId });

    const post = await queryBuilder.getOne();

    if (post === null) {
      throw new NotFoundException(`Post with ID: ${postId} not found.`);
    }

    return PostDto.from(post);
  }

  async doesPostExistById(postId: string): Promise<boolean> {
    const post = await this.postRepository.findOneBy({ id: postId });
    return !!post;
  }

  async updateById(id: string, updateData: UpdatePostBody) {
    const result = await this.postRepository.update(id, {
      ...updateData,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }

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

  async canUserViewPost(postId: string, userId: string) {
    const isOwner = await this.isUserPostOwner(postId, userId);
    return isOwner;
  }

  async isUserPostOwner(postId: string, userId: string) {
    const post = await this.getById(postId);
    return post.userId === userId;
  }
}
