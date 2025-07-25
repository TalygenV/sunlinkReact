// import React, { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   Expand,
//   X,
//   Shield,
//   Check,
//   Calculator,
//   CreditCard,
//   Lock,
//   DollarSign,
//   Award,
//   Zap,
// } from "lucide-react";

// interface SolarCustomizationProps {
//   selectedPlanDynamic: string;
//   onPlanChange: (plan: string) => void;
//   totalPrice: number;
//   solarOnlyPrice: number;
//   batteryTotalPrice: number;
//   batteryCountDynamic: number;
//   onFinancingApproved?: (value: string) => void;
//   showIncentives: boolean;
//   netCostAfterIncentives: number;
//   handlePlanChange: (plan: string) => void;
// }
// const SolarCustomization: React.FC<SolarCustomizationProps> = ({
//   selectedPlanDynamic,
//   handlePlanChange,
//   onPlanChange,
//   totalPrice,
//   solarOnlyPrice,
//   batteryTotalPrice,
//   batteryCountDynamic,
//   onFinancingApproved,
//   showIncentives,
//   netCostAfterIncentives,
// }) => {
//   const [batteryCount, setBatteryCount] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState("15-years");
//   const [results, setResults] = useState<any[]>([]);
//   interface LoanOption {
//     name: string;
//     badge: string;
//     rate: number;
//     key: string;
//     icon: React.ElementType;
//     loanDetails: {
//       lowestPayment: any;
//       paymentWithTaxCredit: any;
//       paymentWithoutTaxCredit: any;
//     };
//     disclosures: any;
//   }
//   const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
//   type ToggleKey =
//     | "solarLayout"
//     | "totalCost"
//     | "evCharger"
//     | "roofReplacement"
//     | "electricalPanel";
//   const displayPrice = totalPrice;
//   const [toggleStates, setToggleStates] = useState<Record<ToggleKey, boolean>>({
//     solarLayout: false,
//     totalCost: false,
//     evCharger: false,
//     roofReplacement: false,
//     electricalPanel: false,
//   });

//   const [formData, setFormData] = useState({
//     cardholderName: "",
//     email: "",
//     cardNumber: "",
//     expiryDate: "",
//     cvc: "",
//   });

//   const handleToggle = (key: ToggleKey) => {
//     setToggleStates((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const incrementBattery = () =>
//     setBatteryCount((prev) => Math.min(prev + 1, 5));
//   const decrementBattery = () =>
//     setBatteryCount((prev) => Math.max(prev - 1, 1));

//   const calculateTotalCost = () => {
//     let total = 22400 + batteryCount * 15000;
//     if (toggleStates.evCharger) total += 2500;
//     if (toggleStates.electricalPanel) total += 3500;
//     return total;
//   };

//   const totalCost = calculateTotalCost();
//   const afterTaxCredit = Math.round(totalCost * 0.7);
//   useEffect(() => {
//     const loadData = async () => {
//       const options = await fetchAPRTerms();
//       setLoanOptions(options);
//     };

//     loadData();
//   }, []);
//   interface Product {
//     apr: number;
//     isACH: boolean;
//     productType: string;
//     productMinLoanAmount: number;
//     productMaxLoanAmount: number;
//     stateName: string;
//     term: number;
//     name: string;
//     projectCategory?: string;
//   }
//   var filteredProductsincheck = {};
//   const fetchAPRTerms = async () => {
//     debugger;
//     try {
//       const fetchJSON = async (url: string, body: any) => {
//         const res = await fetch(url, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         });
//         if (!res.ok) {
//           const errorData = await res.json().catch(() => null);
//           throw new Error(
//             errorData?.error || `HTTP error! status: ${res.status}`
//           );
//         }
//         return res.json();
//       };

//       console.log("Step 1: Fetch products and access token");
//       const initialRes = await fetchJSON(
//         "https://us-central1-sunlink-21942.cloudfunctions.net/fetchProducts",
//         {}
//       );

//       const products = initialRes?.product_response?.products || [];
//       const sfAccessToken = initialRes?.access_token;
//       const loanAmount = displayPrice;
//       const selectedState =
//         JSON.parse(localStorage.getItem("solarSetup") || "{}")?.state ||
//         "California";

//       localStorage.setItem("sfAccessToken", sfAccessToken);
//       console.log("selectedState:", selectedState);

//       const allowedTerms = [60, 180, 300];

//       const eligibleProducts = products?.filter(
//         (item: Product) =>
//           item.isACH &&
//           item.productType.toLowerCase() === "solar" &&
//           item.stateName.toLowerCase() === selectedState.toLowerCase()
//       );

//       const filteredProducts: Product[] = [];

//       allowedTerms.forEach((term) => {
//         const productsForTerm = eligibleProducts.filter(
//           (item: Product) => item.term === term
//         );
//         if (productsForTerm.length > 0) {
//           const minApr = Math.min(
//             ...productsForTerm.map((item: Product) => item.apr)
//           );
//           const bestProductsForTerm = productsForTerm.filter(
//             (item: Product) => item.apr === minApr
//           );
//           filteredProducts.push(...bestProductsForTerm);
//         }
//       });

//       if (filteredProducts.length === 0) {
//         console.log("No eligible products found for the selected state.");
//         return [];
//       }

