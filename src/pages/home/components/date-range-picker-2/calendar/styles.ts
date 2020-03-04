import styled, { css } from 'styled-components';

const CALENDAR_START_DATE = '#5b6b7c';
const CALENDAR_IN_RANGE = '#778899';
const CALENDAR_END_DATE = '#495364';

export const StyledCalendarWrapper = styled.div<{ firstDayIndex: number }>`
  border-radius: 4px;
  border: rgba(0, 0, 0, 0.125);
  box-sizing: border-box;
  padding: 5px;
  user-select: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06), 0 4px 4px rgba(0, 0, 0, 0.12);
  margin: 5px 0;
  
  .weeks-header {
    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-weight: bold;
    }
  }
  
  color: lightslategray;
  
  .weeks-header, .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  .calendar-grid button:first-child {
    grid-column: ${({ firstDayIndex }) => firstDayIndex};
  }
 
  width: 300px;
`;

export const StyledCalendarButton = styled.button<{
  isStartDate?: boolean;
  isEndDate?: boolean;
  isInRange?: boolean;
  hasSelection?: boolean;
}>`
  height: 30px;
  outline: none !important;
  border-radius: 4px;
  &:hover {
    border: 1px solid gray;
  }
  
  ${({ isStartDate, isEndDate, isInRange }) => {
    let backgroundColor: string;
    let textColor: string;
    
    if (isStartDate) {
      backgroundColor = CALENDAR_START_DATE;
      textColor = 'white';
    } else if (isEndDate) {
      backgroundColor = CALENDAR_END_DATE;
      textColor = 'white';
    } else if (isInRange) {
      backgroundColor = CALENDAR_IN_RANGE;
      textColor = 'white';
    } else {
      backgroundColor = 'white';
      textColor = 'black';
    }
    
    return css`
      color: ${textColor};
      background: ${backgroundColor};
    ` 
  }}
  
  ${({ isInRange }) => isInRange ? css`
    border-radius: 0;  
  ` : ''};
  
  ${({ isStartDate, isEndDate, hasSelection }) => {
    if (!hasSelection || (!isStartDate && !isEndDate)) {
      return;
    }
    if (isStartDate) {
      return css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `;
    } 
    return css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `;
  }}
`;

export const StyledCalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;
