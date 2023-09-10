import axios from "axios";

const tournamentsClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/tournament`,
});

export default tournamentsClient;
