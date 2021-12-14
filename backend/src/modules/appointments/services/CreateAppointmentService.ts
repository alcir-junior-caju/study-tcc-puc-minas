import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequestDTO {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  private notificationsRepository: INotificationsRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    notificationsRepository: INotificationsRepository,
    @inject('CacheProvider') cacheProvider: ICacheProvider
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute({
    providerId,
    userId,
    date
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError({
        message: "You can't create an appointment on a past date!"
      });

    if (userId === providerId)
      throw new AppError({
        message: "You can't create an appointment with yourself!"
      });

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError({
        message: "You can't create an appointment outside the available hours!"
      });

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      providerId
    );

    if (findAppointmentInSameDate) {
      throw new AppError({ message: 'This appointment is alredy booked!' });
    }

    const appointment = this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'hs'");

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para dia ${dateFormatted}`
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${providerId}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    );

    return appointment;
  }
}

export default CreateAppointmentService;
