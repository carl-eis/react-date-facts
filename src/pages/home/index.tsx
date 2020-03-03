import React, { FC, useMemo, useCallback } from 'react';
import Moment from 'moment';
import DateRangePicker from './components/date-range-picker-1';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './container';
import { Container, ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import { StyledFactBox, StyledLabel, StyledPageContainer, StyledSpinnerPositioner } from './styles';

import isLeapYear from './helpers/is-leap-year';
import countMondays from './helpers/count-mondays';

const parseDateObj = (dateString?: string): Date | null => {
  if (!dateString) {
    return null;
  }
  return new Date(dateString);
};

const getDaysInRange = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) {
    return null;
  }
  const parsedStartDate = parseDateObj(startDate);
  const parsedEndDate = parseDateObj(endDate);
  const milisecondsInDay = 1000 * 60 * 60 * 24;
  return Math.ceil((parsedEndDate.getTime() - parsedStartDate.getTime()) / milisecondsInDay);
};

const rangeContainsLeapYear = (startDate: string, endDate: string): boolean => {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  return isLeapYear(startYear) || isLeapYear(endYear);
};

const getReadableDate = (date: string): string => {
  if (!date) {
    return 'No date selected.';
  }
  return Moment(date).format('YYYY-MM-DD');
};

const getIsoDate = (date: Date): string => {
  return Moment(date).toISOString();
};


interface IContainerProps {
  dateFact?: string;
  endDate?: string;
  isLoadingFact?: boolean;
  onChangeDateRange?: (nextStartDate: string, nextEndDate: string) => void,
  startDate?: string,
}

export const HomePage: FC<IContainerProps> = (props) => {
  const {
    dateFact,
    endDate,
    isLoadingFact,
    onChangeDateRange,
    startDate,
  } = props;

  const startDateObj = useMemo(() => parseDateObj(startDate), [startDate, parseDateObj]);
  const endDateObj = useMemo(() => parseDateObj(endDate), [endDate, parseDateObj]);

  const rangePickerValue = useMemo(() => {
    if (!startDateObj || !endDateObj) {
      return [];
    }
    return [startDateObj, endDateObj];
  }, [startDateObj, endDateObj]);

  const handleDateRangeChange = useCallback((nextRange: any[]) => {
    const [nextStart, nextEnd] = nextRange;
    const startDateStr = getIsoDate(nextStart);
    const endDateStr = getIsoDate(nextEnd);
    onChangeDateRange(startDateStr, endDateStr);
  }, [getIsoDate, onChangeDateRange]);

  const startDateReadable: string = getReadableDate(startDate);
  const endDateReadable: string = getReadableDate(endDate);
  const daysInRange: number = getDaysInRange(startDate, endDate);
  const hasLeapYear: boolean = rangeContainsLeapYear(startDate, endDate);
  const numberOfMondays: number = countMondays(startDate, endDate) || 0;

  return (
    <StyledPageContainer>
      <Container>
        <h1>Simple date facts</h1>
        <p>Please select a date range below to get started.</p>

        <DateRangePicker
          onChange={handleDateRangeChange}
          value={rangePickerValue}
        />

        <div>
          <ListGroup>
            <ListGroupItem>
              <StyledLabel>Start Date:</StyledLabel> {startDateReadable || 'None selected.'}
            </ListGroupItem>
            <ListGroupItem>
              <StyledLabel>End Date:</StyledLabel> {endDateReadable || 'None selected.'}
            </ListGroupItem>
            <ListGroupItem>
              <StyledLabel>Number of days:</StyledLabel> {daysInRange || 'None selected.'}
            </ListGroupItem>
            <ListGroupItem>
              <StyledLabel>Are either the Start or End Date a leap year?:</StyledLabel> {hasLeapYear ? 'Yes!' : 'No'}
            </ListGroupItem>
            <ListGroupItem>
              <StyledLabel>Number of mondays:</StyledLabel> {numberOfMondays}
            </ListGroupItem>
          </ListGroup>
        </div>

        <StyledFactBox>
          {isLoadingFact && (
            <StyledSpinnerPositioner>
              <Spinner color="primary"/>
            </StyledSpinnerPositioner>
          )}
          {!isLoadingFact && (
            <div>
              <h4>What happened on this day?</h4>
              <p>{dateFact || 'Nothing yet!'}</p>
            </div>
          )}
        </StyledFactBox>
      </Container>
    </StyledPageContainer>
  );
};

HomePage.defaultProps = {
  dateFact: '',
  endDate: '',
  isLoadingFact: false,
  startDate: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
