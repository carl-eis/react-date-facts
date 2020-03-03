const addNextDate = (date): void => {
  date.setDate(date.getDate() + 1);
};

const countMondays = (startDate: string, endDate: string): number => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  let amountMondays = 0;
  for (let currentDate = startDateObj; currentDate <= endDateObj; addNextDate(currentDate)) {
    if (currentDate.getDay() === 1) {
      amountMondays++;
    }
  }
  return amountMondays;
};

export default countMondays;