//       const resultPromises = filteredProducts.map(async (product: Product) => {
//         try {
//           const data = await fetchJSON(
//             "https://us-central1-sunlink-21942.cloudfunctions.net/calculateLoanProduct",
//             {
//               sfAccessToken: `Bearer ${sfAccessToken}`,
//               term: product.term,
//               stateName: product.stateName,
//               name: product.name,
//               loanAmount: totalCost,
//               apr: product.apr,
//               productType: product.productType,
//               projectCategory: product.projectCategory || "Solar",
//             }
//           );
//           debugger;
//           return {
//             result: data,
//             name: product.name,
//             apr: product.apr,
//             term: product.term,
//           };
//         } catch (error: any) {
//           console.warn("Failed to calculate loan product:", error.message);
//           return null;
//         }
//       });

//       const rawResults = (await Promise.all(resultPromises)).filter(Boolean);

//       const icons = [DollarSign, Award, Zap];

//       const results = rawResults.map((item, index) => ({
//         name: item?.name ?? "Unknown",
//         badge: `${(item?.term ?? 0) / 12}-Year`,
//         rate: item?.apr ?? 0,
//         key: `${item?.name ?? "Unknown"}-${item?.term ?? 0}`,
//         icon: icons[index % icons.length],
//         loanDetails: {
//           lowestPayment: item?.result?.monthlyPayment || 0,
//           paymentWithTaxCredit: item?.result?.monthlyPayment || 0,
//           paymentWithoutTaxCredit: item?.result?.escalatedMonthlyPayment || 0,
//         },
//         disclosures: item?.result?.disclosures || [],
//       }));

//       setResults(results); // Optional: for useState if applicable
//       return results;
//     } catch (error: any) {
//       console.error("Error in fetchAPRTerms:", error.message);
//       return [];
//     }
//   };

//   return (
//     <section className="py-24 sm:py-40 bg-slate-900 relative min-h-screen">
//       <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-400 mb-2">
//           <span className="uppercase tracking-wide text-xs">
//             Recommendation
//           </span>
//           <span className="px-3">&gt;</span>
//           <span className="text-white uppercase">Customize</span>
//         </div>

//         {/* Title */}
//         <h1 className="py-6 text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-white font-normal tracking-tight">
//           Customize your solar system
//         </h1>

//         {/* Step Navigation */}
//         <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">
//           {/* Step 1 */}
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-full bg-orange-500 border border-white text-black text-xs font-bold flex items-center justify-center">
//               <Check size={12} />
//             </div>
//             <span className="text-white">Design</span>
//           </div>
//           <div className="flex-1 h-0.5 bg-white min-w-[40px]">
//             <div className="w-1/2 h-0.5 bg-orange-500"></div>
//           </div>

//           {/* Step 2 */}
//           <div className="flex items-center gap-2 text-white">
//             <div className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
//               2
//             </div>
//             <span>Batteries</span>
//           </div>
//           <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>

//           {/* Step 3 */}
//           <div className="flex items-center gap-2 text-white">
//             <div className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
//               3
//             </div>
//             <span>Choose Your Plan</span>
//           </div>
//           <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>

//           {/* Step 4 */}
//           <div className="flex items-center gap-2 text-white">
//             <div className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
//               4
//             </div>
//             <span>Customer Portal</span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 items-start">
//           {/* Left Panel */}
//           <div className="w-full space-y-4">
//             {/* Overview Section */}
//             <div className="w-full rounded-xl relative p-6 text-white border border-neutral-600">
//               <div className="text-white text-lg font-medium gap-2 mb-6">
//                 <span className="text-2xl text-orange-400">Overview</span>
//               </div>

//               {/* Step 1 - Solar Design */}
//               <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg w-full">
//                 <div className="flex mb-4">
//                   <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
//                     <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                     Step 1
//                   </p>
//                 </div>

//                 <div className="flex justify-between mb-4">
//                   <div className="text-gray-300">Your Solar Design</div>
//                   <div className="text-gray-300 flex items-center">
//                     <span className="mr-2 text-sm text-gray-300">
//                       Solar Layout
//                     </span>
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={toggleStates.solarLayout}
//                         onChange={() => handleToggle("solarLayout")}
//                         className="sr-only peer"
//                       />
//                       <div className="relative w-9 h-5 border-2 border-gray-400 bg-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                     <span className="ml-2 text-sm text-gray-300">
//                       Savings Chart
//                     </span>
//                   </div>
//                 </div>

//                 {/* 3D Models Box */}
//                 <div className="relative bg-gray-400 rounded-md aspect-square flex items-center justify-center text-white text-lg w-full h-[496px]">
//                   Customized Solar Design
//                   <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="absolute top-2 right-2 hover:bg-gray-700 rounded p-1"
//                     title="Expand"
//                   >
//                     <Expand className="h-5 w-5 text-white" />
//                   </button>
//                 </div>

//                 <div className="text-sm text-gray-300 py-4">
//                   *Interactive solar panel layout. Expand to view it full
//                   screen.
//                 </div>

//                 <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
//                   <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
//                     <span className="text-white text-xs">i</span>
//                   </div>
//                   Disclaimer: Final layout may change based on city, utility,
//                   roof conditions, and code. SunLink Verified Installers will
//                   optimize it for performance, aesthetics, and compliance.
//                 </div>
//               </div>

//               {/* Step 2 - Confirm Order */}
//               <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg w-full mt-4">
//                 <div className="flex mb-4">
//                   <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
//                     <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                     Step 2
//                   </p>
//                 </div>

//                 <div className="flex justify-between mb-4">
//                   <div className="text-gray-300">Confirm your order</div>
//                 </div>

