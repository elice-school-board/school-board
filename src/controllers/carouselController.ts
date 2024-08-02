import { Request, Response } from "express";
import { Post } from "../entities/Post";
import AppDataSource from "../config/ormconfig";

export class CarouselController {
  // carousel에 표시할 featured 게시글 설정하기
  static featurePost = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne({ where: { id: postId } });
      if (post) {
        post.isCarousel = true;
        await postRepository.save(post);
        res.json({ message: "게시글이 캐러셀에 올려졌습니다", post });
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "게시글을 캐러셀 올리기 실패" });
    }
  };

  // carousel에 표시할 featured 게시글 해제하기
  static unfeaturePost = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const post = await postRepository.findOne({ where: { id: postId } });
      if (post) {
        post.isCarousel = false;
        await postRepository.save(post);
        res.json({ message: "게시글이 캐러셀에서 내려졌습니다", post });
      } else {
        res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "게시글을 캐러셀에서 내리기 실패" });
    }
  };

  // 캐러셀에 표시할 featured 게시글을 가져오는 경로
  static getFeaturedPosts = async (req: Request, res: Response) => {
    const postRepository = AppDataSource.getRepository(Post);

    try {
      const featuredPosts = await postRepository.find({
        where: { isCarousel: true },
      });
      res.status(200).json(featuredPosts);
    } catch (error) {
      res.status(500).json({ message: "캐러셀 게시글들 조회 실패" });
    }
  };
}
