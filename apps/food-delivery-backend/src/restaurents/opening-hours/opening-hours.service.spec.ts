import { Test, TestingModule } from '@nestjs/testing';
import { OpeningHoursRepository } from './opening-hours.repository';
import { OpeningHoursService } from './opening-hours.service';

const mockOpeningHoursRepository = () => ({
  createOpeningHours: jest.fn(),
})

const mockRestaurantId = 'someId123'

const mockOpeningHoursDto = {
  openingHours: []
}


describe('OpeningHoursService', () => {
  let openingHoursService: OpeningHoursService;
  let openingHoursRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OpeningHoursService,
        { provide: OpeningHoursRepository, useFactory: mockOpeningHoursRepository },
      ],

    }).compile();

    openingHoursService = module.get(OpeningHoursService);
    openingHoursRepository = module.get(OpeningHoursRepository);
  });

  it('calls to create OpeningHours with OpeningHours repository and get newly created result', async () => {
    openingHoursRepository.createOpeningHours.mockReturnValue('OpeningHoursCreated');
    const result = await openingHoursService.create(mockRestaurantId, mockOpeningHoursDto);
    expect(result).toEqual('OpeningHoursCreated');
  });
});
