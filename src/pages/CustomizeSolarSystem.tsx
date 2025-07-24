// import React, { useState } from 'react';

// import lightningIcon from '../assets/images/lightning_svgrepo.com.svg';

// import vectorIcon from '../assets/images/Vector.png';
// import mapView from '../assets/images/map-view.png';
// import checkIcon from '../assets/images/check.svg';
// import svgArrow from '../assets/images/SVG.svg';
// import circle_svgrepo from '../assets/images/info-circle_svgrepo.com.svg';
// import { useNavigate } from 'react-router-dom';
// // import writeIcon from '../assets/images/writeIcon.svg';
// import writeIcon from '../assets/images/write_svgrepo.com.svg';
// import tickIcon from '../assets/images/tick_svgrepo.svg';
// import crossIcon from '../assets/images/cross_svgrepo.svg';

// const CustomizeSolarSystem = () => {
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
//   const [selectedOffset, setSelectedOffset] = useState('');
//   const [showEdit, setShowEdit] = useState(false);
//   const navigate = useNavigate(); // ✅ initialize the navigation hook
//   const [viewMode, setViewMode] = useState<'annual' | 'monthly'>('annual');
//   const handleFinalize = () => {
//     navigate('/battery-selection'); // ✅ navigate to your desired route
//   };
//   return (
//     <section className="py-24 sm:py-40 bg-black-custom relative">
//       <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8">

//         <div className="text-sm text-gray-400 mb-2">
//           <span className="uppercase tracking-wide text-xs">Recommendation</span> <span className="px-3">&gt;</span>
//           <span className="text-white uppercase">Customize</span>
//         </div>

//         <h1 className="py-6 text-2xl md:text-3xl xl:text-4xl text-color font-normal tracking-tight">
//           Customize your solar system
//         </h1>

//         <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-full bg-orange-500 border border-white text-xs font-bold flex items-center justify-center">
//               <img src={checkIcon} alt="Check" />
//             </div>
//             <span className="text-white">Design</span>
//           </div>
//           <div className="flex-1 h-0.5 bg-white">
//             <div className="w-1/2 h-0.5 bg-orange-500"></div>
//           </div>

//           <div className="flex items-center gap-2 text-white">
//             <div className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">2</div>
//             <span>Batteries</span>
//           </div>
//           <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>

//           <div className="flex items-center gap-2 text-white">
//             <div className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">3</div>
//             <span>Choose Your Plan</span>
//           </div>
//           <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>

//           <div className="flex items-center gap-2 text-white">
//             <div className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">4</div>
//             <span>Customer Portal</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 items-start">
//           <div className="rounded-xl relative sticky top-20 h-screen">
//             <div className="flex items-center absolute top-8 left-7 text-white text-base font-medium space-x-1">
//               <span>123 Main Street, USA</span>
//               <img src={vectorIcon} alt="Location" />
//             </div>
//             <img src={mapView} alt="Solar Design" className="w-full rounded-xl" />
//           </div>

//           <div className="w-[400px] max-lg:w-full h-full right-panel-bg rounded-[24px] p-6 text-white border border-neutral-600 mx-auto">
//             <div className="text-white text-lg font-medium flex items-center gap-2 mb-6">
//               <img src={lightningIcon} alt="System Overview" />
//               <span className="text-2xl text-color">System Overview</span>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-6">
//               {[
//                 { label: 'Annual Usage (kWh)', value: '8,000', icon: writeIcon },
//                 { label: 'Annual Output (kWh)', value: '12,410' },
//                 { label: 'System Size (kW)', value: '10.0' },
//                 { label: 'Panels', value: '25' },
//               ].map((item, i) => (
//                 <div key={i} className="bg-[#252525] rounded-xl p-4 border border-neutral-600">
//                   <div className="flex justify-between items-center">
//                     <span className="text-xs text-[#ffffff99]">{item.label}</span>
//                     {item.icon && (
//                       <button onClick={() => setShowEdit(true)}>
//                         <img src={item.icon} alt="edit" />
//                       </button>
//                     )}
//                   </div>
//                   <div className="text-4xl font-semibold pt-[25px]">{item.value}</div>
//                 </div>
//               ))}
//             </div>
//             {/* Edit Usage Section */}
//             {showEdit && (
//               <div className="w-full custom-bod rounded-xl border border-neutral-600 p-4 mb-4 plain-black-bg text-white">
//                 <div className="flex justify-between items-center text-sm mb-3">
//                   Edit Annual Usage
//                   <span className="flex items-center gap-2">
//                     <img src={tickIcon} className="cursor-pointer" onClick={() => setShowEdit(false)} />
//                     <img src={crossIcon} className="cursor-pointer" onClick={() => setShowEdit(false)} />
//                   </span>
//                 </div>

