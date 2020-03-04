import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { Input } from 'reactstrap';
import Calendar from './calendar';
import { StyledRangePickerContainer } from './styles';

interface IProps {
  onChange: ([startDate, endDate]) => void;
  value: Date[];
}

const DateRangePickerCustom: FC<IProps> = ({ value, onChange }) => {
  const [initialStartDate, initialEndDate] = value;

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleSetStartDate = useCallback((nextDate) => {
    setStartDate(nextDate);
  }, []);

  const handleSetEndDate = useCallback((nextDate) => {
    setEndDate(nextDate);
  }, []);

  const combinedDates: [Date, Date] = useMemo(() => {
    return [startDate, endDate];
  }, [startDate, endDate]);

  useEffect(() => {
    const [latestStartDate, latestEndDate] = combinedDates;
    if (!!latestStartDate && !!latestEndDate) {
      onChange(combinedDates);
    }
  }, [combinedDates, onChange]);

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialEndDate, initialStartDate]);

  return (
    <div>
      <Input type="text" name="dateRangeText" id="dateRangeText" placeholder={'Select a date range.'}/>
      <StyledRangePickerContainer>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          onEndDateClick={handleSetEndDate}
          onStartDateClick={handleSetStartDate}
        />
      </StyledRangePickerContainer>
    </div>
  );
};

DateRangePickerCustom.defaultProps = {};

export default DateRangePickerCustom;
