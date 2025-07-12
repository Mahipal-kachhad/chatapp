import { useState, useMemo, type FC } from "react";
import type {
  Contact,
  ContactItemProps,
  SidebarProps,
  UserProfileProps,
} from "../../interfaces/Props";
import { LogOut, Search } from "lucide-react";

const UserProfile: FC<UserProfileProps> = ({ user, onLogout }) => {
  if (!user) return null;
  const userName = `${user.firstName} ${user.lastName}`;
  const userInitial = user.firstName.charAt(0);

  return (
    <div className="flex items-center space-x-4 p-3 border-b border-gray-200">
      <img
        src={`https://placehold.co/100x100/7F56D9/FFFFFF?text=${userInitial}`}
        alt={userName}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{userName}</h3>
      </div>
      <button onClick={onLogout} className="text-gray-500 hover:text-red-500">
        <LogOut size={20} />
      </button>
    </div>
  );
};

const SearchBar: FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({ searchQuery, setSearchQuery }) => (
  <div className="p-3">
    <div className="relative">
      <input
        type="text"
        placeholder="Search or start new chat"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <Search size={18} />
      </div>
    </div>
  </div>
);

const ContactItem: FC<ContactItemProps> = ({ contact, onClick, isActive }) => (
  <li
    onClick={onClick}
    className={`flex items-center space-x-4 p-3 cursor-pointer hover:bg-gray-100 ${
      isActive ? "bg-gray-100" : ""
    }`}
  >
    <div className="relative">
      <img
        src={`https://placehold.co/100x100/00A884/FFFFFF?text=${contact.name.charAt(
          0
        )}`}
        alt={contact.name}
        className="w-12 h-12 rounded-full"
      />
      {/* Online status indicator*/}
    </div>
    <div className="flex-1 min-w-0 border-b border-gray-200 pb-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 truncate">{contact.name}</h3>
        <p className="text-xs text-gray-400">{contact.timestamp}</p>
      </div>
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
        {contact.unread > 0 && (
          <span className="bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
  currentUser,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  return (
    <aside
      className={`absolute md:relative z-20 flex flex-col h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-full md:w-1/3 lg:w-1/4`}
    >
      <UserProfile user={currentUser} onLogout={onLogout} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <ul>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact: Contact, idx:number) => (
              <ContactItem
                key={idx}
                contact={contact}
                onClick={() => {
                  onContactSelect(contact.id);
                  setSidebarOpen(false);
                }}
                isActive={contact.id === activeContactId}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 p-4">No contacts found</p>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;