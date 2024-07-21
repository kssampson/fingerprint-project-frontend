import axios from "axios";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/log-in', {email, password})
    return response
  } catch(error){
    throw new Error;
  }
}

export default login