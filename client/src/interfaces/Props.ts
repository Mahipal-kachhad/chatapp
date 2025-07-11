import type { Dispatch, SetStateAction } from "react";

export interface User {
  name: string;
  avatar: string;
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
  id: number;
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
  user: User;
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
}

export interface ChatHeaderProps {
  contact: Contact;
  onMenuClick: () => void;
}

export interface MessageBubbleProps {
  message: Message;
}

export interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export interface ChatWindowProps {
  contact: Contact | undefined;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onMenuClick: () => void;
}

export interface ApiErrorResponse {
  success: boolean;
  error: string;
}
