import { Test, TestingModule } from '@nestjs/testing';
import { TopRestaurantRepository } from './top-restaurants.repository';
import { TopRestaurantService } from './top-restaurents.service';

const mockTopRestaurantRepository = () => ({
  getTopRestaurants: jest.fn()
})


const mockTopRestaurantDto = {
  dishesHaveMoreThan: 1,
  dishesHaveLessThan: 30,
  topPrice: 20,
  lowerPrice: 1
}


describe('TopRestaurantService', () => {
  let topRestaurantService: TopRestaurantService;
  let topRestaurantRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopRestaurantService,
        { provide: TopRestaurantRepository, useFactory: mockTopRestaurantRepository },
      ],

    }).compile();

    topRestaurantService = module.get(TopRestaurantService);
    topRestaurantRepository = module.get(TopRestaurantRepository);
  });

  it('calls to get restaurants from restaurant repository and get result', async () => {
    topRestaurantRepository.getTopRestaurants.mockReturnValue('TopRestaurentObject');
    const result = await topRestaurantService.getTopRestaurant(mockTopRestaurantDto);
    expect(result).toEqual('TopRestaurentObject');
  });
});
