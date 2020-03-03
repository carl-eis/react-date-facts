const fetchDateFact = async (day: number, month: number): Promise<string> => {
  const url = `https://numbersapi.com/9/14/date`;
  const response = await fetch(url, { method: 'GET' });
  return await response.json();
};

export default fetchDateFact;
