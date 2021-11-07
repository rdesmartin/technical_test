import axios from "axios";

// In a real app, these values would be defined in a .env file
const HOST = "localhost";
const PORT = "8000";

export default axios.create({
  baseURL: `http://${HOST}:${PORT}`,
  responseType: "json"
});
