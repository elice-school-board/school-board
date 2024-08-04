import { Request, Response } from "express";
import { Post } from "../entities/Post";
import { Comment } from "../entities/Comment";
import AppDataSource from "../database/data-source";
import { Category } from "../entities/Category";
import { Board } from "../entities/Board";
import { User } from "../entities/User";

export class PostController {
  // 게시글 생성
  static createPost = async (req: Request, res: Response) => {
    const { userId, boardId, categoryId, title, content, season, isAnonymous } =
      req.body;
    const postRepository = AppDataSource.getRepository(Post);

    // newPost 객체 생성
    const newPost = postRepository.create({
      userId,
      boardId,
      categoryId,
      title,
      content,
      season,
      isAnonymous,
    });

    try {
      // post 테이블에 newPost 저장
      const savedPost = await postRepository.save(newPost);

      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "게시글 생성 실패" });
    }
  };

  // 모든 게시글 조회
  static getAllPosts = async (req: Request, res: Response) => {
    const { sort, limit, cursor } = req.query; // 쿼리에서 sort, limit를 가져온다.
    const { boardName, categoryName } = req.body; // body에서 boardName, categoryName을 가져온다.
    const boardRepository = AppDataSource.getRepository(Board);
    const categoryRepository = AppDataSource.getRepository(Category);
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    // const user = await userRepository.findOne({ where: { id: req.user.id } });
    const user = await userRepository.findOne({
      where: { id: req.body.userId },
    });

    try {
      let order = {}; // 정렬 객체 초기화

      switch (sort) {
        // 최신순
        case "latest":
          order = { createdAt: "DESC" };
          break;

        // 오래된순

        case "oldest":
          order = { createdAt: "ASC" };
          break;

        // 좋아요순
        case "mostLikes":
          order = { likesCount: "DESC" };
          break;

        default:
          order = { createdAt: "DESC" };
      }

      const board = await boardRepository.findOne({
        where: { name: boardName },
      });

      // 존재하는 게시판인지 확인
      if (!board) {
        return res.status(404).json({ message: "게시판을 찾을 수 없습니다." });
      }

      let category = null; // category가 없는 게시판이 존재하므로 기본값은 null
      if (categoryName) {
        category = await categoryRepository.findOne({
          where: { name: categoryName },
        });

        // 카테고리 존재하는지 확인
        if (!category) {
          return res
            .status(404)
            .json({ message: "카테고리를 찾을 수 없습니다." });
        }
      }

      const whereClause: any = { boardId: board.id };

      if (category) {
        whereClause.categoryId = category.id; // whereClause에 categoryId: category.id 추가
      }

      if (cursor) {
        // 오래된순 정렬일 경우 cursor보다 더 큰(오래된) createdAt을 가져온다
        whereClause.createdAt =
          sort === "oldest" ? { $gt: cursor } : { $lt: cursor };
      }

      const posts = await postRepository.find({
        where: whereClause,
        order,
        take: Number(limit), // 쿼리를 반환할 최대 행 수
      });

      const result = posts.map((post) => {
        if (post.isAnonymous && (!user || user.role !== "teacher")) {
          return {
            ...post,
            userId: null,
            user: { id: null, name: "Anonymous" },
          };
        }
      });

      const nextCursor =
        posts.length > 0 ? posts[posts.length - 1].createdAt : null;

      res.status(200).json({ nextCursor, posts: result });
    } catch (error) {
      res.status(500).json({ message: "게시글 조회 실패" });
    }
  };

  // 특정 게시글 조회
  static getPostById = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne({ where: { id: postId } });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      res.status(500).json({ message: "게시글 조회 실패" });
    }
  };

  // 게시글 수정
  static updatePost = async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
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
