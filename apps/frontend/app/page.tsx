// apps/frontend/app/page.tsx
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ChartBarIcon, ExclamationTriangleIcon, ClockIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="p-8 space-y-8 flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <ChartBarIcon className="h-6 w-6 flex-shrink-0 text-red-400" />
                <p className="text-sm text-gray-400">Total Incidents</p>
              </div>
              <p className="text-3xl font-bold text-red-400 mt-4">14</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-6 w-6 flex-shrink-0 text-green-400" />
                <p className="text-sm text-gray-400">Average RCA Time</p>
              </div>
              <p className="text-3xl font-bold text-green-400 mt-4">12s</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <ClipboardDocumentCheckIcon className="h-6 w-6 flex-shrink-0 text-blue-400" />
                <p className="text-sm text-gray-400">Resolved Tickets</p>
              </div>
              <p className="text-3xl font-bold text-blue-400 mt-4">56</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="h-6 w-6 flex-shrink-0 text-yellow-400" />
                <p className="text-sm text-gray-400">Pending Alerts</p>
              </div>
              <p className="text-3xl font-bold text-yellow-400 mt-4">7</p>
            </div>
          </div>

          {/* Alerts Timeline */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 h-[400px] overflow-y-auto hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">Real-time Incident Timeline</h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 text-red-500" />
                <p className="text-sm text-gray-300">Incident #101 reported on Server-2</p>
                <span className="ml-auto text-xs text-gray-500">2m ago</span>
              </li>
              <li className="flex items-center space-x-3 p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 text-red-500" />
                <p className="text-sm text-gray-300">Incident #102 reported on Database Cluster</p>
                <span className="ml-auto text-xs text-gray-500">5m ago</span>
              </li>
              <li className="flex items-center space-x-3 p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
                <ClockIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
                <p className="text-sm text-gray-300">RCA Completed for Incident #99</p>
                <span className="ml-auto text-xs text-gray-500">10m ago</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
