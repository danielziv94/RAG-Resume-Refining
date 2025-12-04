import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative overflow-hidden py-16 sm:py-24">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                        <span className="block">Elevate Your Career with</span>
                        <span className="block text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            AI-Powered Resume Refinement
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
                        Transform your existing resume into a targeted masterpiece. Upload your PDF, tell us your goals, and let our advanced AI craft the perfect professional narrative for you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-8 flex justify-center"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Powered by Gemini Pro & RAG Technology
                    </div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 -z-10 h-full overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-[40%] w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
        </div>
    );
};

export default Hero;
