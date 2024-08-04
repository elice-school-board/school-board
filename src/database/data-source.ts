import { config } from "dotenv";
import { DataSource } from "typeorm";
config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/**/*.ts"],
  synchronize: true,
  migrations: ["src/migration/**/*.ts"],
  migrationsTableName: "migration",
  migrationsRun: true,
  // dropSchema: true,
});

export default AppDataSource;