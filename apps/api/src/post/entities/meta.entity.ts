// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { Post } from "./Post.entity";

// @Entity()
// export class PostMeta {
//   @PrimaryGeneratedColumn()
//   id: string;

//   @Column("bigint")
//   postId: string;

//   @ManyToOne(() => Post, (post) => post.meta, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn({
//     referencedColumnName: "id",
//     name: "postId",
//   })
//   post: Post;

//   @Column({
//     length: 50,
//   })
//   key: string;

//   @Column("text")
//   content: string;
// }
