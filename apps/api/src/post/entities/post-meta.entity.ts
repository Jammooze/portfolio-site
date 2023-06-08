import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class PostMeta extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  postId: string;

  @ManyToOne(() => Post, (post) => post.metas)
  @JoinColumn([
    {
      referencedColumnName: "id",
      name: "postId",
    },
  ])
  post: Post;

  @Column({
    length: 50,
  })
  key: string;

  @Column()
  content: string;
}
