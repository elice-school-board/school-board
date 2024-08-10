module.exports = {
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
                // 공통 환경변수 설정
                NODE_ENV: 'production',
            },
            env_production: {
                // production 모드의 추가 설정
                NODE_ENV: 'production',
            },
        },
    ],
};
