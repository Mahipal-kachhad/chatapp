import type { Dispatch, SetStateAction } from "react";

export interface ApiUser {
  firstName: string;
  lastName: string;
  _id: string;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  lastMessage: string;
  timeStamp: string;
  unread: number;
  online: boolean;
}

export interface IMessage {
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: string;
}

export interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
}

export interface Users {
  [key: string]: User;
}

export interface Messages {
  [key: string]: Message[];
}

export interface UserProfileProps {
  user: ApiUser | null;
  onLogout: () => void;
}

export interface ContactItemProps {
  contact: Contact;
  onClick: () => void;
  isActive: boolean;
}

export interface SidebarProps {
  contacts: Contact[];
  onContactSelect: (id: string) => void;
  activeContactId: string | null;
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  currentUser: ApiUser | null;
  onLogout: () => void;
}

export interface ChatHeaderProps {
  contact: Contact;
  onMenuClick: () => void;
}

export interface MessageBubbleProps {
  message: Message;
  currentUser: ApiUser | null;
}

export interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export interface ChatWindowProps {
  contact: Contact | undefined;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onMenuClick: () => void;
  currentUser: ApiUser | null;
}

export interface ApiErrorResponse {
  success: boolean;
  error: string;
}
