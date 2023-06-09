import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Post } from "../post.entity";
import { Exclude } from "class-transformer";

@Entity()
export class PostMeta extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Exclude()
  postId: string;

  @ManyToOne(() => Post, (post) => post.metas)
  @JoinColumn([
    {
      referencedColumnName: "id",
      name: "postId",
    },
  ])
  @Exclude()
  post: Post;

  @Column({
    length: 50,
  })
  key: string;

  @Column()
  content: string;
}
