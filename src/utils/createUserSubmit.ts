import axios from 'axios';

const createUserSubmit = async (userData: object) => {
  try {
    await axios.post('http://localhost:3001/auth/register', userData);
  } catch(error) {
    console.log('Failed on front end: ', error)
    throw error
  }
}

export default createUserSubmit;