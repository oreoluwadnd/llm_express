import axios from 'axios';

export const sendQueryToPython = async (model: string, question: string): Promise<string> => {
  try {
    const response = await axios.post('http://localhost:8000/query', {
      model,
      question,
    });
    return response.data.response;
  } catch (error) {
    throw new Error('Error sending query to Python API');
  }
};