import { Request, Response } from "express";
import { Post } from "../entities/Post";
import AppDataSource from "../config/ormconfig";

export class PostController {
  // 게시글 생성
  static createPost = async (req: Request, res: Response) => {
    const { id, userId, boardId, categoryId, title, content, Season } =
      req.body;
    const postRepository = AppDataSource.getRepository(Post);

    const newPost = postRepository.create({
      title,
      content,
      user: { id: userId },
    });

    try {
      await postRepository.save(newPost);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: "게시글 생성 실패" });
    }
  };

  // 모든 게시글 조회
  static getAllPosts = async (req: Request, res: Response) => {
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const posts = await postRepository.find({ relations: ["author"] });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "게시글 조회 실패" });
    }
  };

  // 특정 게시글 조회
  static getPostById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne(id, { relations: ["author"] });
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      res.status(500).json({ message: "게시글 조회 실패" });
    }
  };

  // 게시글 수정
  static updatePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne(id);
      if (post) {
        post.title = title;
        post.content = content;
        await postRepository.save(post);
        res.json(post);
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      res.status(400).json({ message: "게시글 수정 실패" });
    }
  };

  // 게시글 삭제
  static deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne(id);
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