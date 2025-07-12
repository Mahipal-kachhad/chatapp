import { useState, useEffect } from "react";
import type {
  ApiUser,
  Contact,
  IMessage,
  Message,
  Messages,
} from "../../interfaces/Props";
import ChatWindow from "./MainChat";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Messages>({});
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<ApiUser | null>(null);

  const navigate = useNavigate();
  const activeContact = contacts.find((c) => c.id === activeContactId);
  const activeMessages = activeContactId ? messages[activeContactId] || [] : [];

  useEffect(() => {
    const storageUser = sessionStorage.getItem("user");
    const parsedUser = storageUser ? JSON.parse(storageUser) : null;
    if (!parsedUser) {
      toast.error("please Login");
      navigate("/");
    } else {
      setUser(parsedUser);
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user");
        const allUser = response.data.data;
        if (user) {
          const otherUser = allUser.filter((u: ApiUser) => u._id !== user._id);

          const contactData = otherUser.map((u: ApiUser) => ({
            id: user._id,
            name: `${u.firstName} ${u.lastName}`,
            lastMessage: "",
            timeStamp: "",
            unread: 0,
            online: false,
          }));
          setContacts(contactData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };
    if (user) {
      fetchUser();
    }
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeContactId && user) {
        setMessages((prev) => ({ ...prev, [activeContactId]: [] }));
        try {
          const response = await axios.post("http://localhost:4000/message", 
            { sender: user._id, receiver: activeContactId },
          );
          setMessages((prev) => ({
            ...prev,
            [activeContactId]: response.data.data.map((msg: IMessage) => ({
              id: msg._id,
              sender: msg.sender,
              text: msg.message,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            })),
          }));
        } catch (error) {
          console.error("Error fetching messages:", error);
          toast.error("Failed to fetch messages for this contact.");
        }
      }
    };
    fetchMessages();
  }, [activeContactId, user]);

  useEffect(() => {
    socket.on("newMessage", (message: IMessage) => {
      const contactId =
        message.sender === user?._id ? message.receiver : message.sender;
      const newMessage: Message = {
        id: message._id,
        sender: message.sender,
        text: message.message,
        time: new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), newMessage],
      }));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [user]);

  const handleSendMessage = (text: string) => {
    if (!activeContactId || !user) return;

    const messageData = {
      sender: user._id,
      receiver: activeContactId,
      message: text,
    };

    socket.emit("sendMessage", messageData);
  };

  useEffect(() => {
    if (window.innerWidth >= 768 && contacts.length > 0 && !activeContactId) {
      setActiveContactId(contacts[0].id);
    }
  }, [contacts, activeContactId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-green-600 text-lg">loading</h1>
      </div>
    );

  return (
    <main className="h-screen w-full bg-gray-200 font-sans antialiased">
      <div className="relative flex h-full w-full max-w-7xl mx-auto shadow-lg">
        <Sidebar
          contacts={contacts}
          onContactSelect={setActiveContactId}
          activeContactId={activeContactId}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentUser={user}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col">
          <ChatWindow
            contact={activeContact}
            messages={activeMessages}
            onSendMessage={handleSendMessage}
            onMenuClick={() => setSidebarOpen(true)}
            currentUser={user}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
