import axios from "axios";

const url = "http://185.217.131.190:8080/api/v1";

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});
