import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';

const mockRestaurantId = '08ff6a8e-76bd-4f27-850c-b915952d6099'
const mockMenuDto = {
  menus: []
}


describe('MenuService', () => {
  const mockMenuRepository = () => ({
    createMenu: jest.fn(),
  })
  let menuService: MenuService;
  let menuRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Menu])],
      providers: [
        MenuService,

        { provide: MenuRepository, useValue: jest.fn() },
      ],

    })
      //.overrideProvider(MenuService)
      //.useValue(mockMenuRepository)
      .compile();

    menuService = module.get(MenuService);
    menuRepository = module.get(MenuRepository);
  });

  it('calls to create menu from menu repository and get newly created result', async () => {
    menuRepository.createMenu.mockReturnValue('MenuCreated');
    const result = await menuService.create(mockRestaurantId, mockMenuDto);
    expect(result).toEqual('MenuCreated');
  });
});
