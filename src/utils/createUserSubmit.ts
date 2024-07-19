import axios from 'axios';

const createUserSubmit = async (userData: object) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/sign-up', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default createUserSubmit;