//                 <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3 w-full">
//                   <div className="w-full sm:w-[calc(50%-0.75rem)]">
//                     <div className="grid grid-cols-2 w-full gap-4">
//                       {/* Panels */}
//                       <div className="bg-slate-700 text-white rounded-xl p-4 border border-neutral-600">
//                         <div className="flex justify-between items-center">
//                           <span className="text-xs text-gray-400">Panels</span>
//                         </div>
//                         <div className="text-4xl pt-6">32</div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-xs text-gray-400">
//                             12.8kW System
//                           </span>
//                         </div>
//                       </div>

//                       {/* Battery Storage */}
//                       <div className="bg-slate-700 text-white rounded-xl p-4 border border-neutral-600">
//                         <div className="flex justify-between items-center">
//                           <span className="text-xs text-gray-400">
//                             Battery Storage
//                           </span>
//                         </div>

//                         <div className="text-4xl pt-6 flex justify-between items-center">
//                           {batteryCount}
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={decrementBattery}
//                               className="bg-gray-600 hover:bg-gray-500 rounded-full h-8 w-8 flex items-center justify-center"
//                             >
//                               <span className="text-white text-lg">-</span>
//                             </button>
//                             <button
//                               onClick={incrementBattery}
//                               className="bg-gray-600 hover:bg-gray-500 rounded-full h-8 w-8 flex items-center justify-center"
//                             >
//                               <span className="text-white text-lg">+</span>
//                             </button>
//                           </div>
//                         </div>

//                         <div className="flex justify-between items-center">
//                           <span className="text-xs text-gray-400">
//                             -8 hours backup
//                           </span>
//                         </div>
//                       </div>

//                       {/* Solar System Cost */}
//                       <div className="bg-emerald-900 text-white rounded-xl p-4 border border-neutral-600">
//                         <div className="text-xs text-gray-400">
//                           Solar System Costs ($)
//                         </div>
//                         <div className="text-4xl pt-6">22,400</div>
//                       </div>

//                       {/* Battery Cost */}
//                       <div className="bg-emerald-900 text-white rounded-xl p-4 border border-neutral-600">
//                         <div className="text-xs text-gray-400">
//                           Battery Cost ($)
//                         </div>
//                         <div className="text-4xl pt-6">
//                           {(batteryCount * 15000).toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Total System Cost */}
//                   <div className="bg-orange-900 text-white rounded-xl p-4 border border-neutral-600 w-full sm:w-[calc(50%-0.75rem)]">
//                     <div className="flex justify-between items-center">
//                       <span className="text-xs text-gray-400">
//                         Total System Cost ($)
//                       </span>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={toggleStates.totalCost}
//                           onChange={() => handleToggle("totalCost")}
//                           className="sr-only peer"
//                         />
//                         <div className="relative w-9 h-5 border-2 border-gray-400 bg-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//                       </label>
//                     </div>
//                     <div className="text-4xl pt-32">
//                       {totalCost.toLocaleString()}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-xs text-gray-400">
//                         Before Incentives
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Add-on Services */}
//                 <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5">
//                   <div className="text-left text-gray-300 text-base font-normal flex items-start mb-4">
//                     <span className="mr-3 text-2xl">+</span>Add-on Services
//                   </div>

//                   {/* EV Charger */}
//                   <div className="bg-slate-700 p-3 rounded-md flex justify-between mb-5">
//                     <div className="flex w-full">
//                       <div className="mr-3 bg-white p-2 rounded-md w-8 h-8 flex items-center justify-center">
//                         <CreditCard size={16} className="text-black" />
//                       </div>
//                       <div className="w-full">
//                         <p className="text-gray-300">EV Charger Installation</p>
//                         <p className="text-sm text-gray-300">$2,500</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={toggleStates.evCharger}
//                           onChange={() => handleToggle("evCharger")}
//                           className="sr-only peer"
//                         />
//                         <div className="relative w-9 h-5 border-2 border-gray-400 bg-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Roof Replacement */}
//                   <div className="bg-slate-700 p-3 rounded-md flex justify-between mb-5">
//                     <div className="flex w-full">
//                       <div className="mr-3 bg-white p-2 rounded-md w-8 h-8 flex items-center justify-center">
//                         <div className="w-4 h-4 bg-gray-800 rounded"></div>
//                       </div>
//                       <div className="w-full">
//                         <p className="text-gray-300">Roof Replacement</p>
//                         <p className="text-sm text-gray-300">
//                           Generate custom quote
//                         </p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={toggleStates.roofReplacement}
//                           onChange={() => handleToggle("roofReplacement")}
//                           className="sr-only peer"
//                         />
//                         <div className="relative w-9 h-5 border-2 border-gray-400 bg-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Electrical Panel Upgrade */}
//                   <div className="bg-slate-700 p-3 rounded-md flex justify-between mb-5">
//                     <div className="flex w-full">
//                       <div className="mr-3 bg-white p-2 rounded-md w-8 h-8 flex items-center justify-center">
//                         <div className="w-4 h-4 bg-yellow-500 rounded"></div>
//                       </div>
//                       <div className="w-full">
//                         <p className="text-gray-300 flex items-center">
//                           Electrical Panel Upgrade
//                           <span className="ml-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
//                             i
//                           </span>
//                         </p>
//                         <p className="text-sm text-gray-300">$3,500</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={toggleStates.electricalPanel}
//                           onChange={() => handleToggle("electricalPanel")}
//                           className="sr-only peer"
//                         />
//                         <div className="relative w-9 h-5 border-2 border-gray-400 bg-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Tax Credit Disclaimer */}
//                 <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
//                   <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
//                     <span className="text-white text-xs">i</span>
//                   </div>
//                   Tax Credit Disclaimer: The 30% federal tax credit is subject
//                   to eligibility requirements and may vary based on your tax
//                   situation. Consult with a tax professional to determine your
//                   specific benefits. Local and utility incentives vary by
//                   location and may have additional requirements or limitations.
//                 </div>

