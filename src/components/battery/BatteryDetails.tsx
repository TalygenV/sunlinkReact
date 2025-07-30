import React, { useEffect, useRef, useState } from 'react';
import checkIcon from '../assets/images/check.svg';
import infoCircleIcon from '../assets/images/info-circle_svgrepo.com.svg';
import vectorIcon from '../assets/images/Vector.svg';
import colorIcon from '../assets/images/color.svg';
import clockIcon from '../assets/images/clock-three.svg';
import tickIcon from '../assets/images/tick-circle_svgrepo.com.svg';
import specsIcon from '../assets/images/list-1_svgrepo.com.svg';
import backupIcon from '../assets/images/shield_svgrepo.com.svg';
import savingsIcon from '../assets/images/graph_svgrepo.com.svg';
import essentialsIcon from '../assets/images/Frame-16188731261.svg';
import appliancesIcon from '../assets/images/Frame-1618873126.svg';
import writeIcon from '../assets/images/write_svgrepo.com.svg';
import { Battery } from '../../types/Battery';
import { getBackupOptions } from './BackupDurationCard';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, } from "chart.js";
import { useNavigate } from 'react-router-dom';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BatteryDetailsProps {
    battery: Battery;
    onQuantityChange: (quantity: number) => void;
    onPrequalify: () => void;
    onCompareAll: () => void;
}
interface Summary {
    lifetimeAvoidedCost: number;
}
interface SeriesDataItem {
    seriesId: number;
    fromDateTime: string;
    cost: number;
    qty: number;
}
interface ApiResult {
    summary: Summary;
    seriesData: SeriesDataItem[];
}
interface ChartData {
    labels: string[];
    solarOnlyCosts: number[];
    solarBatteryCosts: number[];
    solarOnlyKWh: number;
    solarBatteryKWh: number;
    solarOnlyTotal: number;
    solarBatteryTotal: number;
    solarOnlyRate: number;
    solarBatteryRate: number;
    summary: Summary;
}
const base_url = "https://api.genability.com";
const basic_token =
    "ZGI5MTczMGItNWUwNi00N2I1LWI3MjAtNzcyZDc5ODUyNTA1OjBiY2U1M2RiLTc3NjItNGQ0Zi1iZDA1LWYzODEwNWE1OWI5YQ==";
