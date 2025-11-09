// apps/frontend/components/Header.tsx (WOW FACTOR CODE)
'use client';
import { BellIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    // Background deep black, sticky and high z-index
    <header className="h-16 bg-[#080808] border-b border-gray-900 flex items-center justify-between px-8 shadow-2xl sticky top-0 z-20">
      
      {/* Search Bar (Glassy/Frosted Effect) */}
      <div className="relative">
        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search Incidents or Logs..."
          // WOW: Glassy look (bg-white/5 backdrop-blur-sm)
          className="bg-white/5 backdrop-blur-sm border border-cyan-800 text-gray-200 pl-10 pr-4 py-2 rounded-full w-80 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-inner shadow-black/50 transition duration-200"
        />
      </div>

      {/* User Info and Notifications */}
      <div className="flex items-center space-x-5">
        <div className="relative cursor-pointer transition hover:scale-110">
          <BellIcon className="h-6 w-6 text-yellow-400" />
          {/* Alert badge hamesha vibrant rahega */}
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 border-2 border-[#080808] animate-pulse"></span>
        </div>

        <div className="w-px h-6 bg-gray-800"></div>

        <div className="flex items-center space-x-3 cursor-default select-none">
          {/* User Icon: Cyan Accent */}
          <UserCircleIcon className="h-8 w-8 text-cyan-500 shadow-cyan-500/20" /> 
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white tracking-tight">15+ Yrs Expert</p>
            <p className="text-xs text-gray-400">iamanum</p>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;