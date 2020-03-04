import React, { FC, useState, useMemo, useCallback } from 'react';
import { padStart, range } from 'lodash';
import Moment from 'moment';

import {
  StyledCalendarButton,
  StyledCalendarHeader,
  StyledCalendarWrapper,
} from './styles';

const padItem = (item: number): string => {
  return padStart(item.toString(), 2, '0');
};

interface IProps {
  startDate: Date;
  endDate: Date;
  onStartDateClick: (nextDate: string) => void;
  onEndDateClick: (nextDate: string) => void;
}

const Calendar: FC<IProps> = (props) => {
  const {
    startDate,
    endDate,
    onStartDateClick,
    onEndDateClick,
  } = props;

  // Wrap selected date in moment for comparison
  const wrappedStartDate = useMemo(() => Moment(startDate), [startDate]);
  const wrappedEndDate = useMemo(() => Moment(endDate), [endDate]);

  // Track currently selected month & year
  const [selectedDisplayDate, setSelectedDisplayDate] = useState(startDate ? Moment(startDate) : Moment());
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);

  const currentMonth = useMemo(() => selectedDisplayDate.month() + 1, [selectedDisplayDate]);
  const currentYear = useMemo(() => selectedDisplayDate.year(), [selectedDisplayDate]);
  const daysInMonth = useMemo(() => selectedDisplayDate.daysInMonth(), [selectedDisplayDate]);

  const firstDayOfMonth = Moment(`${currentYear}-${padItem(currentMonth)}-01`);
  const dayOfWeek = firstDayOfMonth.day();

  const allDaysInMonth: Moment.Moment[] = range(1, daysInMonth + 1).map((item) => {
    return Moment(`${currentYear}-${padItem(currentMonth)}-${padItem(item)}`)
  });


  const handleMonthNavClick = useCallback((isPrev: boolean) => (event) => {
    let nextViewDate: Moment.Moment;
    if (isPrev) {
      nextViewDate = selectedDisplayDate.clone().subtract(1, 'month');
    } else {
      nextViewDate = selectedDisplayDate.clone().add(1, 'month');
    }
    setSelectedDisplayDate(nextViewDate);
  }, [selectedDisplayDate, setSelectedDisplayDate]);


  const handleSelectDate = useCallback((nextDate: Moment.Moment) => (event) => {
    if (isSelectingStartDate) {
      onStartDateClick(nextDate.toISOString());
      onEndDateClick(null);
      setIsSelectingStartDate(false);
      return;
    }
    if (nextDate.isBefore(wrappedStartDate)) {
      onStartDateClick(nextDate.toISOString());
      onEndDateClick(wrappedStartDate.toISOString());
    } else {
      onEndDateClick(nextDate.toISOString());
    }
    setIsSelectingStartDate(true);
  }, [
    isSelectingStartDate,
    onEndDateClick,
    onStartDateClick,
    setIsSelectingStartDate,
    wrappedStartDate
  ]);

  return (
    <StyledCalendarWrapper firstDayIndex={dayOfWeek}>
      <StyledCalendarHeader>
        <button onClick={handleMonthNavClick(true)}>Prev</button>
        <div>{selectedDisplayDate.format('MMMM YYYY')}</div>
        <button onClick={handleMonthNavClick(false)}>Next</button>
      </StyledCalendarHeader>

      <div className="weeks-header">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      <div className="calendar-grid">
        {allDaysInMonth.map((date, index) => (
          <StyledCalendarButton
            key={index}
            onClick={handleSelectDate(date)}
            isStartDate={date.isSame(wrappedStartDate)}
            isEndDate={date.isSame(wrappedEndDate)}
            isInRange={date.isBetween(wrappedStartDate, wrappedEndDate)}
            hasSelection={!!startDate && !!endDate}
          >
            <span>{date.format('D')}</span>
          </StyledCalendarButton>
        ))}
      </div>
    </StyledCalendarWrapper>
  );
};

Calendar.defaultProps = {};

export default Calendar;
