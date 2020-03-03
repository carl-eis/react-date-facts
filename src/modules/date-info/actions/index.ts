export const DATE_RANGE_CHANGE = 'date-info/DATE_RANGE_CHANGE';
export const FACT_FETCH_SUCCESS = 'date-info/FACT_FETCH_SUCCESS';
export const FACT_FETCH_ERROR = 'date-info/FACT_FETCH_ERROR';

export const dateRangeChange = (startDate: string, endDate: string) => ({
  type: DATE_RANGE_CHANGE, data: { startDate, endDate },
});

export const factFetchSuccess = (nextFact: string) => ({
  type: FACT_FETCH_SUCCESS, data: nextFact,
});

export const factFetchError = (error?: any) => ({
  type: FACT_FETCH_ERROR, data: error,
});
