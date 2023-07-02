import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { User } from "../../users/user.entity";
import { Exclude } from "class-transformer";
import { PostMeta } from "./postMeta.entity";
import { ApiProperty } from "@nestjs/swagger";
import { PostComment } from "./postComment.entity";

@Entity()
export class Post extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: string;

  @ApiProperty()
  @Column({
    length: 75,
  })
  title: string;

  @Column("bigint")
  @Exclude()
  userId: string;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    length: 100,
    nullable: true,
  })
  metaTitle: string | null;

  @ApiProperty()
  @Column({
    length: 100,
  })
  slug: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  @Exclude()
  slugId: string;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    type: "text",
    nullable: true,
  })
  summary: string | null;

  @ApiProperty()
  @Column()
  published: boolean;

  @ApiProperty()
  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @ApiProperty({
    nullable: true,
  })
  @UpdateDateColumn({
    type: "timestamptz",
    nullable: true,
  })
  updatedAt: Date | null;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    type: "timestamptz",
  })
  publishedAt: Date | null;

  @ApiProperty()
  @Column({
    type: "text",
  })
  content: string;

  @OneToMany(() => PostMeta, (postMeta) => postMeta.post)
  @Exclude()
  metas: PostMeta[];

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  comments: PostComment[];

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn({
    referencedColumnName: "id",
    name: "userId",
  })
  @Exclude()
  user: User;

  @ManyToMany(() => User, (user) => user.heartedPosts)
  heartedUsers: User[];

  commentCount: number;
  heartCount: number;
}