//                 {/* Urgency Notice */}
//                 <div className="bg-red-900 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
//                   <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5">
//                     <span className="text-white text-xs">!</span>
//                   </div>
//                   Act fast - the 30% federal solar tax credit expires at the end
//                   of 2025, and you must be fully signed up and have your system
//                   installed before year-end to claim this significant savings.
//                 </div>

//                 {/* Warranty Protection */}
//                 <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5">
//                   <div className="text-left text-gray-300 text-base font-normal flex items-start mb-4">
//                     <Shield className="mr-3 w-5 h-5" />
//                     Warranty Protection
//                   </div>

//                   <div className="grid grid-cols-2 w-full gap-4">
//                     {/* Product Warranty */}
//                     <div className="bg-slate-700 p-3 rounded-md flex justify-between">
//                       <div className="flex w-full">
//                         <div className="mr-3 p-1 w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
//                           <div className="w-4 h-4 bg-white rounded"></div>
//                         </div>
//                         <div className="w-full">
//                           <p className="text-gray-300">Product Warranty</p>
//                           <p className="text-sm text-gray-300">
//                             Complete coverage for solar panels against
//                             manufacturing defects.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="w-24">
//                         <p className="text-sm text-gray-300 border rounded-xl px-2 py-1">
//                           25 years
//                         </p>
//                       </div>
//                     </div>

//                     {/* Performance Warranty */}
//                     <div className="bg-slate-700 p-3 rounded-md flex justify-between">
//                       <div className="flex w-full">
//                         <div className="mr-3 p-1 w-10 h-10 bg-green-500 rounded flex items-center justify-center">
//                           <div className="w-4 h-4 bg-white rounded"></div>
//                         </div>
//                         <div className="w-full">
//                           <p className="text-gray-300">Performance Warranty</p>
//                           <p className="text-sm text-gray-300">
//                             Guaranteed 80% power output after 25 years of
//                             operation.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="w-24">
//                         <p className="text-sm text-gray-300 border rounded-xl px-2 py-1">
//                           25 years
//                         </p>
//                       </div>
//                     </div>

//                     {/* Roof Warranty */}
//                     <div className="bg-slate-700 p-3 rounded-md flex justify-between">
//                       <div className="flex w-full">
//                         <div className="mr-3 p-1 w-10 h-10 bg-purple-500 rounded flex items-center justify-center">
//                           <div className="w-4 h-4 bg-white rounded"></div>
//                         </div>
//                         <div className="w-full">
//                           <p className="text-gray-300">Roof Warranty</p>
//                           <p className="text-sm text-gray-300">
//                             Comprehensive workmanship guarantee on all
//                             installation work.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="w-24">
//                         <p className="text-sm text-gray-300 border rounded-xl px-2 py-1">
//                           10 years
//                         </p>
//                       </div>
//                     </div>

//                     {/* Battery Warranty */}
//                     <div className="bg-slate-700 p-3 rounded-md flex justify-between">
//                       <div className="flex w-full">
//                         <div className="mr-3 p-1 w-10 h-10 bg-yellow-500 rounded flex items-center justify-center">
//                           <div className="w-4 h-4 bg-white rounded"></div>
//                         </div>
//                         <div className="w-full">
//                           <p className="text-gray-300">Battery Warranty</p>
//                           <p className="text-sm text-gray-300">
//                             Tesla Powerwall warranty with 70% capacity retention
//                             guarantee.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="w-24">
//                         <p className="text-sm text-gray-300 border rounded-xl px-2 py-1">
//                           10 years
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-3 w-full gap-4 mt-4">
//                     <div className="bg-slate-600 p-3 rounded-xl text-left text-white text-xs font-normal flex items-center">
//                       <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
//                       24/7 Monitoring
//                     </div>
//                     <div className="bg-slate-600 p-3 rounded-xl text-left text-white text-xs font-normal flex items-center">
//                       <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
//                       Free Maintenance
//                     </div>
//                     <div className="bg-slate-600 p-3 rounded-xl text-left text-white text-xs font-normal flex items-center">
//                       <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
//                       Remote Diagnostics
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Step 3 - Payment Plans */}
//               <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg w-full mt-4">
//                 <div className="flex mb-4">
//                   <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
//                     <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                     Step 3
//                   </p>
//                 </div>

//                 <div className="text-gray-300 mb-2 text-lg">
//                   Choose your payment plan
//                 </div>
//                 <div className="text-gray-100 text-base mb-4">
//                   Select the financing option that works best for you
//                 </div>

//                 {/* How Re-amortizing Solar Loans Work */}
//                 <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5">
//                   <div className="text-left text-gray-300 text-base font-normal flex items-start mb-4">
//                     <Calculator className="mr-3 w-5 h-5" />
//                     How Re-amortizing Solar Loans Work
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
//                     {/* Step 1 */}
//                     <div className="bg-slate-600 p-3 rounded-xl">
//                       <div className="flex mb-4">
//                         <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
//                           <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                           1
//                         </p>
//                       </div>
//                       <div className="w-full text-white text-sm font-normal mb-2">
//                         Months 1-16: Lowest Payment
//                       </div>
//                       <div className="w-full text-gray-300 text-xs font-normal">
//                         Your monthly payment remains fixed during the first 16
//                         months. During this period, you can apply your tax
//                         credit or make an optional lump sum payment. This
//                         reduces your total loan amount and adjusts your monthly
//                         payment after month 16.
//                       </div>
//                     </div>

