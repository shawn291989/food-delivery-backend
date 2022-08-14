import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../purchase/user/user.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';


describe('MenuController', () => {

  const mockMenuService = {
    create: jest.fn(dto => {
      return {
        restaurantId: "be124482-189d-4f2b-a16e-a8fd24d477c3",
        menus: [
          {
            "uuid": "cd31ba3c-5021-4f9b-bb57-9f3b94312875",
            "dishName": "Watercress",
            "price": 10.25,
            "inventory": 30
          }]
      }
    })

  };
  const mockRestaurantId = "08ff6a8e-76bd-4f27-850c-b915952d6099"
  const mockMenuDto = "example"

  let menuController: MenuController;
  let menuRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [
        MenuService,
      ],

    })
      .overrideProvider(UserService)
      .useValue(mockMenuService)
      .compile();

    menuController = module.get<MenuController>(MenuController);
    // menuRepository = module.get(MenuRepository);
  });

  it('calls to create menu from menu service and get newly created result', async () => //menuController.create.mockReturnValue('MenuCreated');
    //const result = await menuService.create(mockRestaurantId, mockMenuDto);
    //menuController.create.mockReturnValue('MenuCreated');
    //const result = await menuService.create(mockRestaurantId, mockMenuDto);
    expect(menuController.create(mockRestaurantId, mockMenuDto)).toEqual({
      restaurantId: "be124482-189d-4f2b-a16e-a8fd24d477c3",
      menus: [
        {
          "uuid": "cd31ba3c-5021-4f9b-bb57-9f3b94312875",
          "dishName": "Watercress",
          "price": 10.25,
          "inventory": 30
        }]
    })
  )
});
