import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { FiArrowLeft, FiArrowRight, FiUser } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';

import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '@services/api';

import { useDatePicker } from '@hooks/datePicker';
import { useToast } from '@hooks/toast';

import 'react-day-picker/lib/style.css';

import DatePicker from '@components/DatePicker';
import Header from '@components/Header';

import checkImageFaker from '@utils/checkImageFaker';

import {
  Container,
  Content,
  Calendar,
  Schedule,
  ProviderList,
  List,
  Carroussel,
  Section,
  HourAvailable,
  ContainerHours,
  ScheduleButton
} from './styles';

interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
  avatar: string;
}

interface RepositoryParams {
  providerId: string;
}

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface DayAvailability {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { addToast } = useToast();
  const { selectedDate, setSelectedDate, currentMonth } = useDatePicker();
  const providerListRef = useRef<HTMLDivElement>(null);
  const { params } = useRouteMatch<RepositoryParams>();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(params.providerId);
  const [selectedHour, setSelectedHour] = useState(0);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);
  const [dayAvailability, setDayMonthAvailability] = useState<
    DayAvailability[]
  >([]);

  useEffect(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  useEffect(() => {
    api.get('providers').then(response => setProviders(response.data));
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleHorizontalScroll = useCallback((scrollOffset: number) => {
    if (providerListRef.current) {
      providerListRef.current.scrollLeft += scrollOffset;
    }
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1
        }
      })
      .then(response => setMonthAvailability(response.data));
  }, [currentMonth, selectedProvider]);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then(response => setDayMonthAvailability(response.data));
  }, [selectedDate, selectedProvider]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningDayAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        };
      });
  }, [dayAvailability]);

  const afternoonDayAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        };
      });
  }, [dayAvailability]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        providerId: selectedProvider,
        date
      });

      addToast({
        type: 'success',
        title: 'Agendamento criado',
        description: 'Você criou um novo agendamento com sucesso.'
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar agendamento',
        description: 'Ocorreu algum erro ao tentar criar um agendamento.'
      });
    }
  }, [addToast, selectedProvider, selectedHour, selectedDate]);

  return (
    <Container>
      <Header />

      <Carroussel>
        <FiArrowLeft onClick={() => handleHorizontalScroll(-150)} />

        <ProviderList ref={providerListRef}>
          {providers.map(({ id, name, avatarUrl, avatar }) => {
            const getAvatar = checkImageFaker({ id, avatarUrl, avatar });
            const isChecked = selectedProvider === id;

            return (
              <List
                to={`/create-appointment/${id}`}
                key={id}
                selectedprovider={Number(!!isChecked)}
                onClick={() => handleSelectProvider(id)}
              >
                {getAvatar ? (
                  <img src={getAvatar.toString()} alt={name} />
                ) : (
                  <FiUser size={30} />
                )}

                <strong>{name}</strong>
              </List>
            );
          })}
        </ProviderList>

        <FiArrowRight onClick={() => handleHorizontalScroll(150)} />
      </Carroussel>

      <Content>
        <Schedule>
          <Section>
            <h1>Horários disponíveis</h1>
            <p>
              {isToday(selectedDate) && <span>Hoje</span>}
              <span>{selectedDateAsText}</span>
              <span>{selectedWeekDay}</span>
            </p>
            <strong>Manhã</strong>

            {morningDayAvailability.length === 0 && (
              <p>Nenhum agendamento neste período!</p>
            )}

            <ContainerHours>
              {morningDayAvailability.map(
                ({ hour, hourFormatted, available }) => {
                  const isSelected = selectedHour === hour;

                  return (
                    <HourAvailable
                      key={hour}
                      available={Number(!!available)}
                      onClick={() => handleSelectHour(hour)}
                      selected={Number(!!isSelected)}
                    >
                      {hourFormatted}
                    </HourAvailable>
                  );
                }
              )}
            </ContainerHours>
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonDayAvailability.length === 0 && (
              <p>Nenhum agendamento neste período!</p>
            )}

            <ContainerHours>
              {afternoonDayAvailability.map(
                ({ hour, hourFormatted, available }) => {
                  const isSelected = selectedHour === hour;

                  return (
                    <HourAvailable
                      key={hour}
                      available={Number(!!available)}
                      onClick={() => handleSelectHour(hour)}
                      selected={Number(!!isSelected)}
                    >
                      {hourFormatted}
                    </HourAvailable>
                  );
                }
              )}
            </ContainerHours>
          </Section>

          <ScheduleButton onClick={() => handleCreateAppointment()}>
            Agendar
          </ScheduleButton>
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

export default CreateAppointment;
