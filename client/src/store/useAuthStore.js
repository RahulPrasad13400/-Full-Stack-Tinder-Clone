import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      const { token, user } = res.data;

      set({ authUser: user });

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  login: async (LoginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", LoginData);
      const { token, user } = res.data;
      console.log("login data : ", res.data)
      set({ authUser: user });

      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  checkAuth: async () => {
    try {
      

      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    }
  },
}));
