import { useState, useEffect } from "react";
import type { Contact, Message, Messages } from "../../interfaces/Props";
import ChatWindow from "./MainChat";
import Sidebar from "./Sidebar";

const initialContacts: Contact[] = [
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

const initialMessages: Messages = {
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

const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [messages, setMessages] = useState<Messages>(initialMessages);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const activeContact = contacts.find((c) => c.id === activeContactId);
  const activeMessages = activeContactId ? messages[activeContactId] || [] : [];

  const handleSendMessage = (text: string) => {
    if (!activeContactId) return;

    const newMessage: Message = {
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

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === activeContactId
          ? { ...contact, lastMessage: text, timestamp: "Just now" }
          : contact
      )
    );
  };

  useEffect(() => {
    if (window.innerWidth >= 768 && contacts.length > 0) {
      setActiveContactId(contacts[0].id);
    }
  }, [contacts]);

  return (
    <main className="h-screen w-full bg-gray-200 font-sans antialiased">
      <div className="relative flex h-full w-full max-w-7xl mx-auto shadow-lg">
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
};

export default Dashboard;
