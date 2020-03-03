const isLeapYear = (year): boolean => {
  if (year % 400 === 0) {
    return true;
  }
  return (year % 4 === 0) && (year % 100 !== 0);
};

export default isLeapYear;
