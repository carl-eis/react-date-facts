import React, { FC } from 'react';
import { Input } from 'reactstrap';

interface IProps {
  [x: string]: any;
}

const DateRangePickerCustom: FC<IProps> = (props) => {
  const {  } = props;
  return (
    <div>
      <Input type="text" name="dateRangeText" id="dateRangeText" placeholder={'Select a date range.'} />
    </div>
  );
};

DateRangePickerCustom.defaultProps = {};

export default DateRangePickerCustom;
