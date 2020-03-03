import { IApplicationState } from '../../core/reducer';
import { dateRangeChange } from '../../modules/date-info/actions';

export const mapStateToProps = (state: IApplicationState) => {
  const {
    dateInfo: {
      dateFact,
      isLoadingFact,
      endDate,
      startDate,
    }
  } = state;

  return {
    dateFact,
    isLoadingFact,
    endDate,
    startDate,
  };
};

export const mapDispatchToProps = (dispatch: any) => ({
  onChangeDateRange(nextStartDate: string, nextEndDate: string) {
    dispatch(dateRangeChange(nextStartDate, nextEndDate));
  },
});
