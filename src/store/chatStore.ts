import { create } from 'zustand';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isAdmin: boolean;
}

interface ChatState {
  messages: Record<string, Message[]>; // reportId -> messages
  addMessage: (reportId: string, content: string, isAdmin: boolean) => void;
  getMessages: (reportId: string) => Message[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: {},

  addMessage: (reportId: string, content: string, isAdmin) => {
    set((state) => {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: isAdmin ? 'admin' : 'user',
        receiverId: isAdmin ? 'user' : 'admin',
        content,
        timestamp: new Date(),
        isAdmin,
      };

      const reportMessages = state.messages[reportId] || [];
      return {
        messages: {
          ...state.messages,
          [reportId]: [...reportMessages, newMessage],
        },
      };
    });
  },

  getMessages: (reportId: string) => {
    return get().messages[reportId] || [];
  },
}));