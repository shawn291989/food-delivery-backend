import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from './menu.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MenuRepository
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule { }
