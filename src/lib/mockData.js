import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const { data, isLoading } = useQuery({
  queryKey: ["portfolio"],
  queryFn: () => api.get("/portfolio").then(r => r.data.data),
});

// export const mockPortfolio = [
//   {
//     symbol: "TCS",
//     name: "Tata Consultancy Services",
//     quantity: 10,
//     avgPrice: 3200,
//     currentPrice: 3350,
//     pnl: 1500,
//     pnlPercent: 4.69,
//     allocation: 30.2,
//   },
//   {
//     symbol: "INFY",
//     name: "Infosys Ltd",
//     quantity: 15,
//     avgPrice: 1400,
//     currentPrice: 1380,
//     pnl: -300,
//     pnlPercent: -1.43,
//     allocation: 18.7,
//   },
//   {
//     symbol: "HDFC",
//     name: "HDFC Bank",
//     quantity: 8,
//     avgPrice: 1600,
//     currentPrice: 1725,
//     pnl: 1000,
//     pnlPercent: 7.81,
//     allocation: 17.9,
//   },
//   {
//     symbol: "RELIANCE",
//     name: "Reliance Industries",
//     quantity: 5,
//     avgPrice: 2800,
//     currentPrice: 2950,
//     pnl: 750,
//     pnlPercent: 5.36,
//     allocation: 15.1,
//   },
//   {
//     symbol: "WIPRO",
//     name: "Wipro Ltd",
//     quantity: 20,
//     avgPrice: 420,
//     currentPrice: 395,
//     pnl: -500,
//     pnlPercent: -5.95,
//     allocation: 9.6,
//   },
//   {
//     symbol: "ICICIBANK",
//     name: "ICICI Bank",
//     quantity: 12,
//     avgPrice: 950,
//     currentPrice: 1010,
//     pnl: 720,
//     pnlPercent: 6.32,
//     allocation: 8.5,
//   },
// ];

// export const mockPredictions = [
//   {
//     symbol: "TCS",
//     name: "Tata Consultancy Services",
//     mlProbability: 0.72,
//     trendScore: 0.68,
//     momentumScore: 0.71,
//     hybridScore: 0.70,
//     signal: "BUY",
//     lastUpdated: "2025-03-24",
//   },
//   {
//     symbol: "INFY",
//     name: "Infosys Ltd",
//     mlProbability: 0.41,
//     trendScore: 0.38,
//     momentumScore: 0.44,
//     hybridScore: 0.41,
//     signal: "NEUTRAL",
//     lastUpdated: "2025-03-24",
//   },
//   {
//     symbol: "HDFC",
//     name: "HDFC Bank",
//     mlProbability: 0.78,
//     trendScore: 0.74,
//     momentumScore: 0.80,
//     hybridScore: 0.77,
//     signal: "BUY",
//     lastUpdated: "2025-03-24",
//   },
//   {
//     symbol: "RELIANCE",
//     name: "Reliance Industries",
//     mlProbability: 0.29,
//     trendScore: 0.31,
//     momentumScore: 0.27,
//     hybridScore: 0.29,
//     signal: "SELL",
//     lastUpdated: "2025-03-24",
//   },
//   {
//     symbol: "WIPRO",
//     name: "Wipro Ltd",
//     mlProbability: 0.35,
//     trendScore: 0.33,
//     momentumScore: 0.30,
//     hybridScore: 0.33,
//     signal: "SELL",
//     lastUpdated: "2025-03-24",
//   },
//   {
//     symbol: "ICICIBANK",
//     name: "ICICI Bank",
//     mlProbability: 0.61,
//     trendScore: 0.58,
//     momentumScore: 0.63,
//     hybridScore: 0.60,
//     signal: "BUY",
//     lastUpdated: "2025-03-24",
//   },
// ];

// export const mockRisk = {
//   overallRisk: "Moderate",
//   riskScore: 58,
//   summary:
//     "Your portfolio is moderately concentrated in the IT sector. Consider diversifying into other sectors to reduce risk.",
//   insights: [
//     {
//       type: "warning",
//       title: "Sector Concentration",
//       description:
//         "48.3% of your portfolio is in IT sector stocks (TCS, INFY, WIPRO). High sector concentration increases volatility risk.",
//     },
//     {
//       type: "warning",
//       title: "Underperforming Holdings",
//       description:
//         "WIPRO is down 5.95% and INFY is down 1.43%. Combined they represent 28.3% of your portfolio.",
//     },
//     {
//       type: "suggestion",
//       title: "Diversification Opportunity",
//       description:
//         "Adding exposure to FMCG, Pharma, or Infrastructure sectors could reduce overall portfolio volatility.",
//     },
//     {
//       type: "suggestion",
//       title: "Strong Performers",
//       description:
//         "HDFC and ICICIBANK are showing strong momentum. Banking sector allocation looks healthy at 26.4%.",
//     },
//   ],
// };