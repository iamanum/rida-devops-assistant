// apps/frontend/components/Sidebar.tsx
'use client'; 
import { ComputerDesktopIcon, BeakerIcon, Cog6ToothIcon, CommandLineIcon } from '@heroicons/react/24/outline'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
    icon: React.ElementType;
    href: string;
    label: string;
    current: boolean;
};

const NavItem = ({ icon: Icon, href, label, current }: NavItemProps) => (
  <Link 
    href={href}
    className={`p-3 my-1 rounded-xl transition-all duration-300 group flex items-center justify-center relative 
      ${current 
        // WOW: Active State ko Cyan background aur shadow den
        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500 shadow-cyan-500/40 shadow-lg scale-105' 
        : 'text-gray-400 hover:bg-gray-800/70 hover:text-white hover:scale-105'
      }`}
    title={label}
  >
    <Icon className="h-6 w-6 flex-shrink-0" />
    
    {/* Tooltip for better UX */}
    <span className="absolute left-full ml-4 z-20 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-xl border border-gray-700">
      {label}
    </span>
  </Link>
);

const Sidebar = () => {
  const currentPath = usePathname(); 

  const navItems = [
    { icon: ComputerDesktopIcon, href: '/', label: 'Dashboard', current: currentPath === '/' },
    { icon: BeakerIcon, href: '/rca-engine', label: 'RCA Engine', current: currentPath === '/rca-engine' },
    { icon: CommandLineIcon, href: '/cli', label: 'Gemini CLI Tool', current: currentPath === '/cli' },
    { icon: Cog6ToothIcon, href: '/settings', label: 'Settings', current: currentPath === '/settings' },
  ];

  return (
    // Background deep space black, subtle glow
    <aside className="w-24 bg-[#080808] border-r border-gray-900 h-screen p-4 flex flex-col items-center flex-shrink-0 shadow-2xl">
      
      {/* Brand Logo (Luminous Effect) */}
      <div className="text-2xl font-extrabold text-cyan-400 mb-8 mt-2 tracking-tighter hover:scale-110 transition-transform cursor-pointer shadow-cyan-500/50">
        RIDA
      </div>

      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <p className="text-xs text-gray-700 mt-auto mb-2">© RIDA v1.0</p>
    </aside>
  );
};
export default Sidebar;