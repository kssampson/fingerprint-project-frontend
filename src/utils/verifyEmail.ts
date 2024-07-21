import axios from "axios";

const verifyEmail = async (email: string) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/verify-email', {email: email})
    return response.data;
  } catch (error) {
    throw error
  }
}

export default verifyEmail;