const BatteryDetails: React.FC<BatteryDetailsProps> = ({
    battery,
    onQuantityChange,
    onPrequalify,
    onCompareAll
}) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(1);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    };
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    const totalCapacity = parseFloat(battery.capacity) * quantity;
    const totalPrice = battery.price * quantity;
    const backupOptions = getBackupOptions(quantity);
    const [showWithTaxCredit, setShowWithTaxCredit] = useState<boolean>(true);
    const taxCreditAmount = Math.round(totalPrice * 0.3);
    const netCostAfterCredit = totalPrice - taxCreditAmount;
    const displayPrice = showWithTaxCredit ? netCostAfterCredit : totalPrice;
    // Calculate projected backup hours based on average home consumption
    const projectedBackupHours = Math.round((totalCapacity / 1.25) * 10) / 10;

    const operatingModes = [
        { id: 'backup', label: 'Backup Only', description: 'Emergency power only', color: 'bg-orange-500' },
        { id: 'self-consumption', label: 'Self-Consumption', description: 'Use solar first, then battery', color: 'bg-teal-500' },
        { id: 'time-of-use', label: 'Time-of-Use', description: 'Avoid peak hour rates', color: 'bg-gray-400' }
    ];



    const [data, setData] = useState<ChartData | null>(null);
    useEffect(() => {
        setData(null);

        onQuantityChange(1); // ✅ Tell parent: "Reset quantity to 1"
    }, [battery]);

    const lastBatteryRef = useRef<Battery | null>(null);
    const lastQuantityRef = useRef<number | null>(null);

    useEffect(() => {


        console.log("testt");
        const randomId = Math.floor(Math.random() * 100000);
        const lastBattery = lastBatteryRef.current;
        const lastQuantity = lastQuantityRef.current;
        const batteryChanged =
            JSON.stringify(lastBattery) !== JSON.stringify(battery);

        if (!batteryChanged && lastQuantity === quantity) {
            console.log('Battery changed, not running loadReport');
            return;
        }
        lastQuantityRef.current = quantity;
        async function loadReport() {
            const savedStr = localStorage.getItem('userData');
            const saved = savedStr ? JSON.parse(savedStr) : null;
            if (saved) {
                const genabilityInfo = saved.genabilityInfo;
                setData(null);

                const today = new Date().toISOString().split("T")[0];
                const dataStore = await fetch(`${base_url}/rest/v1/accounts/analysis`, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${basic_token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "providerAccountId": genabilityInfo.providerAccountId,
                        "fromDateTime": today,
                        "useIntelligentBaselining": true,
                        "propertyInputs": [
                            {
                                "keyName": "providerProfileId",
                                "dataType": "STRING",
                                "dataValue": `Annual-Consumption-${genabilityInfo.providerAccountId}`,
                                "scenarios": "before,after",
                                "dataFactor": 1.0
                            },
                            {
                                "keyName": "providerProfileId",
                                "dataType": "STRING",
                                "dataValue": `Solar-Production-PVWatts-6kW-${genabilityInfo.providerAccountId}`,
                                "scenarios": "solar,after",
                                "dataFactor": 1.0
                            },
                            {
                                "keyName": "projectDuration",
                                "dataType": "INTEGER",
                                "dataValue": "31"
                            },
                            {
                                "keyName": "rateInflation",
                                "dataType": "DECIMAL",
                                "dataValue": "3.0",
                                "scenarios": "before,after"
                            },
                            {
                                "keyName": "rateInflation",
                                "dataType": "DECIMAL",
                                "dataValue": "2.0",
                                "scenarios": "solar"
                            },
                            {
                                "keyName": "solarDegradation",
                                "dataType": "DECIMAL",
                                "dataValue": "0.5",
                                "scenarios": "solar"
                            }
                        ],
                        "rateInputs": [
                            {
                                "chargeType": "FIXED_PRICE",
                                "chargePeriod": "MONTHLY",
                                "transactionType": "BUY",
                                "rateBands": [
                                    {
                                        "rateAmount": 0.0
                                    }
                                ],
                                "scenarios": "solar"
                            }
                        ]
                    })
                });

                if (!dataStore.ok) throw new Error(await dataStore.text());
                const analysisData = await dataStore.json();
                const scenarios = analysisData.results[0].scenarios;
                const afterScenario = scenarios.find((scenario: { name: string; }) => scenario.name === "after");
                const afterMasterTariffId = afterScenario?.inputs.find((input: { keyName: string; }) => input.keyName === "masterTariffId")?.dataValue || null;
                await fetch(`${base_url}/rest/v1/profiles/storage`, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${basic_token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "providerAccountId": genabilityInfo.providerAccountId,
                        "providerProfileId": `Storage-Profile-Optimize-${genabilityInfo.providerAccountId}-${randomId}`,
                        "profileName": "Storage Profile - Optimize",
                        "fromDateTime": today,
                        "consumption": {
                            "providerProfileId": `Annual-Consumption-${genabilityInfo.providerAccountId}`
                        },
                        "solar": {
                            "providerProfileId": `Solar-Production-PVWatts-6kW-${genabilityInfo.providerAccountId}`
                        },
                        "storage": {
                            "mainTariffId": afterMasterTariffId,
                            "dispatchStrategy": {
                                "optimize": true
                            },

                            "batteryNameplatePower": ((battery.batteryNameplatePower ?? 0) * quantity).toString(),
                            "batteryNameplateCapacity": ((battery.batteryNameplateCapacity ?? 0) * quantity)?.toString(),
                            "batteryMinSoc": battery.batteryMinSoc?.toString(),
                            "batteryMaxSoc": battery.batteryMaxSoc?.toString(),
                            "batteryInitialSoc": "0.0",
                            "batteryDcCoupled": battery.batteryDcCoupled?.toString(),
                            "batteryAcToDcEfficiency": battery.batteryAcToDcEfficiency?.toString(),
                            "batteryDcToAcEfficiency": battery.batteryDcToAcEfficiency?.toString(),
                            "batteryInputEfficiency": "0.0",
                            "batteryDegradationCost": battery.batteryDegradationCost?.toString(),
                            "solarDcToAcEfficiency": "0.0",
                            "allowBatteryToGrid": battery.allowBatteryToGrid?.toString(),
                            "allowGridToBattery": battery.allowGridToBattery?.toString(),
                            "allowSolarToGrid": battery.allowSolarToGrid?.toString(),
                            "allowSolarToBattery": battery.allowSolarToBattery?.toString(),
                            "tariffPropertyInputs": [
                                {
                                    "keyName": "interconnectionYear",
                                    "dataValue": "2025"
                                },
                                {
                                    "keyName": "accPlusAdderCustomerType",
                                    "dataValue": "nonLowIncome"
                                },
                                {
                                    "keyName": "hasCareDiscount",
                                    "dataValue": "false"
                                }
                            ]
                        }

                    })
                });
                const analysisStore = await fetch(`${base_url}/rest/v1/accounts/analysis`, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${basic_token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({

                        "providerAccountId": genabilityInfo.providerAccountId,
                        "fromDateTime": today,
                        "useIntelligentBaselining": true,
                        "propertyInputs": [
                            {
                                "keyName": "providerProfileId",
                                "dataValue": `Annual-Consumption-${genabilityInfo.providerAccountId}`,
                                "scenarios": "before"
                            },
                            {
                                "keyName": "storageProviderProfileId",
                                "dataValue": `Storage-Profile-Optimize-${genabilityInfo.providerAccountId}-${randomId}`,
                                "scenarios": "after,solar"
                            },
                            {
                                "keyName": "projectDuration",
                                "dataValue": "31"
                            },
                            {
                                "keyName": "rateInflation",
                                "dataValue": "3.0",
                                "scenarios": "before,after"
                            },
                            {
                                "keyName": "rateInflation",
                                "dataValue": "2.0",
                                "scenarios": "solar"
                            },
                            {
                                "keyName": "solarDegradation",
                                "dataValue": "0.5",
                                "scenarios": "solar"
                            }
                        ],
                        "rateInputs": [
                            {
                                "chargeType": "FIXED_PRICE",
                                "chargePeriod": "MONTHLY",
                                "transactionType": "BUY",
                                "rateBands": [
                                    {
                                        "rateAmount": 0.0
                                    }
                                ],
                                "scenarios": "solar"
                            }
                        ]

                    })
                });

                if (!analysisStore.ok) throw new Error(await analysisStore.text());
                const saving = await analysisStore.json();

                const json: { results: ApiResult[] } = saving;
                const result = json.results[0];
                const summary = result.summary;

                const seriesData = result.seriesData;
                const solarOnly = seriesData.filter((d) => d.seriesId === 1);
                const solarBattery = seriesData.filter((d) => d.seriesId === 2);

                const labels = solarOnly.map((d) => {
                    const date = new Date(d.fromDateTime);
                    return `${date.toLocaleString("default", {
                        month: "short",
                    })} ${date.getFullYear()}`;
                });

                const solarOnlyCosts = solarOnly.map((d) => d.cost);
                const solarBatteryCosts = solarBattery.map((d) => d.cost);

                const solarOnlyKWh = solarOnly.reduce((sum, d) => sum + d.qty, 0);
                const solarBatteryKWh = solarBattery.reduce((sum, d) => sum + d.qty, 0);
                const solarOnlyTotal = solarOnlyCosts.reduce((a, b) => a + b, 0);
                const solarBatteryTotal = solarBatteryCosts.reduce((a, b) => a + b, 0);

                const solarOnlyRate = solarOnlyTotal / solarOnlyKWh;
                const solarBatteryRate = solarBatteryTotal / solarBatteryKWh;

                setData({
                    labels,
                    solarOnlyCosts,
                    solarBatteryCosts,
                    solarOnlyKWh,
                    solarBatteryKWh,
                    solarOnlyTotal,
                    solarBatteryTotal,
                    solarOnlyRate,
                    solarBatteryRate,
                    summary,
                });
            }
        }
        loadReport();
        lastBatteryRef.current = battery;
    }, [quantity]);



    const chartData = {
        labels: data?.labels,
        datasets: [
            {
                label: "Solar Only",
                data: data?.solarOnlyCosts,
                backgroundColor: "#888",
            },
            {
                label: "Solar + Battery",
                data: data?.solarBatteryCosts,
                backgroundColor: "#3ed18c",
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: "white" },
            },
            x: {
                ticks: {
                    color: "white",
                    maxRotation: 45,
                    minRotation: 0,
                },
            },
        },
        plugins: {
            legend: {
                labels: { color: "white" },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `$${context.parsed.y.toFixed(2)}`;
                    },
                },
            },
        }
    }
    const nextGoPage = () => {
        console.log("checkk");
        navigate("/choose-plan");
    };
    return (
        <div className="lg:pt-4 lg:pl-2">
            <div className="custom-formcls p-8 rounded-xl max-w-[700px] ml-auto space-y-6 border border-neutral-600">
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-2xl text-white text-sm">
                        <span className="w-3 h-3 rounded-full bg-orange-600"></span> Most Recommended
                    </span>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm" onClick={() => onCompareAll()}>Compare all</button>
                    {/* Modal Component */}

                </div>

                <h3 className="text-gray-300 text-3xl mb-3">{battery.name}</h3>
                <p className="text-gray-300 text-xl">
                    Perfect for homeowners seeking reliability and smart features. Integrates seamlessly with all solar systems and advanced smartphone app with 24/7 monitoring features.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-4 mt-3">
                    <div className="w-full sm:w-[calc(50%-0.75rem)]">
                        <label className="w-full text-gray-300 text-xl">Available Color</label>
                        <div className="flex items-center mb-4 mt-2">
                            <img className="mr-2 mt-1" src={colorIcon} alt="Color" />
                        </div>
                    </div>

                    <div className="w-full sm:w-[calc(50%-0.75rem)]">
                        <label className="w-full text-gray-300 text-xl">Quantity</label>
                        <div className="relative flex items-center text-white mt-2">
                            <button type="button" onClick={handleDecrement} className="shrink-0 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-full h-8 w-8 flex items-center justify-center">
                                -
                            </button>
                            <input type="text" className="shrink-0 text-white border-0 bg-transparent text-sm font-normal max-w-[2.5rem] text-center" value={quantity} readOnly />
                            <button type="button" onClick={handleIncrement} className="shrink-0 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-full h-8 w-8 flex items-center justify-center">
                                +
                            </button>
                        </div>
                    </div>
                    <div className="w-full space-y-2 mb-6 mt-6 plain-black-bg p-5 py-7 rounded-2xl ">
                        <div className="text-gray-300 text-xl flex justify-between flex-wrap">
                            <span><img className="mr-2 mt-1 float-left" src={clockIcon} alt="Info" /><span>Projected Backup Hours (h): </span></span>
                            <span className="text-gray-100 text-2xl">{projectedBackupHours}</span>
                        </div>
                    </div>
                    {/* <div className="w-full space-y-2 mb-6 mt-6 plain-black-bg p-5 py-7 rounded-2xl">
                        <div className="text-gray-300 text-xl flex justify-between flex-wrap">
                            <span>
                                <img className="mr-2 mt-1 float-left" src={clockIcon} alt="Info" /> Projected Backup Hours (h):
                            </span>
                            <span className="text-gray-100 text-2xl">{projectedBackupHours}</span>
                        </div>
                    </div> */}

                    <div className="w-full text-center">
                        <button onClick={() => nextGoPage()} className="orangegradbtn rounded-xl border border-[#F47121] py-4 px-5 mb-2 text-lg font-normal text-white w-full flex justify-center" >
                            Select {battery.name}
                        </button>
                    </div>

                    <p className="text-sm text-gray-400 flex items-center">* Prices is subjected to eligibility requirements.</p>
                    <div className="custom-gradient flex items-start gap-3 bg-gray-800 bg-opacity-50 rounded-lg p-4 text-gray-300 text-sm max-w-xl">
                        <img src={infoCircleIcon} className="text-gray-400 flex-shrink-0" />
                        <p className="text-sm leading-[20px] ">
                            <span className="font-normal text-gray-400">Tax Credit Disclaimer:</span> The 30% federal tax credit is subject to eligibility requirements and may vary based on your tax situation. Consult with a tax professional to
                            determine your specific benefits. Local and utility incentives vary by location and may have additional requirements or limitations.
                        </p>
                    </div>
                    <div className="bg-neutral-600 w-full h-px my-3"></div>
                    <div className="space-y-4 w-full">
                        {/* Specifications Section */}
                        <div className="custom-gradient custom-bod text-white rounded-lg px-6 py-4 border border-neutral-600">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleSection('specs')}
                            >
                                <div className="flex items-center space-x-2">
                                    <span><img src={specsIcon} alt="specifications" /></span>
                                    <h2 className="text-xl font-normal">Specifications</h2>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-white transform transition-transform duration-300 ${openSection === 'specs' ? 'rotate-180' : ''}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            {openSection === 'specs' && (
                                <div className="mt-4 overflow-hidden">
                                    <p className="text-lg text-gray-400">Key features include:</p>
                                    <ul className="mt-4 space-y-3">
                                        <li className="flex items-center space-x-3">
                                            <img src={tickIcon} alt="check-icon" />
                                            <span>Integrated inverter</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <img src={tickIcon} alt="check-icon" />
                                            <span>App-based monitoring</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <img src={tickIcon} alt="check-icon" />
                                            <span>Storm Watch feature</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/*  Backup Section  */}
                        <div className="custom-gradient custom-bod text-white rounded-lg px-6 py-4 border border-neutral-600">
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('backup')}>
                                <div className="flex items-center space-x-2">
                                    <span><img src={backupIcon} alt="backup" /></span>
                                    <h2 className="text-xl font-normal">Backup</h2>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-white transform transition-transform duration-300 ${openSection === 'backup' ? 'rotate-180' : ''}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            {openSection === 'backup' && (
                                <div className="mt-4 overflow-hidden">
                                    <p className="text-sm text-gray-300">Operating Mode</p>
                                    <div className="bg-[#252727] px-5 py-4 rounded-lg mt-6 w-full">
                                        <label className="flex items-center space-x-2 text-white">
                                            <img src={tickIcon} alt="check-icon" />
                                            <span className="text-white pl-2">Backup Only</span>
                                        </label>
                                        <p className="text-gray-400 text-sm mt-3">Emergency power only</p>
                                    </div>
                                    <div className="bg-[#252727] px-5 py-4 rounded-lg mt-4 w-full">
                                        <label className="flex items-center space-x-2 text-white">
                                            <img src={tickIcon} alt="check-icon" />
                                            <span className="text-white pl-2">Self-Consumption</span>
                                        </label>
                                        <p className="text-gray-400 text-sm mt-3">Use solar first, then battery</p>
                                    </div>
                                    <div className="bg-[#252727] px-5 py-4 rounded-lg mt-4 w-full">
                                        <label className="flex items-center space-x-2 text-white">
                                            <img src={tickIcon} alt="check-icon" />
                                            <span className="text-white pl-2">Time-of-Use</span>
                                        </label>
                                        <p className="text-gray-400 text-sm mt-3">Avoid peak hour rates</p>
                                    </div>
                                    <p className="text-sm text-gray-300 py-5">Backup Duration Scenarios</p>
                                    <div className="bg-[#252727] px-5 py-5 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <img src={essentialsIcon} alt="Essentials" />
                                            <div>
                                                <h3 className="text-lg font-medium text-white">Essentials</h3>
                                                <p className="text-gray-400 text-sm">Critical systems only</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-8 ml-8 mt-4">
                                            <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#fe3c26]">
                                                <li>Refrigerator</li>
                                                <li>Phone charging</li>
                                            </ul>
                                            <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#fe3c26]">
                                                <li>Lights (LED)</li>
                                                <li>Internet/Wifi</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bg-[#252727] px-5 py-5 mt-4 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <img src={appliancesIcon} alt="Appliances" />
                                            <div>
                                                <h3 className="text-lg font-medium text-white">Appliances</h3>
                                                <p className="text-gray-400 text-sm">Most home appliances</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-8 ml-8 mt-4">
                                            <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#1f5c64]">
                                                <li>All essentials</li>
                                                <li>Dishwasher</li>
                                            </ul>
                                            <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#1f5c64]">
                                                <li>Washer/Dryer</li>
                                                <li>Microwave</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bg-[#252727] px-5 py-5 mt-4 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <img src={appliancesIcon} alt="Whole Home" />
                                            <div>
                                                <h3 className="text-lg font-medium text-white">Whole Home</h3>
                                                <p className="text-gray-400 text-sm">Compare home backup</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-8 ml-8 mt-4">
                                            <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#bb0021]">
                                                <li>All appliances</li>
                                                <li>Electric vehicle charging</li>
                                            </ul>
                                            <ul className="list-disc pl-6 text-gray-300 space-y-2 marker:text-[#bb0021]">
                                                <li>HVAC system</li>
                                                <li>Pool/Spa equipment</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Savings Section */}
                        <div className="custom-gradient custom-bod text-white rounded-lg px-6 py-4 border border-neutral-600">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleSection('savings')}
                            >
                                <div className="flex items-center space-x-2">
                                    <span><img src={savingsIcon} alt="savings" /></span>
                                    <h2 className="text-xl font-normal">Savings</h2>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-white transform transition-transform duration-300 ${openSection === 'savings' ? 'rotate-180' : ''}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            {openSection === 'savings' && (
                                <div className="mt-4 overflow-hidden">
                                    <p className="text-lg text-gray-300">Energy Arbitrage:</p>
                                    <p className="text-base text-white py-4">Average monthly utility bill</p>

                                    <div className="flex gap-4 w-10/12 text-white customradio sys_overview mt-3 s-utility rounded-xl border border-neutral-600">
                                        <div className="w-2/4">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="radio" name="ownership" value="own" className="accent-blue-600 w-5 h-5" defaultChecked />
                                                <span className="text-sm py-3 px-3 rounded-md text-center">Utility Bill Savings</span>
                                            </label>
                                        </div>
                                        <div className="w-2/4">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="radio" name="ownership" value="rent" className="accent-blue-600 w-5 h-5" />
                                                <span className="text-sm py-3 px-3 rounded-md text-center"><a href="#">After Tax Credit</a></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 w-12/12 gap-4 mt-6 mb-6 wp">
                                        <div className="bg-[#161d20] custom-bod text-white rounded-xl p-4 border border-neutral-600">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-[#ffffff99]">Solar only</span>
                                                {/* <a href="dashboard-flow2-2.html"><img src={writeIcon} alt="edit" /></a> */}
                                            </div>
                                            <div className="text-lg sm:text-2xl font-bold text-white mb-1">
                                                ${data?.solarOnlyTotal.toFixed(2)}
                                            </div>
                                            <div className="text-xs text-white/50">
                                                <span>{data?.solarOnlyKWh.toFixed(1)} kWh</span> • <span>{data ? (data?.solarOnlyRate * 100).toFixed(2) : 0} ¢/kWh</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#1f433a] custom-bod text-white rounded-xl p-4 border border-neutral-600">
                                            <div className="text-xs text-[#ffffff99]">Solar + battery</div>
                                            <div className="text-4xl font-semibold pt-[25px]">{data?.solarBatteryRate ? (data?.solarBatteryRate * 100).toFixed(2) : 0} ¢/kWh</div>
                                        </div>
                                    </div>

                                    <p className="text-base text-white py-4">Monthly Cost Comparison</p>
                                    <div className="plain-black-bg p-10 rounded-2xl border-0 mb-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-1 text-sm">
                                            {!data ? (
                                                <div className="flex flex-col justify-center items-center py-12">
                                                    <svg
                                                        className="animate-spin h-8 w-8 text-white opacity-80"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                        ></path>
                                                    </svg>
                                                    <span className="mt-4 text-white opacity-80">Loading saving data...</span>
                                                </div>
                                            ) : (
                                                <Bar data={chartData} options={options} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-[#1f433a] p-6 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl pb-2">Annual Savings ($)</h3>
                                            <p className="text-xs">With {quantity} batteries + Scales with quantity</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-semibold">${data?.summary?.lifetimeAvoidedCost?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
                <div className="bg-neutral-600 w-full h-px my-3"></div>
                <div className="grid grid-cols-3 w-full gap-4 mb-6 wp">
                    <div className="bg-[#161d20] custom-bod  text-white rounded-xl p-4 border border-neutral-600">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-[#ffffff99]">Capacity (kWh)</span>
                            <a href="dashboard-flow2-2.html"></a>
                        </div>
                        <div className="text-4xl font-semibold pt-[25px]">{parseFloat(battery.capacity) * quantity}</div>
                    </div>
                    <div className="bg-[#1f433a] custom-bod  text-white rounded-xl p-4 border border-neutral-600">
                        <div className="text-xs text-[#ffffff99]">Net Cost  ($)</div>
                        <div className="text-4xl font-semibold pt-[25px]">${totalPrice.toLocaleString()}</div>
                    </div>

                </div>
                <p className="text-sm text-gray-400 flex items-center">
                    *Tax credits applied.
                    <a href="#" className="underline decoration-solid text-white ml-1">See full price</a>
                </p>
            </div>
        </div>
    );
};

export default BatteryDetails;
