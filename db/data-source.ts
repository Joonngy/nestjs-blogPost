import { DataSource, DataSourceOptions } from 'typeorm';
// import * as path from 'path';

export const dataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  database: 'blog_test',
  // entities: [path.join(__dirname, '..', '**/*.entity{.ts,.js}')],
  //   migrations: [path.join(__dirname, '..', 'db/migrations/*{.ts,.js}')],
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  logging: true,
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

// migrations: [path.join(__dirname + '..', '/migrations/*.ts')],
// entities: [__dirname + '../*.entity.{js,ts}'],
// entities: ['src/**/*.entity.{ts,js}'],
// entities: ['dist/**/*.entity.{ts,js}'],
// entities: [BlogEntity, CategoryEntity, UserEntity],

// type: 'postgres',
// host: process.env.DB_HOST,
// port: parseInt(process.env.DB_PORT),
// username: process.env.DB_USERNAME,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME,
// migrations: [path.join(__dirname, '..', 'migrations/*{.ts,.js}')],
// entities: [path.join(__dirname, '..', '**/*.entity{.ts,.js}')],
// synchronize: false,
// logging: true,