//                     {/* Step 2 */}
//                     <div className="bg-slate-600 p-3 rounded-xl">
//                       <div className="flex mb-4">
//                         <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
//                           <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                           2
//                         </p>
//                       </div>
//                       <div className="w-full text-white text-sm font-normal mb-2">
//                         Months 16: Tax Credit Decision
//                       </div>
//                       <div className="w-full text-gray-300 text-xs font-normal">
//                         If eligible, you may claim the 30% federal solar tax
//                         credit. At this stage, you can choose to apply any
//                         received benefit toward your loan or keep it for other
//                         financial planning. (Consult your tax advisor for
//                         eligibility and timing.)
//                       </div>
//                     </div>

//                     {/* Step 3 */}
//                     <div className="bg-slate-600 p-3 rounded-xl">
//                       <div className="flex mb-4">
//                         <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
//                           <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                           3
//                         </p>
//                       </div>
//                       <div className="w-full text-white text-sm font-normal mb-2">
//                         Months 17+: Payment Adjusts
//                       </div>
//                       <div className="w-full text-gray-300 text-xs font-normal">
//                         Your monthly payment updates based on the total loan
//                         amount owed after you apply your tax credit, personal
//                         funds, or both. The more you apply, the lower your
//                         balance and monthly payment.
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-neutral-900 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
//                     <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
//                       <span className="text-white text-xs">i</span>
//                     </div>
//                     Industry Standard Structure: This re-amortizing structure is
//                     the standard for solar financing and is designed to work
//                     with the federal tax credit timeline, giving you maximum
//                     flexibility in how to use your tax savings.
//                   </div>
//                 </div>

//                 {/* Payment Plan Options */}
//                 <div className="py-4 w-full mt-4">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {/* 10 Years Plan */}
//                     {results?.map((option) => {
//                       const Icon = option.icon;
//                       return (
//                         <div
//                           className="bg-white relative rounded-2xl shadow-lg px-4 pt-8 pb-4"
//                           key={option.key || option.name}
//                         >
//                           <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
//                             Fastest Payoff
//                           </span>

//                           <div className="flex items-center space-x-3 mb-4">
//                             <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                               <span className="text-white text-xs">10</span>
//                             </div>
//                             <div>
//                               <div className="text-sm text-black font-medium">
//                                 {option.badge} - {option.name}
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 {option.rate}% APR
//                               </div>
//                             </div>
//                           </div>

//                           <div className="bg-gray-100 rounded-xl p-3 my-4 text-center">
//                             <p className="text-sm text-gray-500">
//                               Months 1–16 Payment
//                             </p>
//                             <p className="text-2xl font-medium text-gray-800">
//                               $
//                               {option.loanDetails.lowestPayment.toLocaleString(
//                                 "en-US",
//                                 {
//                                   maximumFractionDigits: 0,
//                                 }
//                               )}
//                               /mo
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               Lowest payment period
//                             </p>
//                             <div className="bg-gray-300 w-full h-px my-3"></div>
//                             <div className="mt-4 text-xs">
//                               <div className="flex justify-between">
//                                 <p className="text-gray-600">
//                                   Before tax credit
//                                 </p>
//                                 <p className="text-green-600">
//                                   $
//                                   {option.loanDetails.paymentWithoutTaxCredit.toLocaleString(
//                                     "en-US",
//                                     { maximumFractionDigits: 0 }
//                                   )}
//                                   /mo
//                                 </p>
//                               </div>
//                               <div className="flex justify-between">
//                                 <p className="text-gray-600">
//                                   After tax credit
//                                 </p>
//                                 <p className="text-green-600 opacity-75">
//                                   {" "}
//                                   $
//                                   {option.loanDetails.paymentWithTaxCredit.toLocaleString(
//                                     "en-US",
//                                     { maximumFractionDigits: 0 }
//                                   )}
//                                   /mo
//                                 </p>
//                               </div>
//                             </div>
//                           </div>

//                           <ul className="list-none text-xs space-y-2">
//                             <li className="flex items-center text-gray-500">
//                               <Check className="mr-3 h-4 w-4 text-green-500" />
//                               Lowest total interest paid
//                             </li>
//                             <li className="flex items-center text-gray-500">
//                               <Check className="mr-3 h-4 w-4 text-green-500" />
//                               Build equity fastest
//                             </li>
//                             <li className="flex items-center text-gray-500">
//                               <Check className="mr-3 h-4 w-4 text-green-500" />
//                               Highest monthly tax benefits
//                             </li>
//                             <li className="flex items-center text-gray-500">
//                               <Check className="mr-3 h-4 w-4 text-green-500" />
//                               Best for high-income households
//                             </li>
//                           </ul>

//                           <div className="bg-gray-100 mt-4 p-3 rounded-xl text-sm text-gray-600">
//                             <p className="text-red-500 font-medium">
//                               Recommended for:
//                             </p>
//                             Perfect if you want to own your system quickly and
//                             have strong monthly cash flow.
//                           </div>

