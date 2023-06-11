import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  // JoinColumn,
  // ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "../post.entity";
import { User } from "../../users/user.entity";

@Entity()
export class PostComment extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  postId: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  parentId: string | null;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    {
      referencedColumnName: "id",
      name: "postId",
    },
  ])
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    {
      referencedColumnName: "id",
      name: "userId",
    },
  ])
  user: User;

  @ManyToOne(() => PostComment, (postComment) => postComment.comments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn({
    referencedColumnName: "id",
    name: "parentId",
  })
  parent: PostComment;

  @OneToMany(() => PostComment, (postComment) => postComment.parent)
  comments: PostComment[];

  // @Column({
  //   length: 100,
  // })
  // title: string;

  @Column()
  published: boolean;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    nullable: true,
  })
  updatedAt: Date | null;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  publishedAt: Date | null;

  @Column({
    length: 250,
  })
  content: string;
}
