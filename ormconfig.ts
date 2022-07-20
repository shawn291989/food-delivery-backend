// import './src/boilerplate.polyfill';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
const configs: TypeOrmModuleOptions =
{
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: ['src/**/*.entity{.ts,.js}'],

  //entities: [__dirname + '/../food-delivery-backend/src/**/*.entity{.ts,.js}'],
  entities: ['apps/food-delivery-backend/src/**/*.entity{.ts,.js}'],
  // entities: ['apps/dist/src/entity/*{.js,.ts}'],
  migrations: ['apps/database/migrations/*{.ts,.js}'],
  //seeds: ['apps/database/seeds/**/*{.ts,.js}'],
  //factories: ['apps/database/factories/**/*{.ts,.js}'],
  synchronize: true,
};

module.exports = configs;
