export enum UserTier {
  FREE_TRIAL = 'FREE_TRIAL', // Uji Coba Gratis
  BASIC = 'BASIC', // UMKM / Pemula (Paid)
  PRO = 'PRO', // Pengusaha Muda / Bisnis Menengah
  ENTERPRISE = 'ENTERPRISE', // Bisnis Besar
}

export interface UserProfile {
  name: string;
  companyName?: string;
  tier: UserTier;
  avatarUrl?: string;
  emailNotifications: boolean;
}

export interface NavItem {
  label: string;
  id: string;
  icon: any;
}

export interface FinancialMetric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  attachment?: string; // For input image (Finly Vision)
  imageUrl?: string; // For output generated image (Imagen)
}

export interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: string;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
  timestamp: Date;
}

export interface EcoStats {
  paperSaved?: number;
  energySaved?: number;
  carbonCredit?: number;
  esgScore?: number;
  score: number;
}