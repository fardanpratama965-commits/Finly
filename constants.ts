import { UserTier, Goal, Notification } from './types';

export const TIER_CONFIG = {
  [UserTier.FREE_TRIAL]: {
    label: "Free Trial (Uji Coba)",
    color: "green",
    features: ["Akses Semua Fitur Basic", "Berlaku 14 Hari", "Tanpa Kartu Kredit"]
  },
  [UserTier.BASIC]: {
    label: "Basic (UMKM & Pemula)",
    color: "blue",
    features: ["Arus Kas Sederhana", "Edukasi AI Dasar", "Target Jangka Pendek"]
  },
  [UserTier.PRO]: {
    label: "Pro (Bisnis Berkembang)",
    color: "purple",
    features: ["Laporan Neraca", "Analisis Profitabilitas", "Optimasi Margin"]
  },
  [UserTier.ENTERPRISE]: {
    label: "Enterprise (Korporasi)",
    color: "slate",
    features: ["Konsolidasi Multi-Entitas", "Prediksi AI (Forecasting)", "Manajemen Risiko"]
  }
};

export const MOCK_GOALS_BASIC: Goal[] = [
  { id: '1', title: 'Dana Darurat Toko', current: 2500000, target: 5000000, deadline: '2024-12-31', category: 'Tabungan' },
  { id: '2', title: 'Beli Stok Barang', current: 1000000, target: 3000000, deadline: '2024-06-30', category: 'Operasional' },
];

export const MOCK_GOALS_PRO: Goal[] = [
  { id: '1', title: 'Target Margin Q3', current: 18, target: 25, deadline: '2024-09-30', category: 'Profitabilitas' },
  { id: '2', title: 'Akuisisi Pelanggan Baru', current: 850, target: 1000, deadline: '2024-12-31', category: 'Pertumbuhan' },
];

export const MOCK_GOALS_ENTERPRISE: Goal[] = [
  { id: '1', title: 'Ekspansi Pasar Asia', current: 12000000000, target: 50000000000, deadline: '2025-12-31', category: 'Strategi Global' },
  { id: '2', title: 'Optimasi ROI Teknologi', current: 12, target: 20, deadline: '2024-12-31', category: 'Investasi' },
  { id: '3', title: 'Skor ESG (Lingkungan)', current: 70, target: 95, deadline: '2024-10-15', category: 'Kepatuhan' },
];

export const MOCK_NOTIFICATIONS_BASIC: Notification[] = [
  { id: '1', title: 'Catat Pengeluaran!', message: 'Jangan lupa catat pengeluaran makan siang hari ini.', type: 'info', read: false, timestamp: new Date() },
  { id: '2', title: 'Hebat!', message: 'Anda sudah menabung 50% dari target Dana Darurat.', type: 'success', read: false, timestamp: new Date() },
];

export const MOCK_NOTIFICATIONS_PRO: Notification[] = [
  { id: '1', title: 'Peringatan Margin', message: 'Margin produk kategori A turun 2% minggu ini. Cek HPP.', type: 'alert', read: false, timestamp: new Date() },
  { id: '2', title: 'Pengingat Pajak', message: 'Pembayaran PPN masa jatuh tempo dalam 3 hari.', type: 'info', read: false, timestamp: new Date() },
];

export const MOCK_NOTIFICATIONS_ENTERPRISE: Notification[] = [
  { id: '1', title: 'Kepatuhan Kritis', message: 'Laporan Audit Q3 memerlukan persetujuan CFO segera.', type: 'alert', read: false, timestamp: new Date() },
  { id: '2', title: 'Volatilitas Pasar', message: 'AI memprediksi fluktuasi mata uang berdampak pada divisi Ekspor.', type: 'info', read: false, timestamp: new Date() },
];

export const MOCK_ECO_STATS = {
  FREE_TRIAL: { paperSaved: 10, energySaved: 5, score: 20 },
  BASIC: { paperSaved: 120, energySaved: 45, score: 65 },
  PRO: { paperSaved: 450, energySaved: 120, score: 78 },
  ENTERPRISE: { carbonCredit: 2500, esgScore: 88, score: 92 }
};

