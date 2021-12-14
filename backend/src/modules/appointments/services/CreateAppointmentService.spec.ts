import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2021, 0, 10, 13),
      userId: 'user-id',
      providerId: 'provider-id'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create a new appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 5, 28, 10);
    await createAppointmentService.execute({
      date: appointmentDate,
      userId: 'user-id',
      providerId: 'provider-id'
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        userId: 'user-id',
        providerId: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 0, 10, 11),
        userId: 'user-id',
        providerId: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 0, 10, 13),
        userId: 'user-id',
        providerId: 'user-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside the available hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 0, 11, 7),
        userId: 'user-id',
        providerId: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 0, 11, 18),
        userId: 'user-id',
        providerId: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
