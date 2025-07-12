import { useEffect, useRef, useState, type FC } from "react";
import type {
  ChatHeaderProps,
  ChatWindowProps,
  MessageBubbleProps,
  MessageInputProps,
} from "../../interfaces/Props";
import {
  ChevronsRight,
  Menu,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from "lucide-react";

const ChatHeader: FC<ChatHeaderProps> = ({ contact, onMenuClick }) => {
  if (!contact) return null;
  return (
    <header className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="md:hidden text-gray-500">
          <Menu size={24} />
        </button>
        <div className="relative">
          <img
            src={`https://placehold.co/100x100/00A884/FFFFFF?text=${contact.name.charAt(
              0
            )}`}
            alt={contact.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{contact.name}</h3>
          <p className="text-sm text-gray-500">
            {contact.online ? "Online" : "Click here for contact info"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-gray-500">
        <button className="hover:text-green-500 transition-colors">
          <Video size={20} />
        </button>
        <button className="hover:text-green-500 transition-colors">
          <Phone size={20} />
        </button>
        <button className="hover:text-green-500 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </header>
  );
};

const MessageBubble: FC<MessageBubbleProps> = ({ message, currentUser }) => {
  const isSent = message.sender === currentUser?._id;
  return (
    <div
      className={`flex items-end space-x-2 ${
        isSent ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md p-2 px-3 rounded-lg shadow-sm ${
          isSent ? "bg-[#D9FDD3] text-gray-800" : "bg-white text-gray-800"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 text-gray-400 text-right`}>
          {message.time}
        </p>
      </div>
    </div>
  );
};

const MessageInput: FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="p-3 px-4 bg-gray-100 flex items-center space-x-4"
    >
      <button type="button" className="p-2 text-gray-500 hover:text-green-500">
        <Smile size={24} />
      </button>
      <div className="flex-1">
        <input
          type="text"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          placeholder="Type a message"
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>
      <button type="button" className="p-2 text-gray-500 hover:text-green-500">
        <Paperclip size={24} />
      </button>
      <button
        type="submit"
        className="p-3 rounded-full bg-green-500 text-white disabled:opacity-50 transition-transform duration-200 hover:scale-105"
        disabled={!message.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

const ChatWindow: FC<ChatWindowProps> = ({
  contact,
  messages,
  onSendMessage,
  onMenuClick,
  currentUser
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!contact) {
    return (
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#F0F2F5] text-gray-500">
        <ChevronsRight size={48} className="mb-4" />
        <h2 className="text-2xl font-semibold">
          Select a chat to start messaging
        </h2>
        <p>Keep your phone connected</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#E5DDD5] min-h-0">
      <ChatHeader contact={contact} onMenuClick={onMenuClick} />
      <div className="flex-1 min-h-0 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} currentUser={currentUser}/>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
