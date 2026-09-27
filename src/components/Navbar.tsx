import React from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  Code2, 
  CheckSquare, 
  FileText, 
  Download, 
  Languages, 
  Printer,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'plan' | 'playground' | 'code' | 'sprint' | 'report';
  setActiveTab: (tab: 'plan' | 'playground' | 'code' | 'sprint' | 'report') => void;
  lang: 'en' | 'ta';
  setLang: (lang: 'en' | 'ta') => void;
  onPrint: () => void;
  onDownloadAllCode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onPrint,
  onDownloadAllCode,
}) => {
  const navItems = [
    {
      id: 'plan' as const,
      label: lang === 'en' ? 'Project Plan & Epics' : 'திட்ட விபரம் (Epics)',
      icon: BookOpen,
      count: '5 Epics',
    },
    {
      id: 'playground' as const,
      label: lang === 'en' ? 'Live Flow & AI Test' : 'நேரடி AI சோதனை',
      icon: PlayCircle,
      badge: 'Live',
    },
    {
      id: 'code' as const,
      label: lang === 'en' ? 'Source Code' : 'பைதான் குறியீடு',
      icon: Code2,
      count: '7 Files',
    },
    {
      id: 'sprint' as const,
      label: lang === 'en' ? 'Sprint & Verification' : 'ஸ்பிரிண்ட் & சோதனைகள்',
      icon: CheckSquare,
      count: '100%',
    },
    {
      id: 'report' as const,
      label: lang === 'en' ? 'Formal Project Report' : 'முழு அறிக்கை (Report)',
      icon: FileText,
      badge: 'Print',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  GenAI Project Blueprint
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  FastAPI + Gemini
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {lang === 'en' ? 'Architecture • Core Features • Jinja2 • Deployment' : 'கட்டமைப்பு • மைய செயல்பாடுகள் • Jinja2 • வெளியீடு'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Toggle English / தமிழ்"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Print / Export Report */}
            <button
              onClick={onPrint}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Print to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export PDF</span>
            </button>

            {/* Download Code */}
            <button
              onClick={onDownloadAllCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition"
              title="Download Python FastAPI Code Files"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Get Code</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none border-t border-slate-800/80 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.count && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 animate-pulse font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
