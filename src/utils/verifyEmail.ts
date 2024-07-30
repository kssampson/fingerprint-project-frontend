import axios from "axios";

const verifyEmail = async (email: string) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify-email`, {email: email})
    return response.data;
  } catch (error) {
    throw error
  }
}

export default verifyEmail;