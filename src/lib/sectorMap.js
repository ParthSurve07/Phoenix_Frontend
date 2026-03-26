export const sectorMap = {
  // IT
  TCS: "Information Technology",
  INFY: "Information Technology",
  WIPRO: "Information Technology",
  HCLTECH: "Information Technology",
  TECHM: "Information Technology",
  LTIM: "Information Technology",
  MPHASIS: "Information Technology",
  COFORGE: "Information Technology",
  PERSISTENT: "Information Technology",

  // Banking & Finance
  HDFCBANK: "Banking & Finance",
  ICICIBANK: "Banking & Finance",
  SBIN: "Banking & Finance",
  AXISBANK: "Banking & Finance",
  KOTAKBANK: "Banking & Finance",
  BANKBARODA: "Banking & Finance",
  PNB: "Banking & Finance",
  CANBK: "Banking & Finance",
  FEDERALBNK: "Banking & Finance",
  INDUSINDBK: "Banking & Finance",
  PFC: "Banking & Finance",
  RECLTD: "Banking & Finance",

  // Energy & Power
  RELIANCE: "Energy & Power",
  ONGC: "Energy & Power",
  NTPC: "Energy & Power",
  POWERGRID: "Energy & Power",
  ADANIPOWER: "Energy & Power",
  ADANIGREEN: "Energy & Power",
  TATAPOWER: "Energy & Power",
  COALINDIA: "Energy & Power",
  IOC: "Energy & Power",
  BPCL: "Energy & Power",
  HPCL: "Energy & Power",
  GAIL: "Energy & Power",

  // Auto
  TATAMOTORS: "Automobile",
  MARUTI: "Automobile",
  BAJAJ_AUTO: "Automobile",
  HEROMOTOCO: "Automobile",
  EICHERMOT: "Automobile",
  ASHOKLEY: "Automobile",
  TVSMOTOR: "Automobile",
  TMPV: "Automobile",
  TMCV: "Automobile",

  // FMCG
  HINDUNILVR: "FMCG",
  ITC: "FMCG",
  NESTLEIND: "FMCG",
  BRITANNIA: "FMCG",
  DABUR: "FMCG",
  MARICO: "FMCG",
  COLPAL: "FMCG",

  // Pharma
  SUNPHARMA: "Pharma",
  DRREDDY: "Pharma",
  CIPLA: "Pharma",
  DIVISLAB: "Pharma",
  AUROPHARMA: "Pharma",
  LUPIN: "Pharma",
  BIOCON: "Pharma",

  // Infrastructure & Real Estate
  ADANIENT: "Infrastructure",
  ADANIPORTS: "Infrastructure",
  ANANTRAJ: "Infrastructure & Real Estate",
  DLF: "Infrastructure & Real Estate",
  GODREJPROP: "Infrastructure & Real Estate",
  OBEROIRLTY: "Infrastructure & Real Estate",
  LT: "Infrastructure",

  // Metals & Mining
  TATASTEEL: "Metals & Mining",
  JSWSTEEL: "Metals & Mining",
  HINDALCO: "Metals & Mining",
  VEDL: "Metals & Mining",
  SAIL: "Metals & Mining",
  NMDC: "Metals & Mining",

  // Telecom
  BHARTIARTL: "Telecom",
  IDEA: "Telecom",

  // Consumer & Retail
  TITAN: "Consumer & Retail",
  TRENT: "Consumer & Retail",
  DMART: "Consumer & Retail",
  NYKAA: "Consumer & Retail",
  ZOMATO: "Consumer & Retail",
};

export const sectorColors = {
  "Information Technology": { bg: "bg-blue-50", text: "text-blue-700", bar: "#3b82f6" },
  "Banking & Finance": { bg: "bg-green-50", text: "text-green-700", bar: "#22c55e" },
  "Energy & Power": { bg: "bg-orange-50", text: "text-orange-700", bar: "#f97316" },
  "Automobile": { bg: "bg-purple-50", text: "text-purple-700", bar: "#a855f7" },
  "FMCG": { bg: "bg-pink-50", text: "text-pink-700", bar: "#ec4899" },
  "Pharma": { bg: "bg-teal-50", text: "text-teal-700", bar: "#14b8a6" },
  "Infrastructure & Real Estate": { bg: "bg-yellow-50", text: "text-yellow-700", bar: "#eab308" },
  "Infrastructure": { bg: "bg-yellow-50", text: "text-yellow-700", bar: "#eab308" },
  "Metals & Mining": { bg: "bg-slate-100", text: "text-slate-700", bar: "#64748b" },
  "Telecom": { bg: "bg-indigo-50", text: "text-indigo-700", bar: "#6366f1" },
  "Consumer & Retail": { bg: "bg-rose-50", text: "text-rose-700", bar: "#f43f5e" },
  "Other": { bg: "bg-amber-50", text: "text-amber-700", bar: "#d97706" },
};

export const getSector = (symbol) => {
  const clean = symbol.replace("-EQ", "").replace("-BE", "").toUpperCase();
  return sectorMap[clean] || "Other";
};