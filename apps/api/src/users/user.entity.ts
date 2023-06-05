import { Exclude, Transform } from "class-transformer";
import { censorEmail } from "src/auth/utils/censorEmail";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
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
}
