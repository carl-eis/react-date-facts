const fetchDateFact = async (day: number, month: number): Promise<string> => {
  const url = `http://numbersapi.com/${month}/${day}/date`;
  const response = await fetch(url, { method: 'GET' });
  return await response.text();
};

export default fetchDateFact;