//                           <button
//                             onClick={() => setSelectedPlan(option)}
//                             className={`w-full mt-4 py-2 rounded-lg text-xs flex items-center justify-center space-x-2 ${
//                               selectedPlan === "10-years"
//                                 ? "bg-blue-600 text-white"
//                                 : "bg-gray-800 text-white hover:bg-gray-700"
//                             }`}
//                           >
//                             <CreditCard className="w-4 h-4" />
//                             <span>Pre-Qualify Now</span>
//                           </button>
//                         </div>
//                       );
//                     })}

//                     {/* 15 Years Plan
//                     <div className="bg-white relative rounded-2xl shadow-lg px-4 pt-8 pb-4">
//                       <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full">
//                         Most Popular
//                       </span>

//                       <div className="flex items-center space-x-3 mb-4">
//                         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                           <span className="text-white text-xs">15</span>
//                         </div>
//                         <div>
//                           <div className="text-sm text-black font-medium">
//                             15 Years
//                           </div>
//                           <div className="text-xs text-gray-500">4.49% APR</div>
//                         </div>
//                       </div>

//                       <div className="bg-gray-100 rounded-xl p-3 my-4 text-center">
//                         <p className="text-sm text-gray-500">
//                           Months 1–16 Payment
//                         </p>
//                         <p className="text-2xl font-medium text-gray-800">
//                           $189/mo
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Lowest payment period
//                         </p>
//                         <div className="bg-gray-300 w-full h-px my-3"></div>
//                         <div className="mt-4 text-xs">
//                           <div className="flex justify-between">
//                             <p className="text-gray-600">Before tax credit</p>
//                             <p className="text-green-600">$299/mo</p>
//                           </div>
//                           <div className="flex justify-between">
//                             <p className="text-gray-600">After tax credit</p>
//                             <p className="text-green-600 opacity-75">$207/mo</p>
//                           </div>
//                         </div>
//                       </div>

//                       <ul className="list-none text-xs space-y-2">
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Balanced payment & savings
//                         </li>
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Moderate monthly commitment
//                         </li>
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Good interest savings
//                         </li>
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Flexible for most budgets
//                         </li>
//                       </ul>

//                       <div className="bg-gray-100 mt-4 p-3 rounded-xl text-sm text-gray-600">
//                         <p className="text-red-500 font-medium">
//                           Recommended for:
//                         </p>
//                         The sweet spot between affordability and total cost -
//                         chosen by 70% of our customers.
//                       </div>

//                       <button
//                         onClick={() => setSelectedPlan("15-years")}
//                         className={`w-full mt-4 py-2 rounded-lg text-xs flex items-center justify-center space-x-2 ${
//                           selectedPlan === "15-years"
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-800 text-white hover:bg-gray-700"
//                         }`}
//                       >
//                         <CreditCard className="w-4 h-4" />
//                         <span>Pre-Qualify Now</span>
//                       </button>
//                     </div>

//                     {/* 25 Years Plan */}
//                     {/* <div className="bg-white relative rounded-2xl shadow-lg px-4 pt-8 pb-4">
//                       <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
//                         Lowest Payment
//                       </span>

//                       <div className="flex items-center space-x-3 mb-4">
//                         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                           <span className="text-white text-xs">25</span>
//                         </div>
//                         <div>
//                           <div className="text-sm text-black font-medium">
//                             25 Years
//                           </div>
//                           <div className="text-xs text-gray-500">4.49% APR</div>
//                         </div>
//                       </div>

//                       <div className="bg-gray-100 rounded-xl p-3 my-4 text-center">
//                         <p className="text-sm text-gray-500">
//                           Months 1–16 Payment
//                         </p>
//                         <p className="text-2xl font-medium text-gray-800">
//                           $189/mo
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Lowest payment period
//                         </p>
//                         <div className="bg-gray-300 w-full h-px my-3"></div>
//                         <div className="mt-4 text-xs">
//                           <div className="flex justify-between">
//                             <p className="text-gray-600">Before tax credit</p>
//                             <p className="text-green-600">$209/mo</p>
//                           </div>
//                           <div className="flex justify-between">
//                             <p className="text-gray-600">After tax credit</p>
//                             <p className="text-green-600 opacity-75">$145/mo</p>
//                           </div>
//                         </div>
//                       </div>

//                       <ul className="list-none text-xs space-y-2">
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Lowest monthly payment
//                         </li>
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Immediate positive cashflow
//                         </li>
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Easier budget integration
//                         </li>
//                         <li className="flex items-center text-gray-500">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Long-term wealth building
//                         </li>
//                       </ul>

//                       <div className="bg-gray-100 mt-4 p-3 rounded-xl text-sm text-gray-600">
//                         <p className="text-red-500 font-medium">
//                           Recommended for:
//                         </p>
//                         Ideal if you want maximum monthly savings from day one
//                         with minimal payment stress.
//                       </div>

//                       <button
//                         onClick={() => setSelectedPlan("25-years")}
//                         className={`w-full mt-4 py-2 rounded-lg text-xs flex items-center justify-center space-x-2 ${
//                           selectedPlan === "25-years"
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-800 text-white hover:bg-gray-700"
//                         }`}
//                       >
//                         <CreditCard className="w-4 h-4" />
//                         <span>Pre-Qualify Now</span>
//                       </button>
//                     </div>  */}
//                   </div>
//                 </div>

