import sunlinkicon from '../assets/images/check.svg';
import React, { useEffect, useState } from "react";
import { MapView } from "./MapView";
import { SummaryPanel } from "./SummaryPanel";
import { updateUserStepName } from "../utils/userDocumentService";
import { localUserData } from '../store/solarSlice'

function SystemOverview() {
  const [userData, setUserData] = useState<localUserData | null>(null);
  const [loadData, setloadData] = useState(false);
  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = localStorage.getItem("userData");
        if (data) {
          setUserData(JSON.parse(data));
          setloadData(true);
          console.log("Error parsing user data", userData);
        }
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storeDate = async () => { await updateUserStepName("systemOverview"); };
    storeDate();
  }, []);

  useEffect(() => {
    const storeDate = async () => { await updateUserStepName("systemOverview"); };
    storeDate();
  }, []);

  return (
    <section className="py-24 sm:py-40 bg-black-custom   relative">
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">


        <div className="text-sm text-gray-400 mb-2">
          <span className="uppercase tracking-wide text-xs">Recommendation</span> <span className="px-3">&gt;</span> <span
            className="text-white uppercase">Customize</span>
        </div>


        <h1 className="py-6 text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-color font-normal tracking-tight text-pretty">
          Customize your solar system</h1>


        <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full bg-orange-500 border border-solid border-white text-black text-xs font-bold flex items-center justify-center">
              <img className="mx-auto" src={sunlinkicon} alt="Sunlink" />
            </div>
            <span className="text-white">Design</span>
          </div>
          <div className="flex-1 h-0.5 bg-white">
            <div className="w-1/2 h-0.5 bg-orange-500"></div>
          </div>


          <div className="flex items-center gap-2 text-white">
            <div
              className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">2
            </div>
            <span>Batteries</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>


          <div className="flex items-center gap-2 text-white">
            <div
              className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">3
            </div>
            <span>Choose Your Plan</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-600 min-w-[40px]"></div>


          <div className="flex items-center gap-2 text-white">
            <div
              className="w-6 h-6 rounded-full bg-[#542a17] text-white text-xs font-bold flex items-center justify-center">4
            </div>
            <span>Customer Portal</span>
          </div>
        </div>
        <div >


          <div className="rounded-xl">
            {userData && <MapView userData={userData} />}
          </div>
        </div>
      </div>

    </section>
  );
}

export default SystemOverview;