//                 {/* Toggle View */}
//                 <div className="flex gap-4 customradio sys_overview mt-3 rounded-xl border border-neutral-600 p-3">
//                   <div className="w-1/2">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="usageType"
//                         value="annual"
//                         checked={viewMode === 'annual'}
//                         onChange={() => setViewMode('annual')}
//                         className="accent-blue-600 w-5 h-5"
//                       />
//                       <span className="text-sm py-4 px-1 rounded-md text-center">Annual Total</span>
//                     </label>
//                   </div>

//                   <div className="w-1/2">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="usageType"
//                         value="monthly"
//                         checked={viewMode === 'monthly'}
//                         onChange={() => setViewMode('monthly')}
//                         className="accent-blue-600 w-5 h-5"
//                       />
//                       <span className="text-sm py-4 px-1 rounded-md text-center">Monthly Breakdown</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Annual Usage View */}
//                 {viewMode === 'annual' && (
//                   <>
//                     <div className="text-sm mt-4">Total Annual Usage (kWh)</div>
//                     <div className="flex justify-between text-white mt-1 plain-black-bg rounded-xl border border-neutral-600 p-3">
//                       <span className="text-sm">15000</span>
//                     </div>
//                     <div className="text-xs mt-4">Average monthly: 1,287 kWh</div>
//                   </>
//                 )}

//                 {/* Monthly Breakdown View */}
//                 {viewMode === 'monthly' && (
//                   <div className="grid grid-cols-3 py-3 gap-3">
//                     {months.map((month) => (
//                       <div key={month} className="space-y-1">
//                         <label className="text-xs text-[#ffffff99]">{month}</label>
//                         <input
//                           type="text"
//                           defaultValue="1200"
//                           className="bg-[#212222] text-[#ffffff99] text-xs px-3 py-2 rounded border border-neutral-600 w-full"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             <div
//               className="bg-[#252525] border border-neutral-600 text-white p-5 rounded-xl shadow-lg w-full custom-bod space-y-6">
//               {/* <!-- Top Section --{'>'} */}
//               <div>
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="text-lg text-color font-medium">Energy Offset</div>
//                   <div className="text-right">
//                     <div className="text-3xl font-semibold leading-none text-color text-4xl">155<span
//                       className="text-xl font-normal align-top">%</span></div>
//                     <div className="text-xs text-gray-300 text-[#ffffff99]">surplus generation</div>
//                   </div>
//                 </div>


//                 <div className="flex justify-center">
//                   <div className="relative w-40 h-40 rounded-full bg-[#9ca2a3] flex items-center justify-center">
//                     {/* Inner orange ring */}
//                     <div className="absolute w-32 h-32 rounded-full border-[14px] border-[#16232A]"></div>
//                     <div className="absolute w-28 h-28 rounded-full border-[15px] border-[#F47121] bg-[#16232A]"></div>

//                     <div className="text-white text-4xl text-color font-normal z-10">
//                       155<span className="text-color text-xl font-normal align-top">%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Solar Generation Card */}
//               <div className="bg-[#1e1e1e] rounded-lg p-4">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2">
//                     <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
//                     <span className="text-color text-base font-normal">Solar Generation</span>
//                   </div>
//                   <div className="text-orange-500 text-xs font-normal">100%</div>
//                 </div>
//                 <div className="text-right text-xs text-color">25 Panels</div>
//               </div>

//               {/* Excess Production Card */}
//               <div className="bg-[#1e1e1e] rounded-lg p-4">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2">
//                     <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
//                     <span className="text-white font-medium">Excess Production</span>
//                   </div>
//                   <div className="text-white text-sm font-normal">55%</div>
//                 </div>
//                 <div className="text-sm text-gray-300 mt-2 mb-3">Options for surplus energy:</div>
//                 <div className="flex gap-2">
//                   <button
//                     className="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-xl flex items-center gap-1">
//                     <span className="w-2 h-2 bg-orange-500 rounded-full"></span> Store Power
//                   </button>
//                   <button
//                     className="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-xl flex items-center gap-1">
//                     <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Sell Back
//                   </button>
//                 </div>
//               </div>

