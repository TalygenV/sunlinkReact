import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import circle from '../assets/images/info-circle_svgrepo.com.svg';
import home from '../assets/images/home-2_svgrepo.com.svg';
import graph from '../assets/images/graph_svgrepo.svg';
import dollar from '../assets/images/badge-dollar.svg';
import sun from '../assets/images/sun-2_svgrepo.svg';
import sunlinkicon from '../assets/images/sunlinkicon.svg';
import gift1 from '../assets/images/gift.svg';
import { localUserData } from '../store/solarSlice'
type CalculatedData = {
  annualProduction: number;
  systemSize: number;
  panels: number;
  monthlyBill: number;
  systemCost: number;
};
const systemOwnership = 'host';
  const base_url = "https://api.genability.com";
  const basic_token =
    "ZGI5MTczMGItNWUwNi00N2I1LWI3MjAtNzcyZDc5ODUyNTA1OjBiY2U1M2RiLTc3NjItNGQ0Zi1iZDA1LWYzODEwNWE1OWI5YQ==";
const About = () => {
    const [userData, setUserData] = useState<localUserData | null>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [kwhData, setKwhData] = useState<any>(null);
  const [loadData ,setloadData] = useState(false);
   const [calcData, setCalcData] = useState<CalculatedData | null>(null);
  useEffect(() => {
  const fetchData = async () => {
    const data =await localStorage.getItem("userData");
    if (data) {
     await setUserData(JSON.parse(data));
     setloadData(true);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  };

  fetchData();
}, []);

 useEffect(() => {
  if (!userData) {
    return
  }
    const fetchAnalysis = async () => {
      try {
         const annualProduction = userData.genabilityInfo.pricePerKwh ?? 0;
    const systemSize = Math.round(annualProduction / 1500);
    const panels = Math.round((systemSize * 1000) / 400);
    const monthlyBill = userData.powerBill ?? 0;
    const solarPricePerWatt = 2.5;
    const systemCost = panels * 400 * solarPricePerWatt;
      setCalcData({
      annualProduction,
      systemSize,
      panels,
      monthlyBill,
      systemCost,
    });
        const res = await fetch(
          `${base_url}/rest/v1/accounts/pid/${userData.genabilityInfo.providerAccountId}/analyses`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${basic_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        const series = json?.results?.[0]?.series || [];
        const lifetimeSolarCost = json?.results?.[0]?.summary?.lifetimeSolarCost;

        const savingsMonthly = series.find(
          (s: any) => s.displayLabel === "Total Savings (Mo/Year 1)"
        );
        const savingsLifetime = series.find(
          (s: any) => s.displayLabel === "Total Savings (Lifetime)"
        );

        console.log("💰 Monthly Savings:", savingsMonthly?.cost);
        console.log("💰 Lifetime Savings:", savingsLifetime?.cost);

  
        const today = new Date().toISOString().split("T")[0];
        console.log("today ",today);
        const result = await fetch(
          `${base_url}/rest/v1/incentives?addressString=${userData.address}&customerClasses=RESIDENTIAL&effectiveOn=${today}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${basic_token}`,
              "Content-Type": "application/json",
            },
          }
        );

  const getRateResult = await result.json();

if (getRateResult.status === 'success' && getRateResult.results.length > 0) {
  let totalRebates = 0;
  let localTaxCredits = 0;
  let federalTaxCredits = 0;
  let federalRateAmount = 0; // ✅ rename for clarity

  for (const incentive of getRateResult.results) {
    const {
      incentiveName,
      incentiveType,
      eligibility,
      requiredData,
      rate,
      rateUnit,
      quantityKey,
      paymentCap,
      jurisdiction
    } = incentive;

    // ✅ Eligibility logic
    let isEligible = eligibility === 'ELIGIBLE';

    if (!isEligible && eligibility === 'COULD_BE_ELIGIBLE') {
      if (requiredData && requiredData.length > 0) {
        isEligible = requiredData.every((req: { applicabilityKey: string; requiredValue: string; maxValue: number; }) => {
          if (req.applicabilityKey === 'systemOwnership') {
            return req.requiredValue === systemOwnership;
          }
          if (req.applicabilityKey === 'systemSizeDcW' && req.maxValue) {
            return systemSize <= req.maxValue;
          }
          return true;
        });
      }
    }

    if (!isEligible) {
      console.log(`⏭️ Skipping ${incentiveName} — not eligible.`);
      continue;
    }

    // ✅ Only add rate if eligible
    if (incentiveType === 'taxCredit' && jurisdiction === 'federal') {
      federalRateAmount += rate;
    }

    // Calculate base amount
    let baseAmount = 0;
    switch (quantityKey?.keyName) {
      case 'systemCost':
      case 'systemCostMinusIncentives':
        baseAmount = systemCost - totalRebates;
        break;
      case 'systemSizeDcW':
        baseAmount = systemSize;
        break;
      default:
        console.log(`⚠️ Unknown quantity key: ${quantityKey?.keyName}`);
        continue;
    }

    // Calculate value
    let incentiveValue = 0;
    if (rateUnit === 'PERCENTAGE') {
      console.log(`💸 baseAmount: $${baseAmount}`);
      console.log(`💸 PERCENTAGE: $${baseAmount * (rate / 100)}`);
      incentiveValue = baseAmount * (rate / 100);
    } else if (rateUnit === 'COST_PER_UNIT') {
      console.log(`💸 baseAmount * rate: $${baseAmount * rate}`);
      incentiveValue = baseAmount * rate;
    }

    // Cap if needed
    if (paymentCap && incentiveValue > paymentCap) {
      console.log(`💸 paymentCap: $${paymentCap}`);
      incentiveValue = paymentCap;
    }

    // Add to buckets
    if (incentiveType === 'rebate') {
      totalRebates += incentiveValue;
    } else if (incentiveType === 'taxCredit') {
      if (jurisdiction === 'federal') {
        console.log(`💸 federalTaxCredits: $${incentiveValue}`);
        federalTaxCredits += incentiveValue;
      } else if (jurisdiction === 'state' || jurisdiction === 'city') {
        console.log(`💸 localTaxCredits: $${incentiveValue}`);
        localTaxCredits += incentiveValue;
      }
    }

    console.log(
      `✅ ${incentiveType.toUpperCase()} [${jurisdiction}] - ${incentiveName}: $${incentiveValue.toFixed(2)}`
    );
  }

  const totalTaxCredits = localTaxCredits + federalTaxCredits;

   const FederalData = {
    monthly: savingsMonthly?.cost ?? 0,
    lifetime: savingsLifetime?.cost ?? 0,
    localTaxCredits: localTaxCredits.toFixed(2),
    federalTaxCredits: federalTaxCredits,
    totalTaxCredits: totalTaxCredits.toFixed(2),
    rate: federalRateAmount // 
  };

  setKwhData(FederalData);
  localStorage.setItem("FederalData", JSON.stringify(FederalData));
}

       else {
      console.log('❌ No incentives found.');
    }
           } catch (err: any) {
        console.error("Error fetching analyses:", err);
      
      }
    };

   
      fetchAnalysis();
    
  }, [userData]);

if(!userData) return;
 
 
  const chartYears = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
  const years = userData?.genabilityInfo?.seriesData.filter(d => d.seriesId === 5).map(d => new Date(d.fromDateTime).getFullYear());
  const minYear = Math.min(...years);
  let utilityData = [];
  for (const offset of chartYears) {
    const year = minYear + offset;

    const cost = userData?.genabilityInfo?.seriesData.find(d => d.seriesId === 6 && d.fromDateTime.startsWith(`${year}`))?.cost || 0;

    utilityData.push({ offset, cost });
  }

  // Get max cost for chart scaling
  const maxCost = Math.max(...utilityData.map((d) => d.cost));
 
  if (!calcData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="overflow-hidden py-24 sm:py-48 bg-black-custom relative">
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
        <p className="text-center mb-4">
          <img className="mx-auto" src={sunlinkicon} alt="Sunlink" />
        </p>
        <h1 className="text-5xl md:text-5xl font-semibold text-gray-300 text-center mb-8">
          Your Personalized Solar Solution
        </h1>
        <p className="text-center text-lg md:text-base text-gray-300 mb-10">
          Here’s what SunLink recommends.
        </p>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Left Panel */}
          <div className="lg:pt-4 lg:pr-8 custom-formcls_HS p-10 rounded-xl max-w-[700px] ml-auto border border-neutral-700">
            <h3 className="text-gray-300 text-3xl mb-3 flex justify-between">
              Our recommended Setup <img src={sun} alt="Sun" />
            </h3>

            <div className="space-y-2 mb-6 mt-6">
              <div className="flex justify-between text-gray-300 text-xl">
                <span>System Size</span>
                <span className="text-gray-100 text-2xl">{calcData.systemSize}kW</span>
              </div>
              <div className="flex justify-between text-gray-300 text-xl">
                <span>Solar Panels</span>
                <span className="text-gray-100 text-2xl">{calcData.panels} Panels</span>
              </div>
              <div className="flex justify-between text-gray-300 text-xl">
                <span>Annual Production</span>
                <span className="text-gray-100 text-2xl">{Math.round(calcData.annualProduction).toLocaleString()} kWh</span>
              </div>
            </div>

            {/* Incentives */}
            {kwhData && (
            <div className="custom-midpanel rounded-xl p-10">
              <h3 className="text-xl mb-8 text-center text-white">Available Incentives</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="disclaimer-bg p-3 rounded-2xl border border-neutral-600 sm-boxes custom-bod text-center text-white relative">
                  <p className="opacity-60 text-sm flex justify-center">
                    <img className="mr-2 w-4" src={dollar} alt="Info" />Federal Tax Credit
                  </p>
                  <p className="text-xl text-gray-500">${kwhData.federalTaxCredits}</p>
                  <p className="opacity-60 text-sm">{kwhData.rate}% of system cost</p>
                </div>

                <div className="disclaimer-bg p-3 rounded-2xl border border-neutral-600 sm-boxes custom-bod text-center text-white">
                  <p className="opacity-60 text-sm flex justify-center">
                    <img className="mr-2 w-4" src={gift1} alt="Info" />Local Incentives
                  </p>
                  <p className="text-xl text-gray-500">${kwhData.localTaxCredits}</p>
                  <p className="opacity-60 text-sm">State & utility rebates</p>
                </div>
              </div>


              <div className="rounded-2xl border border-neutral-600 mt-5 py-[15px] px-[10px] text-sm font-normal text-center text-gray-500">
                TOTAL INCENTIVES: ${kwhData.totalTaxCredits}
              </div>

              <div className="disclaimer-bg p-3 rounded-2xl border-0 mt-5 sm-boxes text-left text-white text-xs/[18px] font-normal flex items-start">
                <img className="mr-2 mt-1 w-4" src={circle} alt="Info" /> Important: SunLink does not guarantee any incentives. Incentive availability and amounts vary by location, income, and other factors. Please consult with your installer and tax advisor to confirm your eligibility for specific incentives.
              </div>

              <div className="disclaimer-bg p-3 rounded-2xl border-0 mt-5 sm-boxes text-left text-white text-xs/[18px] font-normal flex items-start">
                <img className="mr-2 mt-1 w-4" src={circle} alt="Info" /> Tax Credit Disclaimer: The federal solar tax credit allows you to deduct 30% of the cost of installing a solar energy system from your federal taxes. This credit is available through 2032, then decreases to 26% in 2033 and 22% in 2034. Consult your tax advisor to determine your eligibility.
              </div>
            </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:pt-4 lg:pr-8 custom-formcls_right p-10 rounded-xl ml-auto border border-neutral-700">
            <h3 className="text-gray-300 text-3xl mb-3 flex justify-between">
              Without Solar <img src={graph} alt="Graph" />
            </h3>

            <div className="space-y-2 mb-6 mt-6 plain-black-bg p-5 rounded-2xl border-0">
              <div className="text-gray-300 text-xl flex items-center">
                <img className="mr-2" src={home} alt="Home" />
                <span>Current Monthly Bill</span>
              </div>
              <div className="text-gray-300 text-xl">
                <span className="text-gray-100 text-2xl">${calcData.monthlyBill}/month</span>
              </div>
            </div>

            <div className="relative h-48 tesla-card-white bg-white p-4 border border-red-200 overflow-hidden">
                    <div className="flex items-end justify-between h-full">
                      {utilityData.map((data, index) => {
                        const height = Math.max((data.cost / maxCost) * 85, 8); // Minimum 8% height, max 85%
                        const isHovered = hoveredYear === data.offset;

                        return (
                          <div
                            key={data.offset}
                            className="relative flex flex-col items-center group cursor-pointer"
                            style={{
                              width: `${100 / utilityData.length - 1}%`,
                            }}
                            onMouseEnter={() => setHoveredYear(data.offset)}
                            onMouseLeave={() => setHoveredYear(null)}
                          >
                            {/* Tooltip */}
                            {isHovered && (
                              <div className="absolute bottom-full mb-2 bg-red-600 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-20 shadow-lg transform -translate-x-1/2 left-1/2">
                                <div className="tesla-subheading">
                                  Year {data.offset}
                                </div>
                                <div className="tesla-body">
                                  ${Math.round(data.cost).toLocaleString()}
                                  /year
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
                              </div>
                            )}

                            {/* Bar */}
                            <div
                              className={`w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-md transition-all duration-300 border border-red-500 ${
                                isHovered
                                  ? "opacity-100 shadow-lg scale-105"
                                  : "opacity-90 hover:opacity-95"
                              }`}
                              style={{
                                height: `${height}px`,
                                minHeight: "0px",
                              }}
                            />

                            {/* Year Label */}
                            <div className="tesla-caption text-xs text-gray-600 mt-2 text-center">
                              {data.offset === 0 ? "Now" : `${data.offset}y`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
            {kwhData && (
              <div className="space-y-2 mb-6 mt-6 plain-black-bg p-5 rounded-2xl border-0">
                <div className="text-gray-300 text-center text-xl flex justify-center">
                  <img className="mr-3" src={graph} alt="Graph" />
                  30-Year Projected Spending
                </div>
                <div className="text-gray-100 text-center text-3xl">${Math.round(kwhData.lifetime).toLocaleString()}</div>
                <div className="text-gray-300 text-center text-lg">
                  Based on 3% annual rate increases
                </div>
              </div>
            )}
            <div className="mb-6 mt-6 plain-black-bg p-5 rounded-2xl border-0 font-normal flex items-start text-white">
              <img className="mr-4 mt-1 w-4" src={circle} alt="Info" />
              <div className="text-xs/[18px]">
                <span className="text-lg block">Rising Utility Rates</span>
                Utility rates increase every year. Lock in your energy costs with solar and avoid these rising expenses.
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-10 text-center">
          <Link to="/financing" className="orangegradbtn rounded-xl py-4 px-5 mb-2 text-lg font-normal text-white">
            Customise my solar system
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
