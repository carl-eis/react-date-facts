import React, { FC } from 'react';
import { DateRangePicker as DateRangePickerLib } from 'rsuite';
import { StyledRangePickerWrapper } from './styles';

interface IProps {
  onChange: (nextRange: any[]) => void;
  value: any;
}

const DateRangePicker: FC<IProps> = (props) => {
  const {
    onChange,
    value,
  } = props;

  return (
    <StyledRangePickerWrapper>
      <DateRangePickerLib
        onChange={onChange}
        value={value}
      />
    </StyledRangePickerWrapper>
  );
};

DateRangePicker.defaultProps = {};

export default DateRangePicker;
