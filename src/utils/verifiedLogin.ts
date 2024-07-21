import axios from "axios";

const verifiedLogin = async (email: string, password: string, token: string | null) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/verified-log-in', {email, password, token})
    return response;
  } catch(error){
    throw new Error;
  }
}

export default verifiedLogin;