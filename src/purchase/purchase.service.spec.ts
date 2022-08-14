import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishInventory } from '../restaurents/entities/dish-inventory.entity';
import { Restaurant } from '../restaurents/entities/restaurants.entity';
import { Menu } from '../restaurents/menu/entities/menu.entity';
import { PaymentHistory } from './entities/paymentHistory.entity';
import { PurchaseService } from './purchase.service';
import { User } from './user/entities/user.entity';

describe('PurchaseService', () => {
  let purchaseService: PurchaseService;
  let purchaseRepository: Repository<PaymentHistory>;
  let userRepository: Repository<User>;
  let restaurantRepository: Repository<Restaurant>;
  let menuRepository: Repository<Menu>;
  let inventoryRepository: Repository<DishInventory>

  const PURCHASE_REPOSITORY_TOKEN = getRepositoryToken(PaymentHistory);
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const RESTAURANT_REPOSITORY_TOKEN = getRepositoryToken(Restaurant);
  const MENU_REPOSITORY_TOKEN = getRepositoryToken(Menu);
  const INVENTORY_REPOSITORY_TOKEN = getRepositoryToken(DishInventory);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseService,
        {
          provide: PURCHASE_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),

          }
        }, {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
          }
        },
        {
          provide: RESTAURANT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
          }
        },
        {
          provide: MENU_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
          }
        },
        {
          provide: INVENTORY_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
          }

        }],
    }).compile();

    purchaseService = module.get<PurchaseService>(PurchaseService);
    purchaseRepository = module.get<Repository<PaymentHistory>>(PURCHASE_REPOSITORY_TOKEN);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    restaurantRepository = module.get<Repository<Restaurant>>(RESTAURANT_REPOSITORY_TOKEN);
    menuRepository = module.get<Repository<Menu>>(MENU_REPOSITORY_TOKEN);
    inventoryRepository = module.get<Repository<DishInventory>>(INVENTORY_REPOSITORY_TOKEN)

  });

  // it('should be defined test', () => {
  // expect(purchaseService).toBeDefined();
  // });

})