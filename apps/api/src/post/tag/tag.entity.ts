import {
  Column,
  Entity,
  //   JoinTable,
  //   ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class PostTag {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: string;

  @Column({
    length: 75,
  })
  title: string;

  @Column({
    length: 100,
    nullable: true,
  })
  metaTitle: string;

  @Column({
    length: 100,
  })
  slug: string;

  @Column({
    type: "text",
  })
  content: string;
}
