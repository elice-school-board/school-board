import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? './prod.env' : '././env' });

export default {
    apps: [
        {
            name: 'school-board', // 애플리케이션 이름
            script: 'ts-node', // TypeScript 파일을 실행하기 위해 ts-node 사용
            args: 'src/index.ts', // 시작할 파일
            interpreter: 'node', // node 인터프리터 사용
            instances: 1, // 클러스터 모드 사용 시 인스턴스 수 (기본값: 1)
            autorestart: true, // 자동 재시작 설정
            watch: false, // 파일 변경 시 자동 재시작 (배포환경에서는 false)
            max_memory_restart: '1G', // 메모리 사용이 1GB를 넘으면 재시작
            env: {
                NODE_ENV: process.env.NODE_ENV || 'development',
                DB_HOST: process.env.DB_HOST,
                DB_PORT: process.env.DB_PORT,
                DB_USERNAME: process.env.DB_USERNAME,
                DB_PASSWORD: process.env.DB_PASSWORD,
                DB_DATABASE: process.env.DB_DATABASE,
                AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
                AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
                AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
                AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
                JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
                JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
                EMAIL_USER: process.env.EMAIL_USER,
                EMAIL_PASS: process.env.EMAIL_PASS,
            },
        },
    ],
};
