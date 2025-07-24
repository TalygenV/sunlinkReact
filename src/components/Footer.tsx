import React from 'react';
import logo from '../assets/images/sunlink-logo.svg';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:px-2 xl:px-14 lg:py-12">
            <div className="w-full mx-auto px-4 sm:px-2 md:px-2 lg:px-8">
                <div className="grid grid-cols-1 xl:grid-cols-[0.6fr_1.5fr_0.4fr] lg:grid-cols-[1fr_1.5fr_0.8fr] md:grid-cols-[1fr_1.5fr] gap-8">

                    {/* Column 1: Logo & About */}
                    <div>
                        <img src={logo} alt="logo" width="150" />
                        <p className="text-sm leading-relaxed mt-5">
                            SunLink revolutionizes the solar industry by putting the power back in your hands. Our innovative platform
                            eliminates high-pressure sales tactics and inflated commissions, allowing homeowners to design, customize,
                            and purchase their solar system entirely online – at a fraction of traditional costs.
                        </p>
                        <div className="socialicons mt-6 flex gap-4 text-white text-xl">
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-square-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex justify-center items-start grid grid-cols-1 xl:grid-cols-[1fr_0.8fr_1fr_1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[0.4fr_1fr_1fr_0.1fr]">
                        <div className="hidden lg:block" />
                        <div>
                            <h4 className="text-sm text-gray-300 mb-4">COMPANY</h4>
                            <ul className="space-y-2 text-sm font-mono text-white">
                                <li><a href="/about" className="hover:text-orange transition">ABOUT</a></li>
                                <li><a href="#" className="hover:text-orange transition">HOW IT WORKS</a></li>
                                <li><a href="#" className="hover:text-orange transition">PRICING</a></li>
                                <li><a href="#" className="hover:text-orange transition">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-300 mb-4">RESOURCES</h4>
                            <ul className="space-y-2 text-sm font-mono text-white">
                                <li><a href="#" className="hover:text-orange transition">TESTIMONIALS</a></li>
                                <li><a href="/privacy-policy" className="hover:text-orange transition">PRIVACY POLICY</a></li>
                                <li><a href="/terms-of-service" className="hover:text-orange transition">TERMS OF SERVICE</a></li>
                                <li><a href="#" className="hover:text-orange transition">REFERRAL PROGRAM</a></li>
                            </ul>
                        </div>
                        <div className="hidden lg:block" />
                    </div>

                    {/* Column 4: Contact CTA */}
                    <div className="flex justify-end items-start lg:block hidden">
                        <a href="#"
                            className="bg-orange hover:bg-orange py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase">
                            try sunlink now
                        </a>
                    </div>

                </div>

                {/* Bottom Disclaimer */}
                <div className="mt-10 text-center text-sm text-white border-t border-gray-700 pt-6 font-mono uppercase">
                    &copy; 2025 sunlink. all rights reserved. <br /><br />
                    Actual savings will vary depending on system production, geography, weather, shade, electricity usage, utility
                    rates, rate increases, and financing options. Savings estimated here assumes utility rate increases annually
                    and stable customer utility usage rates. Contact us to receive a detailed proposal based on your home and
                    energy usage.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
