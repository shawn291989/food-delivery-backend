import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
const configs: TypeOrmModuleOptions =
{
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['apps/food-delivery-backend/src/**/*.entity{.ts,.js}'],
  migrations: ['apps/database/migrations/*{.ts,.js}'],
  //synchronize: true,
};

module.exports = configs;
