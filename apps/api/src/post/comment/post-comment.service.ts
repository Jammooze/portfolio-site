import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PostComment } from "./post-comment.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>
  ) {}
}
