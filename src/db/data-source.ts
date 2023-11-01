import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config({ path: `src/config/.env.development` });

export const dataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  logging: true,
  migrationsRun: process.env.NODE_ENV === 'production',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
