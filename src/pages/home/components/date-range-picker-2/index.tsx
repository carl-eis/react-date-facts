import React, { FC } from 'react';
import { Input } from 'reactstrap';

interface IProps {
  [x: string]: any;
}

const DateRangePickerCustom: FC<IProps> = (props) => {
  return (
    <div>
      <Input type="text" name="dateRangeText" id="dateRangeText" placeholder={'Select a date range.'} />
      {/* TODO: Custom date range picker */}
    </div>
  );
};

DateRangePickerCustom.defaultProps = {};

export default DateRangePickerCustom;
