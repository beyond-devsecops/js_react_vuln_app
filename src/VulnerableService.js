import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const login = (username, password) => {
  return api.post("/login", { username, password });
};

export const uploadFile = (file) => {
  return api.post("/upload", { file });
};

export const executeCommand = (cmd) => {
  return api.get(`/exec?cmd=${cmd}`);
};