//             </div>
//             <div
//               className="bg-[#2c2c2c] custom-bod text-white px-6 py-6 rounded-xl shadow-lg w-full mt-4 space-y-6 border border-neutral-600">
//               {/* Heading */}
//               <div className="text-lg text-color font-normal">Choose Desired Energy Offset</div>

//               {/* Dropdown Box */}
//               <div className="relative">
//                 <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
//                   <img className="w-4" src={circle_svgrepo} />
//                 </div>

//                 <select
//                   value={selectedOffset}
//                   onChange={(e) => setSelectedOffset(e.target.value)}
//                   className="w-full appearance-none bg-transparent border border-gray-400 text-gray-300 rounded-lg pl-10 py-4 pr-10"
//                 >
//                   <option value="" disabled>Plan for the future</option>
//                   <option value="80">Offset 80%</option>
//                   <option value="100">Offset 100%</option>
//                   <option value="120">Offset 120%</option>
//                   <option value="150">Offset 150%</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
//                   <img src={svgArrow} />
//                 </div>
//               </div>

//               {/* Option 1 */}
//               <div className="bg-white text-black rounded-xl px-5 py-6 space-y-3">
//                 <div className="flex items-center gap-3">
//                   <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
//                   <span className="text-lg font-medium">80% Basic</span>
//                   <div
//                     className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
//                       stroke="currentColor">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     Achieved
//                   </div>
//                 </div>
//                 <div className="text-sm text-[#16232ab8] leading-relaxed">
//                   Significantly reduce your monthly<br />
//                   electricity bills
//                 </div>
//                 <div className="text-sm text-[#16232ab8]">Requires ~ 13 panels</div>
//               </div>

//               {/* Option 2 */}
//               <div className="bg-white text-black rounded-xl px-5 py-6 space-y-3">
//                 <div className="flex items-center gap-3">
//                   <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
//                   <span className="text-lg font-medium">100% Complete</span>
//                   <div
//                     className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
//                       stroke="currentColor">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     Achieved
//                   </div>
//                 </div>
//                 <div className="text-sm text-[#16232ab8] leading-relaxed">
//                   Match your annual energy usage with<br />
//                   solar production
//                 </div>
//                 <div className="text-sm text-[#16232ab8]">Requires ~ 17 panels</div>
//               </div>

//               {/* Option 3 */}
//               <div className="bg-white text-black rounded-xl px-5 py-6 space-y-3">
//                 <div className="flex items-center gap-3">
//                   <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
//                   <span className="text-lg font-medium">120% Surplus</span>
//                   <div
//                     className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
//                       stroke="currentColor">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     Achieved
//                   </div>
//                 </div>
//                 <div className="text-sm text-[#16232ab8] leading-relaxed">
//                   Generate extra power for batteries or<br />
//                   future expansion
//                 </div>
//                 <div className="text-sm text-[#16232ab8]">Requires ~ 20 panels</div>
//               </div>

//               {/* Option 4 - Highlighted Red */}
//               <div
//                 className="rounded-xl px-5 py-6 space-y-3 border border-[#FFBB6B] bg-gradient-to-br from-orange-500 to-red-500 text-white">
//                 <div className="flex items-center gap-3">
//                   <span className="w-2.5 h-2.5 bg-white/60 rounded-full"></span>
//                   <span className="text-lg font-medium">150% Maximum</span>
//                   <div
//                     className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
//                       stroke="currentColor">
//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     Achieved
//                   </div>
//                 </div>
//                 <div className="text-sm leading-relaxed">
//                   Ideal for pools, workshops, or major<br />
//                   home additions
//                 </div>
//                 <div className="text-sm text-white/80">Requires ~ 25 panels</div>
//               </div>


//             </div>
//             {/* Final Button */}
//             <button
//               onClick={handleFinalize}
//               className="w-full mt-4 py-3 text-white text-lg font-medium border border-[#FFBB6B] rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center gap-2"
//             >
//               Finalize my design
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };




// export default CustomizeSolarSystem;


import React, { useState } from 'react';
import { Zap, MapPin, Edit3, Check, X } from 'lucide-react';

