import isLeapYear from './';

describe('is leap year', () => {
  it('should correctly detect a leap year divisible by 400', () => {
    const year = 2000;
    const result = isLeapYear(year);
    expect(result).toEqual(true);
  });

  it('should correctly detect a leap year divisble by 4 but not 100', () => {
    const year = 2004;
    const result = isLeapYear(year);
    expect(result).toEqual(true);
  });

  it('should fail on a known non leap year', () => {
    const year = 2001;
    const result = isLeapYear(year);
    expect(result).toEqual(false);
  });

  it('should fail on a year divisible by 4 and 100 but not 400', () => {
    const year = 2200;
    const result = isLeapYear(year);
    expect(result).toEqual(false);
  });
});