// Base data for Basic tier
const BASIC_ANALYTICS = {
  summary: [
    { label: 'Total Pemasukan', value: 'Rp 12.500.000', change: '+12%', trend: 'up' },
    { label: 'Total Pengeluaran', value: 'Rp 8.200.000', change: '-5%', trend: 'down' },
    { label: 'Sisa Uang', value: 'Rp 4.300.000', change: '+25%', trend: 'up' },
  ],
  revenueCurve: [
    { name: 'Jan', actual: 4000, forecast: 4000 },
    { name: 'Feb', actual: 3000, forecast: 3000 },
    { name: 'Mar', actual: 5500, forecast: 5500 },
    { name: 'Apr', actual: 4500, forecast: 4500 },
    { name: 'Mei', actual: 6000, forecast: 6000 },
    { name: 'Jun', actual: 8000, forecast: 8000 },
    { name: 'Jul', actual: null, forecast: 8500 }, // Forecast only
    { name: 'Aug', actual: null, forecast: 9200 },
    { name: 'Sep', actual: null, forecast: 10500 },
  ],
  spendingDNA: [
    { name: 'Bahan Baku', value: 45, color: '#8ECAE6' },
    { name: 'Operasional', value: 25, color: '#FF8FAB' },
    { name: 'Gaji', value: 20, color: '#A7D7C5' },
    { name: 'Marketing', value: 10, color: '#CDB4DB' },
  ]
};

export const MOCK_ANALYTICS_DATA = {
  FREE_TRIAL: BASIC_ANALYTICS, // Free trial uses basic data
  BASIC: BASIC_ANALYTICS,
  PRO: {
    summary: [
      { label: 'Total Revenue', value: 'Rp 458 Juta', change: '+8.2%', trend: 'up' },
      { label: 'Gross Profit', value: 'Rp 185 Juta', change: '+12.5%', trend: 'up' },
      { label: 'Net Margin', value: '24.8%', change: '+1.2%', trend: 'up' },
    ],
    revenueCurve: [
      { name: 'Week 1', actual: 45, forecast: 45 },
      { name: 'Week 2', actual: 52, forecast: 52 },
      { name: 'Week 3', actual: 48, forecast: 48 },
      { name: 'Week 4', actual: 61, forecast: 61 },
      { name: 'Week 5', actual: 55, forecast: 55 },
      { name: 'Week 6', actual: 67, forecast: 67 },
      { name: 'Week 7', actual: null, forecast: 72 },
      { name: 'Week 8', actual: null, forecast: 78 },
    ],
    spendingDNA: [
      { name: 'COGS', value: 40, color: '#8ECAE6' },
      { name: 'R&D', value: 20, color: '#FF8FAB' },
      { name: 'Marketing', value: 25, color: '#A7D7C5' },
      { name: 'Legal', value: 15, color: '#CDB4DB' },
    ],
    profitAndLoss: [
      { month: 'Okt', revenue: 320, cogs: 140, opex: 80, netProfit: 100 },
      { month: 'Nov', revenue: 350, cogs: 150, opex: 85, netProfit: 115 },
      { month: 'Des', revenue: 410, cogs: 170, opex: 90, netProfit: 150 },
    ],
    revenueExpenses: [
      { month: 'Okt', revenue: 320, expenses: 220 },
      { month: 'Nov', revenue: 350, expenses: 235 },
      { month: 'Des', revenue: 410, expenses: 260 },
    ]
  },
  ENTERPRISE: {
    summary: [
      { label: 'Consolidated Rev.', value: 'Rp 142 M', change: '+5.4%', trend: 'up' },
      { label: 'Group EBITDA', value: 'Rp 48 M', change: '+3.1%', trend: 'up' },
      { label: 'Risk Score', value: 'Low (12)', change: '-2 pts', trend: 'down' },
    ],
    revenueCurve: [
      { name: 'Q1', actual: 450, forecast: 450 },
      { name: 'Q2', actual: 480, forecast: 480 },
      { name: 'Q3', actual: 520, forecast: 520 },
      { name: 'Q4', actual: null, forecast: 580 },
    ],
    spendingDNA: [
      { name: 'Production', value: 35, color: '#8ECAE6' },
      { name: 'Logistics', value: 30, color: '#FF8FAB' },
      { name: 'Marketing', value: 20, color: '#A7D7C5' },
      { name: 'Compliance', value: 15, color: '#CDB4DB' },
    ],
    historicalPerformance: [
      { year: '2020', revenueGrowth: 12, ebitda: 35, riskScore: 45 },
      { year: '2021', revenueGrowth: 18, ebitda: 42, riskScore: 35 },
      { year: '2022', revenueGrowth: 15, ebitda: 38, riskScore: 32 },
      { year: '2023', revenueGrowth: 22, ebitda: 50, riskScore: 20 },
      { year: '2024', revenueGrowth: 28, ebitda: 65, riskScore: 12 },
    ]
  }
};