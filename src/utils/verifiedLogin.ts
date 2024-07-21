import axios from "axios";

const verifiedLogin = async (email: string, password: string, token: string | null) => {
  // console.log('verifiedlogin handler: ', email, password, token)
  try {
    const response = await axios.post('http://localhost:3001/auth/verified-log-in', {email, password, token})
    // console.log('response: ', response)
    return response;
  } catch(error){
    console.log('Failed on front end: ', error)
    throw error;
  }
}

export default verifiedLogin;