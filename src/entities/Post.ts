import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  boardId: number;

  @Column({ nullable: true })
  categoryId?: number;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  season?: string;

  @Column({ default: 0 })
  likesCount: number; // 좋아요 수

  @Column({ default: false })
  isCarousel: boolean; // 캐러셀에 올릴지 여부
}
