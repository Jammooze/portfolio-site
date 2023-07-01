import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Post as PostEntity } from "src/post/entities";
import { User } from "src/users/dtos/user.dto";

export class Post {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  metaTitle: string;
  @ApiProperty()
  slug: string;
  @ApiProperty({
    nullable: true,
  })
  summary: string | null;
  @ApiProperty({
    nullable: true,
  })
  createdAt: Date | null;

  @ApiPropertyOptional()
  author?: User;

  @ApiProperty({
    nullable: true,
  })
  updatedAt: Date | null;
  @ApiProperty()
  content: string;
  @ApiProperty()
  commentCount: number;

  static from(record: PostEntity) {
    const post = new Post();

    post.id = record.id;
    post.title = record.title;
    post.metaTitle = record.metaTitle;
    post.slug = record.slug;
    post.summary = record.summary;
    post.createdAt = record.createdAt;
    post.updatedAt = record.updatedAt;
    post.content = record.content;
    post.commentCount = record.commentCount;

    if (record.user) {
      post.author = User.from(record.user);
    }

    return post;
  }
}