//                 {/* Pay in Full Option */}
//                 <div className="w-full bg-white rounded-2xl px-6 mt-3 py-8 relative">
//                   <div className="absolute -top-4 left-6 bg-black text-white text-sm px-4 py-1 rounded-full shadow">
//                     Maximum Savings
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {/* Left: Features */}
//                     <div className="flex flex-col">
//                       <div className="flex items-center space-x-3 mb-4">
//                         <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                           <span className="text-white text-xs">$</span>
//                         </div>
//                         <div>
//                           <h2 className="text-sm text-gray-900 font-medium">
//                             Pay in Full
//                           </h2>
//                           <p className="text-xs text-gray-500">
//                             50% down, 50% at installation
//                           </p>
//                         </div>
//                       </div>

//                       <ul className="space-y-2 text-gray-700 text-xs">
//                         <li className="flex items-center">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           No interest charges
//                         </li>
//                         <li className="flex items-center">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Immediate 100% ownership
//                         </li>
//                         <li className="flex items-center">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Maximum ROI potential
//                         </li>
//                         <li className="flex items-center">
//                           <Check className="mr-3 h-4 w-4 text-green-500" />
//                           Highest property value increase
//                         </li>
//                       </ul>
//                     </div>

//                     {/* Middle: Recommended */}
//                     <div className="flex flex-col justify-center">
//                       <div className="bg-gray-100 rounded-xl p-4">
//                         <p className="text-xs text-red-500 mb-1 font-medium">
//                           Recommended for:
//                         </p>
//                         <p className="text-xs text-gray-700 leading-relaxed">
//                           Best long-term value if you have available capital and
//                           want maximum returns.
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right: Pricing */}
//                     <div className="flex flex-col justify-center">
//                       <div className="flex justify-between space-x-3 mb-6">
//                         <div className="text-center">
//                           <p className="text-2xl text-gray-900 font-bold">
//                             $19,950
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             Due at signing
//                           </p>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-2xl text-gray-900 font-bold">
//                             $19,950
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             Due at installation
//                           </p>
//                         </div>
//                       </div>
//                       <button className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-6 py-3 rounded-xl flex items-center gap-2 justify-center">
//                         <CreditCard className="w-4 h-4" />
//                         Pay $500 Deposit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* What's Next Section */}
//             <div className="w-full rounded-xl relative p-6 text-white border border-neutral-600">
//               <div className="text-gray-100 text-2xl mb-4">What's next?</div>

//               <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mb-6">
//                 <div className="bg-white p-3 rounded-xl text-left">
//                   <div className="flex mb-4">
//                     <p className="text-sm bg-orange-100 text-orange-600 flex items-center border rounded-xl px-3 py-1">
//                       <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>{" "}
//                       1
//                     </p>
//                   </div>
//                   <div className="w-full text-black text-sm font-normal mb-2">
//                     Confirm Order
//                   </div>
//                   <div className="w-full text-gray-500 text-xs font-normal">
//                     Submit your $500 deposit to secure your system and lock in
//                     current price.
//                   </div>
//                 </div>

//                 <div className="bg-white p-3 rounded-xl text-left">
//                   <div className="flex mb-4">
//                     <p className="text-sm bg-orange-100 text-orange-600 flex items-center border rounded-xl px-3 py-1">
//                       <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>{" "}
//                       2
//                     </p>
//                   </div>
//                   <div className="w-full text-black text-sm font-normal mb-2">
//                     Upload Photos
//                   </div>
//                   <div className="w-full text-gray-500 text-xs font-normal">
//                     Share photos of your home for system design.
//                   </div>
//                 </div>

//                 <div className="bg-white p-3 rounded-xl text-left">
//                   <div className="flex mb-4">
//                     <p className="text-sm bg-orange-100 text-orange-600 flex items-center border rounded-xl px-3 py-1">
//                       <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>{" "}
//                       3
//                     </p>
//                   </div>
//                   <div className="w-full text-black text-sm font-normal mb-2">
//                     Get Professional Installer
//                   </div>
//                   <div className="w-full text-gray-500 text-xs font-normal">
//                     Connect with certified installers in your area.
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5">
//                 <div className="flex items-center mb-4">
//                   <Shield className="mr-2 w-5 h-5" />
//                   <p className="text-base font-medium">
//                     What is a SunLink Verified Installer?
//                   </p>
//                 </div>

//                 <ul className="flex flex-wrap gap-6 text-sm font-normal">
//                   <li className="flex items-center">
//                     <Check className="mr-2 w-4 h-4" />
//                     NABCEP-Certified
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="mr-2 w-4 h-4" />
//                     5+ years in business
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="mr-2 w-4 h-4" />
//                     Licensed and insured
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Order Summary */}
//           <div className="w-full sticky top-20">
//             <div className="w-full max-w-[400px] rounded-3xl p-6 text-white border border-neutral-600 bg-slate-800">
//               <div className="text-white text-lg font-medium gap-2 mb-6">
//                 <span className="text-2xl text-orange-400">Order Summary</span>
//               </div>

//               <div className="bg-slate-700 border border-neutral-600 text-white p-5 rounded-xl shadow-lg w-full">
//                 {/* Solar System */}
//                 <div className="flex justify-between mb-4">
//                   <div>
//                     <p className="text-gray-300">Solar System (12.8kW)</p>
//                     <p className="text-sm text-gray-300 flex items-center ml-3">
//                       <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                       x 32 Panels
//                     </p>
//                   </div>
//                   <p className="text-gray-300">$22,400</p>
//                 </div>

