import { Injectable } from "@nestjs/common";
import { Post } from "../entities/post.entity";
import { PostMeta } from "../entities/post-meta.entity";
import { CreatePostMetaDto } from "../dtos/meta/create-post-meta.dto";
import { IdService } from "../../id/id.service";
import { PostMetaHelperService } from "./post-meta.helper.service";
import { User } from "../../users/user.entity";

@Injectable()
export class PostMetaService {
  constructor(
    private readonly idService: IdService,
    private readonly metaHelperService: PostMetaHelperService
  ) {}
  async create(post: Post, createMetaData: CreatePostMetaDto) {
    const postMeta = new PostMeta();
    postMeta.id = this.idService.generateId();
    postMeta.key = createMetaData.key;
    postMeta.content = createMetaData.content;
    postMeta.post = post;

    const createdPostMeta = await postMeta.save();
    return createdPostMeta;
  }
  // create all the necessary seo meta tags for a given post
  async createAll(post: Post, author: User): Promise<PostMeta[]> {
    const metaTags = this.metaHelperService.createMetaTags(post, author);
    const createdMetaTags: Promise<PostMeta>[] = [];
    for (const metaTag of metaTags) {
      const createMetaData = new CreatePostMetaDto();
      createMetaData.key = metaTag.key;
      createMetaData.content = metaTag.content;
      createdMetaTags.push(this.create(post, createMetaData));
    }
    return Promise.all(createdMetaTags);
  }
}
