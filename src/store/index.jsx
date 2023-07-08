import axios from "axios";
import {create} from "zustand";
import {path} from "../constants";

const api = axios.create({
  baseURL: path,
});

const useAuthStore = create((set) => ({
  email: "",
  token: "",
  isLogged: false,
  login: async (user) => {
    try {
      const response = await api.post("/login", user);
      const token = response.data.token;
      set(() => ({email: user.email, token, isLogged: true}));
      return true;
    } catch (error) {
      return false;
    }
  },
  register: async (user) => {
    try {
      const response = await api.post("/register", user);
      const token = response.data.token;

      set(() => ({email: user.email, token, isLogged: true}));
      return true;
    } catch (error) {
      return false;
    }
  },
  logout: () => {
    set(() => ({email: "", token: "", isLogged: false}));
  },
}));

export default useAuthStore;
