import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const ResultDisplay = ({ content }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!content) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto px-4 mt-12 mb-20"
        >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
                    <h3 className="font-semibold">Refined Output</h3>
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors flex items-center text-sm"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 mr-2 text-green-400" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Text
                            </>
                        )}
                    </button>
                </div>
                <div className="p-8 overflow-x-auto bg-slate-50">
                    <pre className="whitespace-pre-wrap font-sans text-slate-800 text-base leading-relaxed">
                        {content}
                    </pre>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultDisplay;
