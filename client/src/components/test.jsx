import { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  ChevronsRight,
  Menu,
  X,
  Video,
  Phone,
  Smile,
  Paperclip,
  MoreVertical,
} from "lucide-react";

// --- DUMMY DATA ---
const users = {
  user1: {
    name: "You",
    avatar: "https://placehold.co/100x100/7F56D9/FFFFFF?text=Y",
  },
  user2: {
    name: "Alex",
    avatar: "https://placehold.co/100x100/00A884/FFFFFF?text=A",
  },
  user3: {
    name: "Samantha",
    avatar: "https://placehold.co/100x100/F79009/FFFFFF?text=S",
  },
  user4: {
    name: "Michael",
    avatar: "https://placehold.co/100x100/10B981/FFFFFF?text=M",
  },
  user5: {
    name: "Emily",
    avatar: "https://placehold.co/100x100/3B82F6/FFFFFF?text=E",
  },
};

const initialContacts = [
  {
    id: "user2",
    name: "Alex",
    lastMessage: "Hey, how are you?",
    timestamp: "10:40 AM",
    unread: 2,
    online: true,
  },
  {
    id: "user3",
    name: "Samantha",
    lastMessage: "Meeting at 3 PM.",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "user4",
    name: "Michael",
    lastMessage: "Can you send the file?",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "user5",
    name: "Emily",
    lastMessage: "Happy Birthday! 🎉",
    timestamp: "Sun",
    unread: 0,
    online: false,
  },
];

const initialMessages = {
  user2: [
    {
      id: 1,
      sender: "user2",
      text: "Hey, how have you been?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user1",
      text: "I'm doing great, Alex! Thanks for asking. How about you?",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "user2",
      text: "Pretty good! Just working on that new project. It's been intense.",
      time: "10:32 AM",
    },
    {
      id: 4,
      sender: "user2",
      text: "Did you see the latest designs?",
      time: "10:32 AM",
    },
    {
      id: 5,
      sender: "user1",
      text: "Oh yes, they looked amazing! You guys are doing a fantastic job.",
      time: "10:35 AM",
    },
    {
      id: 6,
      sender: "user2",
      text: "Thanks! We're trying our best.",
      time: "10:40 AM",
    },
  ],
  user3: [
    {
      id: 1,
      sender: "user3",
      text: "Just a reminder, we have a meeting at 3 PM today.",
      time: "Yesterday",
    },
  ],
  user4: [
    {
      id: 1,
      sender: "user4",
      text: "Hey, can you send over the file we discussed?",
      time: "Yesterday",
    },
  ],
  user5: [
    {
      id: 1,
      sender: "user5",
      text: "Happy Birthday! Hope you have a great one! 🎉",
      time: "Sun",
    },
  ],
};

// --- COMPONENTS ---

const UserProfile = ({ user }) => (
  <div className="p-3 bg-gray-100 flex items-center space-x-4">
    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
    <div>
      <h3 className="font-semibold text-gray-800 text-md">{user.name}</h3>
    </div>
  </div>
);

const ContactItem = ({ contact, onClick, isActive }) => (
  <li
    className={`flex items-center p-3 cursor-pointer transition-all duration-200 ease-in-out ${
      isActive ? "bg-gray-200" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <div className="relative">
      <img
        src={users[contact.id].avatar}
        alt={contact.name}
        className="w-12 h-12 rounded-full"
      />
    </div>
    <div className="flex-1 ml-3 border-t border-gray-200 pt-3">
      <div className="flex justify-between">
        <p className="font-semibold text-gray-800">{contact.name}</p>
        <p
          className={`text-xs ${
            contact.unread > 0 ? "text-green-500 font-bold" : "text-gray-500"
          }`}
        >
          {contact.timestamp}
        </p>
      </div>
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
        {contact.unread > 0 && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {contact.unread}
          </span>
        )}
      </div>
    </div>
  </li>
);

const Sidebar = ({
  contacts,
  onContactSelect,
  activeContactId,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside
      className={`absolute md:relative z-20 h-full w-full md:w-1/3 xl:w-1/4 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="p-3 bg-gray-100 flex justify-between items-center">
          <UserProfile user={users["user1"]} />
          <div className="flex items-center space-x-4 text-gray-500">
            <MoreVertical size={24} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500"
            >
              <X size={24} />
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="p-2 bg-gray-100 border-b border-gray-200">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Contact List */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onClick={() => {
                  onContactSelect(contact.id);
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                isActive={activeContactId === contact.id}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

const ChatHeader = ({ contact, onMenuClick }) => {
  if (!contact) return null;
  return (
    <header className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="md:hidden text-gray-500">
          <Menu size={24} />
        </button>
        <div className="relative">
          <img
            src={users[contact.id].avatar}
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

const MessageBubble = ({ message }) => {
  const isSent = message.sender === "user1";
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

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
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
          onChange={(e) => setMessage(e.target.value)}
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

const ChatWindow = ({ contact, messages, onSendMessage, onMenuClick }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!contact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F0F2F5] text-gray-500">
        <ChevronsRight size={48} className="mb-4" />
        <h2 className="text-2xl font-semibold">
          Select a chat to start messaging
        </h2>
        <p>Keep your phone connected</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#E5DDD5] bg-[url('https://i.imgur.com/hiXwD2Z.pn]g')">
      <ChatHeader contact={contact} onMenuClick={onMenuClick} />
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default function Dashboard() {
  const [contacts, setContacts] = useState(initialContacts);
  const [messages, setMessages] = useState(initialMessages);
  const [activeContactId, setActiveContactId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const activeContact = contacts.find((c) => c.id === activeContactId);
  const activeMessages = activeContactId ? messages[activeContactId] || [] : [];

  const handleSendMessage = (text) => {
    if (!activeContactId) return;

    const newMessage = {
      id: Date.now(),
      sender: "user1",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeContactId]: [...(prevMessages[activeContactId] || []), newMessage],
    }));

    // Update last message in contact list
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === activeContactId
          ? { ...contact, lastMessage: text, timestamp: "Just now" }
          : contact
      )
    );
  };

  // Set first contact as active on initial load for desktop
  useEffect(() => {
    if (window.innerWidth >= 768 && contacts.length > 0) {
      setActiveContactId(contacts[0].id);
    }
  }, []);

  return (
    <main className="h-screen w-full bg-gray-200 font-sans antialiased overflow-hidden">
      <div className="relative flex h-full max-w-7xl mx-auto shadow-lg">
        <Sidebar
          contacts={contacts}
          onContactSelect={setActiveContactId}
          activeContactId={activeContactId}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col">
          <ChatWindow
            contact={activeContact}
            messages={activeMessages}
            onSendMessage={handleSendMessage}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>
      </div>
    </main>
  );
}
