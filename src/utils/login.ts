import axios from "axios";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/log-in`, {email, password})
    return response
  } catch(error){
    throw new Error;
  }
}

export default login