const CustomizeSolarSystem = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [viewMode, setViewMode] = useState('annual');
  const [selectedOffset, setSelectedOffset] = useState('150');

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const handleFinalize = () => {
    alert('Design finalized! Moving to next step...');
  };

  return (
    <div className="flex-1">
      <section className="py-24 sm:py-40 bg-slate-800 relative">
        <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8">

          <div className="text-sm text-gray-400 mb-2">
            <span className="uppercase tracking-wide text-xs">Recommendation</span>
            <span className="px-3">&gt;</span>
            <span className="text-white uppercase">Customize</span>
          </div>

          <h1 className="py-6 text-2xl md:text-3xl xl:text-4xl text-white font-normal tracking-tight">
            Customize your solar system
          </h1>

          <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 border border-white text-xs font-bold flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-white">Design</span>
            </div>
            <div className="flex-1 h-0.5 bg-white">
              <div className="w-1/2 h-0.5 bg-orange-500"></div>
            </div>

            <div className="flex items-center gap-2 text-white">
              <div className="w-6 h-6 rounded-full bg-slate-600 text-white text-xs font-bold flex items-center justify-center">2</div>
              <span>Batteries</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>

            <div className="flex items-center gap-2 text-white">
              <div className="w-6 h-6 rounded-full bg-slate-600 text-white text-xs font-bold flex items-center justify-center">3</div>
              <span>Choose Your Plan</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>

            <div className="flex items-center gap-2 text-white">
              <div className="w-6 h-6 rounded-full bg-slate-600 text-white text-xs font-bold flex items-center justify-center">4</div>
              <span>Customer Portal</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6 items-start">
            <div className="rounded-xl relative sticky top-20 h-screen">
              <div className="flex items-center absolute top-8 left-7 text-white text-base font-medium space-x-1 z-10">
                <span>123 Main Street, USA</span>
                <MapPin size={16} />
              </div>
              <div className="w-full h-full bg-slate-700 rounded-xl flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="text-lg">Solar Design View</p>
                  <p className="text-sm">Interactive map would be displayed here</p>
                </div>
              </div>
            </div>

            <div className="w-[400px] max-lg:w-full h-full bg-slate-700 rounded-[24px] p-6 text-white border border-slate-600 mx-auto">
              <div className="text-white text-lg font-medium flex items-center gap-2 mb-6">
                <Zap className="text-orange-500" />
                <span className="text-2xl text-white">System Overview</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Annual Usage (kWh)', value: '8,000', hasEdit: true },
                  { label: 'Annual Output (kWh)', value: '12,410' },
                  { label: 'System Size (kW)', value: '10.0' },
                  { label: 'Panels', value: '25' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-600 rounded-xl p-4 border border-slate-500">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">{item.label}</span>
                      {item.hasEdit && (
                        <button onClick={() => setShowEdit(true)}>
                          <Edit3 size={14} className="text-slate-400 hover:text-white" />
                        </button>
                      )}
                    </div>
                    <div className="text-4xl font-semibold pt-[25px]">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Edit Usage Section */}
              {showEdit && (
                <div className="w-full bg-slate-800 rounded-xl border border-slate-500 p-4 mb-4 text-white">
                  <div className="flex justify-between items-center text-sm mb-3">
                    Edit Annual Usage
                    <span className="flex items-center gap-2">
                      <Check size={16} className="cursor-pointer text-green-400" onClick={() => setShowEdit(false)} />
                      <X size={16} className="cursor-pointer text-red-400" onClick={() => setShowEdit(false)} />
                    </span>
                  </div>

                  {/* Toggle View */}
                  <div className="flex gap-4 mt-3 rounded-xl border border-slate-500 p-3">
                    <div className="w-1/2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="usageType"
                          value="annual"
                          checked={viewMode === 'annual'}
                          onChange={() => setViewMode('annual')}
                          className="accent-blue-600 w-5 h-5"
                        />
                        <span className="text-sm py-4 px-1 rounded-md text-center">Annual Total</span>
                      </label>
                    </div>

                    <div className="w-1/2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="usageType"
                          value="monthly"
                          checked={viewMode === 'monthly'}
                          onChange={() => setViewMode('monthly')}
                          className="accent-blue-600 w-5 h-5"
                        />
                        <span className="text-sm py-4 px-1 rounded-md text-center">Monthly Breakdown</span>
                      </label>
                    </div>
                  </div>

                  {/* Annual Usage View */}
                  {viewMode === 'annual' && (
                    <>
                      <div className="text-sm mt-4">Total Annual Usage (kWh)</div>
                      <div className="flex justify-between text-white mt-1 bg-slate-800 rounded-xl border border-slate-500 p-3">
                        <span className="text-sm">15000</span>
                      </div>
                      <div className="text-xs mt-4">Average monthly: 1,287 kWh</div>
                    </>
                  )}

                  {/* Monthly Breakdown View */}
                  {viewMode === 'monthly' && (
                    <div className="grid grid-cols-3 py-3 gap-3">
                      {months.map((month) => (
                        <div key={month} className="space-y-1">
                          <label className="text-xs text-slate-400">{month}</label>
                          <input
                            type="text"
                            defaultValue="1200"
                            className="bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded border border-slate-500 w-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="bg-slate-600 border border-slate-500 text-white p-5 rounded-xl shadow-lg w-full space-y-6">
                {/* Top Section */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-lg text-white font-medium">Energy Offset</div>
                    <div className="text-right">
                      <div className="text-3xl font-semibold leading-none text-white text-4xl">155<span className="text-xl font-normal align-top">%</span></div>
                      <div className="text-xs text-gray-300 text-slate-400">surplus generation</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-40 h-40 rounded-full bg-slate-500 flex items-center justify-center">
                      {/* Inner orange ring */}
                      <div className="absolute w-32 h-32 rounded-full border-[14px] border-slate-800"></div>
                      <div className="absolute w-28 h-28 rounded-full border-[15px] border-orange-500 bg-slate-800"></div>

                      <div className="text-white text-4xl font-normal z-10">
                        155<span className="text-white text-xl font-normal align-top">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solar Generation Card */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                      <span className="text-white text-base font-normal">Solar Generation</span>
                    </div>
                    <div className="text-orange-500 text-xs font-normal">100%</div>
                  </div>
                  <div className="text-right text-xs text-white">25 Panels</div>
                </div>

                {/* Excess Production Card */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
                      <span className="text-white font-medium">Excess Production</span>
                    </div>
                    <div className="text-white text-sm font-normal">55%</div>
                  </div>
                  <div className="text-sm text-gray-300 mt-2 mb-3">Options for surplus energy:</div>
                  <div className="flex gap-2">
                    <button className="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span> Store Power
                    </button>
                    <button className="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Sell Back
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-600 text-white px-6 py-6 rounded-xl shadow-lg w-full mt-4 space-y-6 border border-slate-500">
                {/* Heading */}
                <div className="text-lg text-white font-normal">Choose Desired Energy Offset</div>

                {/* Dropdown Box */}
                <div className="relative">
                  <select
                    value={selectedOffset}
                    onChange={(e) => setSelectedOffset(e.target.value)}
                    className="w-full appearance-none bg-transparent border border-gray-400 text-gray-300 rounded-lg pl-4 py-4 pr-10"
                  >
                    <option value="" disabled>Plan for the future</option>
                    <option value="80">Offset 80%</option>
                    <option value="100">Offset 100%</option>
                    <option value="120">Offset 120%</option>
                    <option value="150">Offset 150%</option>
                  </select>
                </div>

                {/* Option 1 */}
                <div className="bg-white text-black rounded-xl px-5 py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                    <span className="text-lg font-medium">80% Basic</span>
                    <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Check size={12} />
                      Achieved
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    Significantly reduce your monthly<br />
                    electricity bills
                  </div>
                  <div className="text-sm text-slate-600">Requires ~ 13 panels</div>
                </div>

                {/* Option 2 */}
                <div className="bg-white text-black rounded-xl px-5 py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    <span className="text-lg font-medium">100% Complete</span>
                    <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Check size={12} />
                      Achieved
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    Match your annual energy usage with<br />
                    solar production
                  </div>
                  <div className="text-sm text-slate-600">Requires ~ 17 panels</div>
                </div>

                {/* Option 3 */}
                <div className="bg-white text-black rounded-xl px-5 py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                    <span className="text-lg font-medium">120% Surplus</span>
                    <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Check size={12} />
                      Achieved
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    Generate extra power for batteries or<br />
                    future expansion
                  </div>
                  <div className="text-sm text-slate-600">Requires ~ 20 panels</div>
                </div>

                {/* Option 4 - Highlighted */}
                <div className="rounded-xl px-5 py-6 space-y-3 border border-orange-400 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-white/60 rounded-full"></span>
                    <span className="text-lg font-medium">150% Maximum</span>
                    <div className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Check size={12} />
                      Achieved
                    </div>
                  </div>
                  <div className="text-sm leading-relaxed">
                    Ideal for pools, workshops, or major<br />
                    home additions
                  </div>
                  <div className="text-sm text-white/80">Requires ~ 25 panels</div>
                </div>
              </div>

              {/* Final Button */}
              <button
                onClick={handleFinalize}
                className="w-full mt-4 py-3 text-white text-lg font-medium border border-orange-400 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center gap-2"
              >
                Finalize my design
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomizeSolarSystem;