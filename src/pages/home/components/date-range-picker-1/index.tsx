import React, { FC, useCallback, useMemo, useState } from 'react';
import { DateRangePicker as DateRangePickerLib } from 'rsuite';

interface IProps {
  onChange: (nextRange: any[]) => void;
  value: any;
}

const DateRangePicker: FC<IProps> = (props) => {
  const {
    onChange,
    value,
  } = props;

  const handleChange = useCallback((nextValue) => {
    onChange(nextValue);
  }, []);

  return (
    <DateRangePickerLib
      onChange={handleChange}
      value={value}
    />
  );
};

DateRangePicker.defaultProps = {};

export default DateRangePicker;
