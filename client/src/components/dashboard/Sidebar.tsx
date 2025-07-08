import { useState, type FC } from "react";
import type { ContactItemProps, SidebarProps, UserProfileProps, Users } from "../../interfaces/Props";
import { MoreVertical, Search, X } from "lucide-react";


const users: Users = {
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

const UserProfile: FC<UserProfileProps> = ({ user }) => (
  <div className="p-3 bg-gray-100 flex items-center space-x-4">
    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
    <div>
      <h3 className="font-semibold text-gray-800 text-md">{user.name}</h3>
    </div>
  </div>
);

const ContactItem: FC<ContactItemProps> = ({ contact, onClick, isActive }) => (
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

const Sidebar: FC<SidebarProps> = ({
  contacts,
  onContactSelect,
  activeContactId,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>

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

export default Sidebar;
