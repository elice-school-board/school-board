import { Request, Response } from 'express';
import AppDataSource from '../database/data-source';
import { Category } from '../entities/Category';

class CategoryController {
    // 카테고리 이름 조회
    static getCategoryById = async (req: Request, res: Response) => {
        const categoryId = Number(req.params.id);
        const categoryRepository = AppDataSource.getRepository(Category);

        try {
            // 카테고리 조회
            const category = await categoryRepository.findOne({ where: { id: categoryId } });

            if (category) {
                // 카테고리 이름 반환
                res.status(200).json({ name: category.name });
            } else {
                // 카테고리가 없는 경우
                res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
            }
        } catch (error) {
            // 오류 처리
            res.status(500).json({ message: '카테고리 이름 조회 실패', error: error.message });
        }
    };
}

export default CategoryController;
