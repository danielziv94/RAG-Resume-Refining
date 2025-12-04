import React, { useState } from 'react';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ContextInput from './components/ContextInput';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [uploadChunks, setUploadChunks] = useState(null);
  const [refinedContent, setRefinedContent] = useState(null);

  const handleUploadComplete = (chunks) => {
    setUploadChunks(chunks);
    // Reset result if re-uploading
    setRefinedContent(null);
  };

  const handleRefineComplete = (content) => {
    setRefinedContent(content);
    // Scroll to result
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Hero />

      <main className="pb-20 space-y-12">
        <section id="upload">
          <UploadSection onUploadComplete={handleUploadComplete} />
        </section>

        <section id="refine" className={`transition-opacity duration-500 ${uploadChunks ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <ContextInput
            onRefineComplete={handleRefineComplete}
            disabled={!uploadChunks}
          />
        </section>

        {refinedContent && (
          <section id="result">
            <ResultDisplay content={refinedContent} />
          </section>
        )}
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Resume Refinement Agent. Built with Gemini & React.</p>
      </footer>
    </div>
  );
}

export default App;
