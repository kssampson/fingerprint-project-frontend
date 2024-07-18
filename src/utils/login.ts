import axios from "axios";

const login = async (userData: object) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', userData)
    //Todo: determine what to do with the repsonse
    return response
  } catch(error){
    console.log('Failed on front end: ', error)
    throw error;
  }
}

export default login