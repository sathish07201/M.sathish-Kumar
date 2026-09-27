/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProjectPlanView } from './components/ProjectPlanView';
import { LivePlayground } from './components/LivePlayground';
import { CodeExplorer } from './components/CodeExplorer';
import { SprintTracker } from './components/SprintTracker';
import { ProjectReportView } from './components/ProjectReportView';
import { CODE_FILES } from './data/codeTemplates';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Heart,
  Github
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'plan' | 'playground' | 'code' | 'sprint' | 'report'>('plan');
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [selectedFileForExplorer, setSelectedFileForExplorer] = useState<string>('app.py');

  const handleNavigateToCode = (filename: string) => {
    setSelectedFileForExplorer(filename);
    setActiveTab('code');
  };

  const handleNavigateToPlayground = () => {
    setActiveTab('playground');
  };

  const handlePrint = () => {
    setActiveTab('report');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const handleDownloadAllCode = () => {
    // Sequentially download key files
    CODE_FILES.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name.split('/').pop() || file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, index * 200);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onPrint={handlePrint}
        onDownloadAllCode={handleDownloadAllCode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'plan' && (
          <ProjectPlanView
            lang={lang}
            onNavigateToCode={handleNavigateToCode}
            onNavigateToPlayground={handleNavigateToPlayground}
          />
        )}

        {activeTab === 'playground' && (
          <LivePlayground lang={lang} />
        )}

        {activeTab === 'code' && (
          <CodeExplorer
            selectedFileName={selectedFileForExplorer}
            onSelectFile={setSelectedFileForExplorer}
            lang={lang}
          />
        )}

        {activeTab === 'sprint' && (
          <SprintTracker
            lang={lang}
            onNavigateToCode={handleNavigateToCode}
          />
        )}

        {activeTab === 'report' && (
          <ProjectReportView
            lang={lang}
            onPrint={handlePrint}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="print:hidden border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Generative AI Application</span>
            <span>•</span>
            <span>5 Epics & 10 User Stories</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">100% Production Ready</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>FastAPI</span>
            <span>•</span>
            <span>Jinja2</span>
            <span>•</span>
            <span>Google Gemini</span>
            <span>•</span>
            <span>Uvicorn ASGI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
