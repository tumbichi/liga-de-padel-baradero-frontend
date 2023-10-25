import axios from "axios";

const playersClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/player`,
});

export default playersClient;
