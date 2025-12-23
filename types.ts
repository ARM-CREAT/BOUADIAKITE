
export interface Member {
  name: string;
  role: string;
  location: string;
  phone?: string;
  address?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  image?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
}

export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

export interface SocialConcern {
  id: string;
  category: string;
  text: string;
  location: string;
  date: string;
  status: 'pending' | 'reviewed' | 'addressed';
}

export enum AppSection {
  HOME = 'home',
  PROGRAM = 'program',
  STATUTES = 'statutes',
  MEMBERS = 'members',
  EVENTS = 'events',
  NEWS = 'news',
  DONATE = 'donate',
  JOIN = 'join',
  CHAT = 'chat',
  ADMIN = 'admin',
  MEDIA = 'media',
  CONTACT = 'contact',
  AI_ASSISTANT = 'ai_assistant',
  SOCIAL_CONCERNS = 'social_concerns'
}
