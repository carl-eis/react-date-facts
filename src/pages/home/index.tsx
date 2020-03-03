import React, { FC, useMemo, useCallback } from 'react';
import Moment from 'moment';
import DateRangePicker from './components/date-range-picker-1';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './container';
import { Container, Row, Col, ListGroup, ListGroupItem, Input, Spinner } from 'reactstrap';
import { StyledFactBox, StyledLabel, StyledPageContainer, StyledSpinnerPositioner } from './styles';

const getReadableDate = (date: string): string => {
  if (!date) {
    return 'No date selected.';
  }
  return Moment(date).format('YYYY-MM-DD');
};

const getIsoDate = (date: Date): string => {
  return Moment(date).toISOString();
};

const parseDateObj = (dateString?: string): Date | null => {
  if (!dateString) {
    return null;
  }
  return new Date(dateString);
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

  return (
    <StyledPageContainer>
      <Container>
        <Row>
          <Col>
            <h1>Simple date facts!</h1>
            <p>Please select a date range below to get started.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="text" name="dateRangeText" id="dateRangeText" placeholder={'Select a date range.'} />
            <DateRangePicker
              onChange={handleDateRangeChange}
              value={rangePickerValue}
            />
          </Col>
          <Col>
            <ListGroup>
              <ListGroupItem>
                <StyledLabel>Start Date:</StyledLabel> {startDateReadable || 'None selected.'}
              </ListGroupItem>
              <ListGroupItem>
                <StyledLabel>End Date:</StyledLabel> {endDateReadable || 'None selected.'}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <StyledFactBox>
          {isLoadingFact && (
            <StyledSpinnerPositioner>
              <Spinner color="primary" />
            </StyledSpinnerPositioner>
          )}
          {!isLoadingFact && (
            <p>{dateFact || 'No fact yet!'}</p>
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
