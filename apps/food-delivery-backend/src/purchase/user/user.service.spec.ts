import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  removeUser: jest.fn(),
})
const mockRestaurantId = '08ff6a8e-76bd-4f27-850c-b915952d6099'
const mockUserDto = {
  name: 'abc',
  cashBalance: 100
}

const mockRemoveUserDto = {
  userId: 'abc123',
}



describe('UserService', () => {
  let userService: UserService;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],

    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(UserRepository);
  });

  it('calls create user from user repository and get result', async () => {
    userRepository.createUser.mockReturnValue('UserCreated');
    const result = await userService.create(mockUserDto);
    expect(result).toEqual('UserCreated');
  });

  it('calls soft delete user from user repository and get result', async () => {
    userRepository.removeUser.mockReturnValue('UserRemoved');
    const result = await userService.removeUser(mockRemoveUserDto);
    expect(result).toEqual('UserRemoved');
  });
});
