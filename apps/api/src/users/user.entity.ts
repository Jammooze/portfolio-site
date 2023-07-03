import {
  Entity,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Exclude, Transform } from "class-transformer";
import { censorEmail } from "../auth/utils/censorEmail";
import { Post } from "../post/entities/post.entity";
import { PostComment } from "../post/entities/postComment.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  // @PrimaryColumn()
  id: string;

  @Column({
    length: 50,
  })
  fullName: string;

  @Column({
    nullable: true,
    length: 15,
  })
  mobile: string | null;

  @Column({
    unique: true,
    length: 50,
  })
  @Transform(({ value }: { value: string }) => censorEmail(value))
  email: string;

  @Column()
  isVerified: boolean;

  @Column()
  profileUrl: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  passwordHash: string | null;

  @CreateDateColumn()
  registeredAt: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  lastLogin: Date | null;

  @Column({
    type: "text",
    nullable: true,
  })
  intro: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  profile: string | null;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => PostComment, (postComment) => postComment.heartedUsers)
  heartedComments: PostComment[];

  @ManyToMany(() => Post, (post) => post.heartedUsers)
  @JoinTable({
    name: "user_hearted_post",
    joinColumns: [
      {
        name: "userId",
        referencedColumnName: "id",
      },
    ],
    inverseJoinColumns: [
      {
        name: "postId",
        referencedColumnName: "id",
      },
    ],
  })
  heartedPosts: Post[];

  @ManyToMany(() => User, (user) => user.followingUsers)
  @JoinTable({
    name: "user_follow",
    joinColumns: [
      {
        name: "followerId",
        referencedColumnName: "id",
      },
    ],
    inverseJoinColumns: [
      {
        name: "followingId",
        referencedColumnName: "id",
      },
    ],
  })
  followedUsers: User[];

  @ManyToMany(() => User, (user) => user.followedUsers)
  followingUsers: User[];

  @OneToMany(() => PostComment, (postComment) => postComment.user)
  comments: PostComment[];

  followingCount: number;
  followerCount: number;
}