//                 {/* Battery Storage */}
//                 <div className="flex justify-between mb-4">
//                   <div>
//                     <p className="text-gray-300">Battery Storage</p>
//                     <p className="text-sm text-gray-300 flex items-center ml-3">
//                       <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                       {batteryCount}x Tesla Powerwall 3
//                     </p>
//                   </div>
//                   <p className="text-gray-300">
//                     ${(batteryCount * 15000).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="bg-neutral-600 w-full h-px my-3"></div>

//                 {/* Add-ons */}
//                 {(toggleStates.evCharger || toggleStates.electricalPanel) && (
//                   <div className="flex justify-between mb-4">
//                     <div>
//                       <p className="text-gray-300">Add-ons</p>
//                       {toggleStates.evCharger && (
//                         <p className="text-sm text-gray-300 flex items-center ml-3">
//                           <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                           1x EV Charger Installation
//                         </p>
//                       )}
//                       {toggleStates.electricalPanel && (
//                         <p className="text-sm text-gray-300 flex items-center ml-3">
//                           <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>{" "}
//                           1x Electrical Panel Upgrade
//                         </p>
//                       )}
//                     </div>
//                     <p className="text-gray-300">
//                       $
//                       {(
//                         (toggleStates.evCharger ? 2500 : 0) +
//                         (toggleStates.electricalPanel ? 3500 : 0)
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Total Cost Summary */}
//               <div className="bg-slate-700 border border-neutral-600 text-white p-5 rounded-xl shadow-lg w-full mt-4">
//                 <div className="flex justify-between">
//                   <p className="text-gray-300">Total System Cost</p>
//                   <p className="text-gray-300">${totalCost.toLocaleString()}</p>
//                 </div>
//                 <div className="flex justify-between">
//                   <p className="text-sm text-gray-300">
//                     After Tax Credits (30%)
//                   </p>
//                   <p className="text-sm text-gray-300">
//                     ${afterTaxCredit.toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="bg-neutral-600 w-full h-px my-3"></div>

//                 <div className="flex justify-between">
//                   <p className="text-sm text-gray-300">Monthly Payment Plan</p>
//                   <p className="text-sm text-orange-400">$145/mo</p>
//                 </div>
//               </div>

//               {/* Payment Information */}
//               <div className="text-white text-lg font-medium mt-4">
//                 <span className="text-lg text-orange-400">
//                   Payment Information
//                 </span>
//               </div>

//               <div className="flex flex-wrap gap-4 mt-3">
//                 <div className="w-full">
//                   <label className="w-full text-gray-300 text-base">
//                     Cardholder Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="John Doe"
//                     value={formData.cardholderName}
//                     onChange={(e) =>
//                       handleInputChange("cardholderName", e.target.value)
//                     }
//                     className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
//                   />
//                 </div>

//                 <div className="w-full">
//                   <label className="w-full text-gray-300 text-base">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="john@example.com"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
//                   />
//                 </div>

//                 <div className="w-full">
//                   <label className="w-full text-gray-300 text-base">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="4242 4242 4242 4242"
//                     value={formData.cardNumber}
//                     onChange={(e) =>
//                       handleInputChange("cardNumber", e.target.value)
//                     }
//                     className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
//                   />
//                 </div>

//                 <div className="w-full sm:w-[calc(50%-0.5rem)]">
//                   <label className="w-full text-gray-300 text-base">
//                     Expiry Date
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     value={formData.expiryDate}
//                     onChange={(e) =>
//                       handleInputChange("expiryDate", e.target.value)
//                     }
//                     className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
//                   />
//                 </div>

//                 <div className="w-full sm:w-[calc(50%-0.5rem)]">
//                   <label className="w-full text-gray-300 text-base">CVC</label>
//                   <input
//                     type="text"
//                     placeholder="123"
//                     value={formData.cvc}
//                     onChange={(e) => handleInputChange("cvc", e.target.value)}
//                     className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
//                   />
//                 </div>

//                 <div className="w-full mt-10 text-center">
//                   <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl py-4 px-5 mb-2 text-lg font-normal text-white flex justify-center items-center w-full">
//                     <Lock className="mr-2 w-5 h-5" />
//                     Pay $500 Deposit
//                   </button>
//                 </div>

//                 <div className="flex justify-between w-full text-sm text-gray-300 mt-4">
//                   <div className="flex items-center">
//                     <Shield className="mr-1 w-4 h-4" />
//                     Secured by Stripe
//                   </div>
//                   <div className="flex items-center">
//                     <Check className="mr-1 w-4 h-4" />
//                     Refundable within 3 days
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50">
//             <div className="relative bg-gray-400 rounded-lg w-full max-w-4xl aspect-square flex items-center justify-center text-white text-3xl">
//               3D Models
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 bg-gray-600 hover:bg-gray-700 rounded p-2"
//                 title="Close"
//               >
//                 <X className="h-6 w-6 text-white" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SolarCustomization;

import React from "react";
import { SolarCustomizationMain } from "../paymentPlans";

const SolarCustomizationPage: React.FC = () => {
  // Your existing props/state logic
  const mockProps = {
    selectedPlanDynamic: "15-years",
    onPlanChange: (plan: string) => console.log("Plan changed:", plan),
    totalPrice: 39900,
    solarOnlyPrice: 22400,
    batteryTotalPrice: 15000,
    batteryCountDynamic: 1,
    onFinancingApproved: (value: string) =>
      console.log("Financing approved:", value),
    showIncentives: true,
    netCostAfterIncentives: 27930,
    handlePlanChange: (plan: string) =>
      console.log("Handle plan change:", plan),
  };

  return <SolarCustomizationMain {...mockProps} />;
};

export default SolarCustomizationPage;
