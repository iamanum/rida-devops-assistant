// apps/frontend/app/rca-engine/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { BeakerIcon, LightBulbIcon, WrenchScrewdriverIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const RCA_API = process.env.NEXT_PUBLIC_API_URL;

// CRITICAL FIX: Prop type definition added
type CodeBlockProps = {
    code: string; 
};

// Component to display syntax-highlighted fix code
const CodeBlock = ({ code }: CodeBlockProps) => (
    <div className="bg-gray-900 border border-cyan-700 p-4 rounded-lg mt-3 font-mono text-sm shadow-xl overflow-x-auto">
        <code className="text-cyan-400 whitespace-pre-wrap">{code}</code>
    </div>
);

export default function RcaEnginePage() {
    const [logSnippet, setLogSnippet] = useState('');
    const [context, setContext] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null); // Setting result type to any for flexible AI JSON output
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!logSnippet) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post(`${RCA_API}/rca`, {
                log_snippet: logSnippet,
                context: context,
            });
            
            // Check for expected structure from backend
            if (response.data && response.data.result) {
                setResult(response.data.result);
            } else {
                setError("Invalid API response structure.");
            }

        } catch (err: any) {
            console.error("API Call Failed:", err);
            // CORS/Network error is resolved by the Middleware in main.py
            setError(err.response?.data?.detail || "Could not connect to FastAPI server. Check if backend is running on port 8001.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header />
                <main className="p-8 space-y-8 flex-1 bg-black">
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
                        <BeakerIcon className="h-8 w-8 text-cyan-500 mr-3" />
                        AI Root Cause Analysis Engine
                    </h1>

                    {/* Input Area */}
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-800 space-y-4 shadow-black/50">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="block text-sm font-medium text-gray-300">Log Snippet (Required)</label>
                            <textarea
                                value={logSnippet}
                                onChange={(e) => setLogSnippet(e.target.value)}
                                rows={6}
                                placeholder="Paste your critical error logs here (e.g., Database connection timed out...)"
                                className="w-full bg-gray-800 border border-gray-700 text-gray-100 p-3 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 shadow-inner"
                                required
                            />
                            
                            <label className="block text-sm font-medium text-gray-300 pt-2">Context (Optional)</label>
                            <input
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                type="text"
                                placeholder="e.g., Service name, recent deployment details, environment type"
                                className="w-full bg-gray-800 border border-gray-700 text-gray-100 p-3 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 shadow-inner"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg transition duration-150 ${
                                    loading 
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                        : 'bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                                }`}
                            >
                                {loading && <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />}
                                {loading ? 'Analyzing...' : 'Generate RCA (GPT-4o Mini)'}
                            </button>
                        </form>
                    </div>

                    {/* Result Area */}
                    {(error || result) && (
                        <div className="mt-8 bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-cyan-900/50 space-y-4 shadow-black/50">
                            <h2 className="text-xl font-bold border-b border-gray-700 pb-2 mb-4 text-white">Analysis Results</h2>

                            {error && (
                                <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
                                    <p className="font-semibold">Error:</p>
                                    <p className="font-mono text-sm mt-1">{error}</p>
                                </div>
                            )}

                            {result && (
                                <div className="space-y-6">
                                    {/* 1. Summary */}
                                    <div className="space-y-2">
                                        <div className="flex items-center text-lg font-semibold text-white">
                                            <LightBulbIcon className="h-6 w-6 text-yellow-400 mr-2" />
                                            Summary & Root Cause
                                        </div>
                                        <p className="text-gray-300 border-l-4 border-yellow-500 pl-3 py-1 bg-gray-800/50">
                                            {result.summary}
                                        </p>
                                        <p className="text-gray-300 pt-2">
                                            <span className='font-semibold text-cyan-400'>Detailed Cause:</span> {result.root_cause}
                                        </p>
                                    </div>

                                    {/* 2. Fix Suggestion */}
                                    <div className="space-y-2">
                                        <div className="flex items-center text-lg font-semibold text-white">
                                            <WrenchScrewdriverIcon className="h-6 w-6 text-cyan-500 mr-2" />
                                            Immediate Fix Suggestion
                                        </div>
                                        {/* CodeBlock component call */}
                                        <CodeBlock code={result.fix_suggestion} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}