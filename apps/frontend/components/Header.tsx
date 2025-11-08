// apps/frontend/components/Header.tsx

'use client';
// CRITICAL FIX: MagnifyingGlassIcon ko BellIcon aur UserCircleIcon ke saath import karen
import { BellIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    // Background ko deep karen
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-8 shadow-lg sticky top-0 z-20">
      
      {/* Search Bar: Cyan ring on focus */}
      <div className="relative">
        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search Incidents or Logs..."
          // Focus Ring Cyan karen
          className="bg-gray-800 border border-gray-700 text-gray-200 pl-10 pr-4 py-2 rounded-full w-80 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 shadow-inner"
        />
      </div>

      {/* Notifications & User */}
      <div className="flex items-center space-x-5">
        <div className="relative cursor-pointer transition transform hover:scale-110">
          <BellIcon className="h-6 w-6 text-yellow-500" />
          {/* Alert badge hamesha Red/Vibrant rahega */}
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 border border-gray-900 animate-pulse"></span>
        </div>

        <div className="w-px h-6 bg-gray-700"></div>

        <div className="flex items-center space-x-3 cursor-default select-none">
          {/* User Icon ko Teal/Cyan karen */}
          <UserCircleIcon className="h-8 w-8 text-cyan-500" />
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