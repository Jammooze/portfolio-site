import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Entity,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { User } from "../users/user.entity";
import { Exclude } from "class-transformer";
import { PostMeta } from "./meta/post-meta.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Post extends BaseEntity {
  @ApiProperty()
  @PrimaryColumn()
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
}
