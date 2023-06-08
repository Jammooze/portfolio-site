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
import { User } from "../../users/user.entity";
import { Exclude } from "class-transformer";
import { PostMeta } from "./post-meta.entity";
// import { PostMeta } from "./meta.entity";

@Entity()
export class Post extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 75,
  })
  title: string;

  @Column("bigint")
  @Exclude()
  userId: string;

  @Column({
    length: 100,
    nullable: true,
  })
  metaTitle: string | null;

  @Column({
    length: 100,
  })
  slug: string;

  @Column({
    type: "text",
    nullable: true,
  })
  summary: string | null;

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
  })
  publishedAt: Date | null;

  @Column({
    type: "text",
  })
  content: string;

  @OneToMany(() => PostMeta, (postMeta) => postMeta.post)
  metas: PostMeta[];

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn({
    referencedColumnName: "id",
    name: "userId",
  })
  user: User;
}
