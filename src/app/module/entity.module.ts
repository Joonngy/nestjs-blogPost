import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from '../../db/db.module';
import * as fs from 'fs';
import * as path from 'path';

export const ALL_ENTITIES = fs.readdirSync(path.join(path.dirname(__filename), 'entity')).map((file) => require(`./entity/${file}`).default as Type<any>);

export const ALL_SERVICES = fs
  .readdirSync(path.join(path.dirname(__filename), 'services'))
  .filter((file) => (path.extname(file) === '.js' || path.extname(file) === '.ts') && !file.endsWith('.d.ts'))
  .map((file) => import(`./services/${file}`). as Type<any>);

export const ALL_CONTROLLERS = fs
  .readdirSync(path.join(path.dirname(__filename), 'controllers'))
  .filter((file) => (path.extname(file) === '.js' || path.extname(file) === '.ts') && !file.endsWith('.d.ts'))
  .map((file) => require(`./controllers/${file}`) as Type<any>);

@Module({
  imports: [DbModule.forRoot({ entities: ALL_ENTITIES }), TypeOrmModule.forFeature([Note])],
  providers: [...ALL_SERVICES],
  controllers: [...ALL_CONTROLLERS],
  exports: [...ALL_SERVICES],
})
export class DomainModule {}
