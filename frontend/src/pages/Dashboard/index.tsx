import React, { useState, useEffect, useMemo } from 'react';
import { FiClock, FiUser } from 'react-icons/fi';

import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-day-picker/lib/style.css';
import api from '@services/api';

import { useAuth } from '@hooks/auth';
import { useDatePicker } from '@hooks/datePicker';

import DatePicker from '@components/DatePicker';
import Header from '@components/Header';

import checkImageFaker from '@utils/checkImageFaker';

import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
  Section,
  Appointment
} from './styles';

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
    avatar: string;
  };
}

const Dashboard: React.FC = () => {
  const { selectedDate, setSelectedDate, currentMonth } = useDatePicker();
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const {
    user: { id }
  } = useAuth();

  useEffect(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  useEffect(() => {
    api
      .get(`providers/${id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1
        }
      })
      .then(response => setMonthAvailability(response.data));
  }, [currentMonth, id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm')
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(({ date }) => {
      return parseISO(date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(({ date }) => {
      return parseISO(date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date())
    );
  }, [appointments]);

  return (
    <Container>
      <Header />
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                {nextAppointment.user.avatarUrl ? (
                  <img
                    src={checkImageFaker({
                      id: nextAppointment.user.id,
                      avatarUrl: nextAppointment.user.avatarUrl,
                      avatar: nextAppointment.user.avatar
                    }).toString()}
                    alt={nextAppointment.user.name}
                  />
                ) : (
                  <FiUser size={25} />
                )}

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock size={20} />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período!</p>
            )}

            {morningAppointments.map(
              ({
                id,
                hourFormatted,
                user: { avatarUrl, name, id: userId, avatar }
              }) => (
                <Appointment key={id}>
                  <span>
                    <FiClock size={20} />
                    {hourFormatted}
                  </span>

                  <div>
                    {avatarUrl ? (
                      <img
                        src={checkImageFaker({
                          id: userId,
                          avatarUrl,
                          avatar
                        }).toString()}
                        alt={name}
                      />
                    ) : (
                      <FiUser size={25} />
                    )}
                    <strong>{name}</strong>
                  </div>
                </Appointment>
              )
            )}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período!</p>
            )}

            {afternoonAppointments.map(
              ({
                id,
                hourFormatted,
                user: { avatarUrl, name, id: userId, avatar }
              }) => (
                <Appointment key={id}>
                  <span>
                    <FiClock size={20} />
                    {hourFormatted}
                  </span>

                  <div>
                    {avatarUrl ? (
                      <img
                        src={checkImageFaker({
                          id: userId,
                          avatarUrl,
                          avatar
                        }).toString()}
                        alt={name}
                      />
                    ) : (
                      <FiUser size={25} />
                    )}
                    <strong>{name}</strong>
                  </div>
                </Appointment>
              )
            )}
          </Section>
        </Schedule>

        <Calendar>
          <DatePicker
            daysOfWeek={[0, 6]}
            availabilityMonth={monthAvailability}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
