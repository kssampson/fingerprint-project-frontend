import axios from "axios";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/log-in', {email, password})
    //Todo: determine what to do with the repsonse
    return response
  } catch(error){
    console.log('Failed on front end: ', error)
    throw error;
  }
}

export default login