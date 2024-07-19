import axios from 'axios';

const createUserSubmit = async (userData: object) => {
  console.log('userData: ', userData)
  try {
    await axios.post('http://localhost:3001/auth/sign-up', userData);
  } catch(error) {
    console.log('Failed on front end: ', error)
    throw error
  }
}

export default createUserSubmit;