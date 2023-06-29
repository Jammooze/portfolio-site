import {
  Entity,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "../post.entity";
import { Exclude } from "class-transformer";

@Entity()
export class PostMeta extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
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
