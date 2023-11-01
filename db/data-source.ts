import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  database: 'blog_test',
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  logging: true,
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
