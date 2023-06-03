import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: string;

  @Column({
    nullable: true,
    length: 50,
  })
  firstName: string | null;

  @Column({
    nullable: true,
    length: 50,
  })
  middleName: string | null;

  @Column({
    nullable: true,
    length: 50,
  })
  lastName: string | null;

  @Column({
    nullable: true,
    length: 15,
  })
  mobile: string | null;

  @Column({
    unique: true,
    length: 50,
  })
  email: string;

  @Column()
  passwordHash: string;

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
}
