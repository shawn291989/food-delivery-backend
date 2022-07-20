import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RestaurantRepository } from './restaurants.repository';
import { RestaurantService } from './restaurants.service';

const mockRestaurantRepository = () => ({
  getRestaurants: jest.fn(),
  createRestaurants: jest.fn()
});

const mockErrorRestaurantData = {
  RestaurantName: []
};

const mockRestaurantData = {
  RestaurantName: ['a', 'b', 'c']
};
const mockRestaurantDto = {
  dateTime: '2022-07-06 13:30:00',
  qDishName: 'w',
  qRestaurantName: ''
}
const mockCreateRestaurantDto = {
  cashBalance: 1234,
  restaurantName: 'test'
}

const mockDateTime = '2022-07-06 13:30:00';

describe('RestaurantService', () => {
  let restaurantService: RestaurantService;
  let restaurantRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RestaurantService,
        { provide: RestaurantRepository, useFactory: mockRestaurantRepository },
        //{ provide: getModelToken(Cat.name), useValue: jest.fn() }
      ],

    }).compile();

    restaurantService = module.get(RestaurantService);
    restaurantRepository = module.get(RestaurantRepository);
  });

  it('calls to get restaurants from restaurant repository and get result', async () => {
    restaurantRepository.getRestaurants.mockResolvedValue(mockRestaurantData);
    const result = await restaurantService.getRestaurants(mockRestaurantDto);
    expect(result).toEqual(mockRestaurantData);
  });

  it('calls to create Restaurants with Restaurant Repository and get newly created result', async () => {
    restaurantRepository.createRestaurants.mockReturnValue('RestaurantObject');
    const result = await restaurantService.createRestaurants(mockCreateRestaurantDto);
    expect(result).toEqual('RestaurantObject');
  });

  it('calls to get Restaurants from Restaurant Repository and handle error', async () => {
    restaurantRepository.getRestaurants.mockResolvedValue(mockErrorRestaurantData);
    expect(restaurantService.getRestaurants(mockRestaurantDto)).rejects.toThrow(NotFoundException);
  });

  it('wibb be passed', async () => {
    const result = true;
    expect(true).toEqual(true);
  });
});
