import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { useAdminStore } from '../store/adminStore';

interface ChatProps {
  reportId: string;
}

const Chat = ({ reportId }: ChatProps) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { isAdmin } = useAdminStore();
  const { messages, addMessage, getMessages } = useChatStore();
  
  const reportMessages = getMessages(reportId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [reportMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(reportId, message, isAdmin);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Case Discussion</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {reportMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.isAdmin
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {format(new Date(msg.timestamp), 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;