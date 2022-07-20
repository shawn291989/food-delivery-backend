import { Test, TestingModule } from '@nestjs/testing';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';

const mockMenuRepository = () => ({
  createMenu: jest.fn(),
})
const mockRestaurantId = '08ff6a8e-76bd-4f27-850c-b915952d6099'
const mockMenuDto = {
  menus: []
}


describe('MenuService', () => {
  let menuService: MenuService;
  let menuRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MenuService,
        { provide: MenuRepository, useFactory: mockMenuRepository },
      ],

    }).compile();

    menuService = module.get(MenuService);
    menuRepository = module.get(MenuRepository);
  });

  it('calls to create menu from menu repository and get newly created result', async () => {
    menuRepository.createMenu.mockReturnValue('MenuCreated');
    const result = await menuService.create(mockRestaurantId, mockMenuDto);
    expect(result).toEqual('MenuCreated');
  });
});
