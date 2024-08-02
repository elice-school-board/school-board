import { Request, Response } from "express";
import { Post } from "../entities/Post";
import { Comment } from "../entities/Comment";
import AppDataSource from "../config/ormconfig";
import { Category } from "../entities/Category";
import { File } from "../entities/File";

export class PostController {
  // 게시글 생성
  static createPost = async (req: Request, res: Response) => {
    const { userId, boardId, categoryId, title, content, season } = req.body;
    const postRepository = AppDataSource.getRepository(Post);
    const fileRepository = AppDataSource.getRepository(File);

    const newPost = postRepository.create({
      userId,
      boardId,
      categoryId,
      title,
      content,
      season,
    });

    try {
      const savedPost = await postRepository.save(newPost);

      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "게시글 생성 실패" });
    }
  };

  // 모든 게시글 조회
  static getAllPosts = async (req: Request, res: Response) => {
    const { sort } = req.query;
    const { categoryName } = req.body;
    const postRepository = AppDataSource.getRepository(Post);
    const commentRepository = AppDataSource.getRepository(Comment);
    const categoryRepository = AppDataSource.getRepository(Category);

    try {
      let order = {};
      switch (sort) {
        case "latest":
          order = { createdAt: "DESC" };
          break;
        case "oldest":
          order = { createdAt: "ASC" };
          break;
        case "mostLikes":
          order = { likesCount: "DESC" };
          break;
        default:
          order = { createdAt: "DESC" };
      }

      const category = await categoryRepository.findOne({
        where: { name: categoryName },
      });

      if (category) {
        const posts = await postRepository.find({
          where: { id: category?.id },
          order,
        });
        const postWithCommentCount = await Promise.all(
          posts.map(async (post) => {
            const commentCount = await commentRepository.count({
              where: { postId: post.id },
            });
            return { ...post, commentCount };
          })
        );
        res.status(200).json(postWithCommentCount);
      } else {
        res.status(500).json({ message: "카테고리가 없습니다." });
      }
    } catch (error) {
      res.status(500).json({ message: "게시글 조회 실패" });
    }
  };

  // 특정 게시글 조회
  static getPostById = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const postRepository = AppDataSource.getRepository(Post);
    const commentRepository = AppDataSource.getRepository(Comment);

    try {
      const post = await postRepository.findOne({ where: { id: postId } });
      if (post) {
        const commentCount = await commentRepository.count({
          where: { postId: post.id },
        });
        const postWithCommentCount = { ...post, commentCount };
        res.status(200).json(postWithCommentCount);
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      res.status(500).json({ message: "게시글 조회 실패" });
    }
  };

  // 게시글 수정
  static updatePost = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const { title, content, season } = req.body;
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne({ where: { id: postId } });
      if (post) {
        post.title = title;
        post.content = content;
        post.season = season;
        await postRepository.save(post);
        res.json(post);
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "게시글 수정 실패" });
    }
  };

  // 게시글 삭제
  static deletePost = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne({ where: { id: postId } });
      if (post) {
        await postRepository.remove(post);
        res.status(204).send();
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      res.status(500).json({ message: "게시글 삭제 실패" });
    }
  };
}
