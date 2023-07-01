import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "../../users/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class PostComment extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: string;

  @Column()
  @Exclude()
  postId: string;

  @Column()
  @Exclude()
  userId: string;

  @Column({ nullable: true })
  @Exclude()
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
  @Exclude()
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

  @ManyToMany(() => User, (user) => user.heartedComments)
  @JoinTable({
    name: "user_hearted_comment",
    joinColumns: [
      {
        name: "userId",
        referencedColumnName: "id",
      },
    ],
    inverseJoinColumns: [
      {
        name: "commentId",
        referencedColumnName: "id",
      },
    ],
  })
  heartedUsers: User[];

  @Column()
  @Exclude()
  published: boolean;

  @Column({
    default: false,
  })
  edited: boolean;

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
    length: 750,
  })
  content: string;
}
