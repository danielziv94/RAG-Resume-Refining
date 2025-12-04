import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import axios from 'axios';

const ContextInput = ({ onRefineComplete, disabled }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('query', query);

            const response = await axios.post('http://localhost:8000/refine', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            onRefineComplete(response.data.refined_content);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.detail || err.message || 'Refinement failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 mt-12">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                        <Sparkles className="w-5 h-5 text-primary mr-2" />
                        Refinement Context
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Describe your target job, career goals, or specific sections you want to improve.
                    </p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border-b border-red-100 text-red-700 text-sm flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={disabled || loading}
                        placeholder="e.g., 'I am applying for a Senior Product Manager role at a fintech company. Rewrite my summary and experience to highlight my leadership in agile environments and data-driven decision making.'"
                        className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all text-slate-700 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-400"
                    />

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={disabled || loading || !query.trim()}
                            className={`inline-flex items-center px-6 py-3 rounded-xl text-white font-medium transition-all transform active:scale-95 ${disabled || loading || !query.trim()
                                ? 'bg-slate-300 cursor-not-allowed'
                                : 'bg-primary hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Refining...
                                </>
                            ) : (
                                <>
                                    Generate Refined Resume
                                    <Send className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContextInput;
