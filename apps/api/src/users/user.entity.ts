import { Exclude, Transform } from "class-transformer";
import {
  Entity,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Post } from "../post/post.entity";
import { censorEmail } from "../auth/utils/censorEmail";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
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

  // The brief introduction of the Author to be displayed on each post.
  @Column({
    type: "text",
    nullable: true,
  })
  intro: string | null;

  // The author details to be displayed on the Author Page.
  @Column({
    type: "text",
    nullable: true,
  })
  profile: string | null;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
