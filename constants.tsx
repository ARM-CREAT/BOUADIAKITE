
import React from 'react';
import { Member, EventItem, NewsItem } from './types';
import { 
  Shield, 
  BookOpen, 
  Tractor, 
  Briefcase, 
  Heart, 
  Users, 
  Scale, 
  MessageSquare,
  Globe,
  UserPlus
} from 'lucide-react';

export const PARTY_NAME = "Alliance Pour le Rassemblement Malien";
export const PARTY_ACRONYM = "A.R.M";
export const PARTY_MOTTO = "Fraternité – Liberté – Égalité";
export const PARTY_HQ = "Sebenikoro, Bamako – Rue 530, Porte 245, Mali";
export const PARTY_PHONE = "+34 632 60 71 01";
export const PARTY_EMAILS = ["bouadiakite@gmail.com", "info.armmali@gmail.com"];

export const LEADERSHIP: Member[] = [
  { name: "Lassine Diakité", role: "Président (Entrepreneur)", location: "Bamako / Espagne" },
  { name: "Karifa Keita", role: "Secrétaire Général (Entrepreneur)", location: "Bamako" },
  { name: "Modibo Keita", role: "Secrétaire Administratif (Gestionnaire)", location: "Bamako" }
];

export const OFFICIAL_OBJECTIVES = [
  { id: 1, icon: <Users />, key: "obj1" },
  { id: 2, icon: <Shield />, key: "obj2" },
  { id: 3, icon: <BookOpen />, key: "obj3" },
  { id: 4, icon: <Heart />, key: "obj4" },
  { id: 5, icon: <Tractor />, key: "obj5" },
  { id: 6, icon: <Briefcase />, key: "obj6" },
  { id: 7, icon: <Scale />, key: "obj7" },
  { id: 8, icon: <MessageSquare />, key: "obj8" }
];

export const INITIAL_EVENTS: EventItem[] = [
  { id: '1', title: 'Adoption des Statuts', date: '2025-04-05', description: 'Réunion officielle de fondation du parti à Bamako.', location: 'Sebenikoro' }
];

export const INITIAL_NEWS: NewsItem[] = [
  { id: '1', title: 'Mali Kura : Vers un nouveau départ', date: '2025-04-06', summary: 'L\'ARM s\'engage pour la refondation des institutions.', content: '...' }
];

export const MALI_REGIONS = [
  "Bamako", "Kayes", "Koulikoro", "Sikasso", "Ségou", "Mopti", "Tombouctou", "Gao", "Kidal", "Ménaka", "Taoudénit"
];
