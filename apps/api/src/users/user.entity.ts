import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  // @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({
    length: 50,
  })
  fullName: string;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    nullable: true,
    length: 15,
  })
  mobile: string | null;

  @ApiProperty()
  @Column({
    unique: true,
    length: 50,
  })
  @Transform(({ value }: { value: string }) => censorEmail(value))
  email: string;

  @ApiProperty()
  @Column()
  isVerified: boolean;

  @ApiProperty()
  @Column()
  profileUrl: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  passwordHash: string | null;

  @ApiProperty()
  @CreateDateColumn()
  registeredAt: Date;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    type: "timestamptz",
    nullable: true,
  })
  lastLogin: Date | null;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    type: "text",
    nullable: true,
  })
  intro: string | null;

  @ApiProperty({
    nullable: true,
  })
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

  @OneToMany(() => PostComment, (postComment) => postComment.user)
  comments: PostComment[];
}
