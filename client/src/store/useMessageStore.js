import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set) => ({
  message: [],
  loading: true,

  sendMessage: async (receiverId, content) => {
    try {
      set((state) => ({
        message: [
          ...state.message,
          { sender: useAuthStore.getState().authUser._id, content },
        ],
      }));
      const res = await axiosInstance.post(`/messages/send`, {
        receiverId,
        content,
      });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    }
  },

  getMessages: async (userId) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/messages/converstation/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      console.log(error);
      set({ messages: [] });
    } finally {
      set({ loading: false });
    }
  },

  subscribeToMessages: async () => {
    const socket = getSocket();
    socket.on("newMessage", ({ message }) => {
      set((state) => ({ message: [...state.message, message] }));
    });
  },

  unsubscribeToMessages: async () => {
    const socket = getSocket();
    socket.off("newMessage");
  },
}));
