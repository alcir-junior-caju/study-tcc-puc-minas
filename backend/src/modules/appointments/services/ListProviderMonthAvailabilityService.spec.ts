import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 9, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 10, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 11, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 12, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 13, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 14, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 15, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 16, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 23, 17, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user',
      date: new Date(2021, 5, 24, 8, 0, 0)
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId: 'user',
      year: 2021,
      month: 6
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 23, available: false },
        { day: 24, available: true }
      ])
    );
  });
});
