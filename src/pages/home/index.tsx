import React, { FC, useMemo, useCallback } from 'react';
import Moment from 'moment';
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

  const startDateObj = useMemo(() => new Date(startDate), [startDate]);
  const endDateObj = useMemo(() => new Date(endDate), [endDate]);

  const handleDateRangeChange = useCallback((event) => {

  }, []);

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
  onChangeDateRange: () => {},
  startDate: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
