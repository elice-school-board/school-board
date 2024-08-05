import { Request, Response } from 'express';
import { Post } from '../entities/Post';
import AppDataSource from '../database/data-source';

export class CarouselController {
    // carousel에 표시할 featured 게시글 설정하기
    static featurePost = async (req: Request, res: Response) => {
        const { boardId, categoryId, postId } = req.body;
        const postRepository = AppDataSource.getRepository(Post);

        try {
            // Post 데이터를 조회할 조건 객체를 만듦
            const conditions = {
                id: Number(postId),
                boardId: Number(boardId),
                categoryId,
            };

            // categoryId 존재여부 확인. 있으면 String에서 Number로 변경
            if (categoryId !== undefined && categoryId !== null) {
                conditions.categoryId = Number(categoryId);
            }

            const post = await postRepository.findOne({ where: conditions });

            if (post) {
                post.isCarousel = true;
                await postRepository.save(post);
                res.json({ message: '게시글이 캐러셀에 올려졌습니다', post });
            } else {
                res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: '게시글을 캐러셀 올리기 실패했습니다.' });
        }
    };

    // carousel에 표시할 featured 게시글 해제하기
    static unfeaturePost = async (req: Request, res: Response) => {
        const { boardId, categoryId, postId } = req.body;
        const postRepository = AppDataSource.getRepository(Post);

        try {
            const conditions = {
                id: parseInt(postId),
                boardId: parseInt(boardId),
                categoryId,
            };

            if (categoryId !== undefined && categoryId !== null) {
                conditions.categoryId = parseInt(categoryId);
            }

            const post = await postRepository.findOne({ where: conditions });

            if (post) {
                post.isCarousel = false;
                await postRepository.save(post);
                res.json({ message: '게시글이 캐러셀에서 내려졌습니다', post });
            } else {
                res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: '게시글을 캐러셀에서 내리기 실패' });
        }
    };

    // 캐러셀에 표시할 featured 게시글을 가져오는 경로
    static getFeaturedPosts = async (req: Request, res: Response) => {
        const postRepository = AppDataSource.getRepository(Post);

        try {
            const featuredPosts = await postRepository.find({
                where: { isCarousel: true },
                order: { createdAt: 'DESC' },
            });
            res.status(200).json(featuredPosts);
        } catch (error) {
            res.status(500).json({ message: '캐러셀 게시글들 조회 실패' });
        }
    };
}
