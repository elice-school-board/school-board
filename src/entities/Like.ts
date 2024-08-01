import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterRemove,
  BeforeInsert,
  Unique,
} from "typeorm";
import AppDataSource from "../config/ormconfig";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
@Unique(["userId", "postId"])
@Unique(["userId", "commentId"])
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ nullable: true })
  postId!: number;

  @Column({ nullable: true })
  commentId!: number;

  @BeforeInsert()
  validateFileds() {
    if (this.postId === null && this.commentId === null) {
      throw new Error("Ether postId or commentId must be provided.");
    }
    if (this.postId !== null && this.commentId !== null) {
      throw new Error("Only one of postId or commentId can be provided.");
    }
  }

  @AfterInsert()
  async updateLikesCount() {
    if (this.postId !== null) {
      const postRepository = AppDataSource.getRepository(Post);
      const post = await postRepository.findOne({
        where: { id: this.postId },
      });
      if (post) {
        post.likesCount += 1;
        await postRepository.save(post);
      }
    } else if (this.commentId !== null) {
      const commentRepository = AppDataSource.getRepository(Comment);
      const comment = await commentRepository.findOne({
        where: { id: this.commentId },
      });
      if (comment) {
        comment.likesCount += 1;
        await commentRepository.save(comment);
      }
    }
  }

  @AfterRemove()
  async decreaseLikesCount() {
    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOne({
      where: { id: this.postId },
    });
    if (post) {
      post.likesCount -= 1;
      await postRepository.save(post);
    } else if (this.commentId !== null) {
      const commentRepository = AppDataSource.getRepository(Comment);
      const comment = await commentRepository.findOne({
        where: { id: this.commentId },
      });
      if (comment) {
        comment.likesCount -= 1;
        await commentRepository.save(comment);
      }
    }
  }
}
