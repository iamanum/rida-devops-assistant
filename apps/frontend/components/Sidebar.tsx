// apps/frontend/components/Sidebar.tsx
'use client'; 
// Navigation aur Icons ke liye zaruri imports
import { ComputerDesktopIcon, BeakerIcon, Cog6ToothIcon, CommandLineIcon } from '@heroicons/react/24/outline'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Client-side hook for dynamic path checking

// --- 1. TYPE DEFINITION (For TypeScript Safety) ---
type NavItemProps = {
    icon: React.ElementType; // Icon component ka type
    href: string;
    label: string;
    current: boolean;
};
// ---------------------------------------------------

// Helper component for navigation items (Tooltips ke saath)
const NavItem = ({ icon: Icon, href, label, current }: NavItemProps) => (
  <Link 
    href={href}
    // Professional Styling: Deep Black background, Cyan highlight on active
    className={`p-3 my-1 rounded-xl transition-all duration-300 group flex items-center justify-center relative 
      ${current ? 'bg-cyan-600 text-white shadow-xl scale-105' : 'text-gray-400 hover:bg-gray-800 hover:text-white hover:scale-105'}`}
    title={label}
  >
    {/* Icon Sizing Fix: h-6 w-6 se size theek rahega */}
    <Icon className="h-6 w-6 flex-shrink-0" />
    
    {/* Tooltip for better UX in slim sidebar */}
    <span className="absolute left-full ml-4 z-20 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg border border-gray-700">
      {label}
    </span>
  </Link>
);

const Sidebar = () => {
  // --- 2. DYNAMIC LOGIC (Getting Current Path) ---
  const currentPath = usePathname(); 

  const navItems = [
    { icon: ComputerDesktopIcon, href: '/', label: 'Dashboard', current: currentPath === '/' },
    { icon: BeakerIcon, href: '/rca-engine', label: 'RCA Engine', current: currentPath === '/rca-engine' },
    { icon: CommandLineIcon, href: '/cli', label: 'Gemini CLI Tool', current: currentPath === '/cli' },
    { icon: Cog6ToothIcon, href: '/settings', label: 'Settings', current: currentPath === '/settings' },
  ];

  return (
    // Fixed width w-20 (80px) aur deep background color (bg-gray-900)
    <aside className="w-24 bg-gray-900 border-r border-gray-800 h-screen p-4 flex flex-col items-center flex-shrink-0 shadow-2xl">
      
      {/* Brand Logo (2xl size, Cyan color) */}
      <div className="text-2xl font-extrabold text-cyan-500 mb-8 mt-2 tracking-tighter hover:scale-110 transition-transform cursor-pointer">
        RIDA
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* Version and Copyright */}
      <p className="text-xs text-gray-500 mt-auto mb-2">© RIDA v1.0</p>
    </aside>
  );
};
export default Sidebar;