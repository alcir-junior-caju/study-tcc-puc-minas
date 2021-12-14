import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { useDatePicker } from '@hooks/datePicker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface DatePickerProps {
  daysOfWeek: Array<number>;
  availabilityMonth: Array<MonthAvailability>;
}

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];
const FROM_MONTH = new Date();
const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const DatePicker: React.FC<DatePickerProps> = ({
  daysOfWeek,
  availabilityMonth
}) => {
  const {
    selectedDate,
    setSelectedDate,
    currentMonth,
    setCurrentMounth
  } = useDatePicker();
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >(availabilityMonth);

  useEffect(() => {
    setMonthAvailability(availabilityMonth);
  }, [availabilityMonth, setMonthAvailability]);

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) setSelectedDate(day);
    },
    [setSelectedDate]
  );

  const handleMonthChange = useCallback(
    (month: Date) => {
      setCurrentMounth(month);
    },
    [setCurrentMounth]
  );

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <DayPicker
        disabledDays={[{ daysOfWeek }, ...disableDays]}
        modifiers={{
          available: { daysOfWeek: [1, 2, 3, 4, 5] }
        }}
        onDayClick={handleDateChange}
        selectedDays={selectedDate}
        onMonthChange={handleMonthChange}
        weekdaysShort={WEEKDAYS_SHORT}
        fromMonth={FROM_MONTH}
        months={MONTHS}
      />
    </Container>
  );
};

export default DatePicker;
