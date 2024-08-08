import { Request, Response } from 'express';
import AppDataSource from '../database/data-source';
import { Board } from '../entities/Board';

class BoardController {
    static getBoardById = async (req: Request, res: Response) => {
        const boardId = Number(req.params.id);
        const boardRepository = AppDataSource.getRepository(Board);

        try {
            // 카테고리 조회
            const board = await boardRepository.findOne({ where: { id: boardId } });

            if (board) {
                // 카테고리 이름 반환
                res.status(200).json({ name: board.name });
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

export default BoardController;
