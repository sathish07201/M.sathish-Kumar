import React, { useState } from 'react';
import { 
  EPICS_DATA, 
  Epic, 
  Story 
} from '../data/projectData';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Cpu, 
  FileCode, 
  Layout, 
  Rocket, 
  ArrowRight,
  ExternalLink,
  Target,
  ListChecks,
  CheckCheck
} from 'lucide-react';

interface ProjectPlanViewProps {
  lang: 'en' | 'ta';
  onNavigateToCode: (filename: string) => void;
  onNavigateToPlayground: () => void;
}

const EPIC_ICONS: Record<number, any> = {
  1: Cpu,
  2: Layers,
  3: FileCode,
  4: Layout,
  5: Rocket,
};

export const ProjectPlanView: React.FC<ProjectPlanViewProps> = ({
  lang,
  onNavigateToCode,
  onNavigateToPlayground,
}) => {
  const [selectedEpicFilter, setSelectedEpicFilter] = useState<string>('all');
  const [expandedStories, setExpandedStories] = useState<Record<string, boolean>>({
    'story-1-1': true,
    'story-1-2': true,
    'story-2-1': true,
    'story-2-2': true,
    'story-3-1': true,
    'story-4-1': true,
    'story-4-2': true,
    'story-5-1': true,
    'story-5-2': true,
  });

  // State for user-checked activities
  const [checkedActivities, setCheckedActivities] = useState<Record<string, boolean>>({});

  const toggleStory = (storyId: string) => {
    setExpandedStories((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  const toggleActivity = (activityKey: string) => {
    setCheckedActivities((prev) => ({
      ...prev,
      [activityKey]: !prev[activityKey],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    EPICS_DATA.forEach((epic) => {
      epic.stories.forEach((story) => {
        all[story.id] = true;
      });
    });
    setExpandedStories(all);
  };

  const collapseAll = () => {
    setExpandedStories({});
  };

  const filteredEpics = selectedEpicFilter === 'all' 
    ? EPICS_DATA 
    : EPICS_DATA.filter((e) => e.id === selectedEpicFilter);

  return (
    <div className="space-y-8">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {lang === 'en' ? 'Official Project Development Plan' : 'அங்கீகரிக்கப்பட்ட புராஜெக்ட் திட்டம்'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {lang === 'en' 
                ? 'Generative AI Application: 5-Epic Master Blueprint' 
                : 'ஜெனரேட்டிவ் ஏஐ அப்ளிகேஷன்: 5 எபிக் முழுமையான கட்டமைப்பு'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {lang === 'en'
                ? 'From LLM selection and FastAPI architecture definition to Jinja2 responsive templates and verified local Uvicorn deployment.'
                : 'மாடல் தேர்வு மற்றும் FastAPI கட்டமைப்பு முதல் Jinja2 ரெஸ்பான்சிவ் டெம்ப்ளேட்கள் மற்றும் உள்ளூர் Uvicorn வெளியீடு வரை முழுமையான திட்டம்.'}
            </p>

            {/* Architecture Pipeline Summary */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Core Architecture Flow:' : 'மைய கட்டமைப்பு ஓட்டம்:'}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-indigo-300">
                <span className="text-emerald-400 font-bold">User</span>
                <span className="text-slate-500">→</span>
                <span className="text-indigo-400 font-bold">Frontend (Jinja2)</span>
                <span className="text-slate-500">→</span>
                <span className="text-amber-400 font-bold">FastAPI Backend</span>
                <span className="text-slate-500">→</span>
                <span className="text-cyan-400 font-bold">routes.py</span>
                <span className="text-slate-500">→</span>
                <span className="text-purple-400 font-bold">AI Model (Gemini)</span>
                <span className="text-slate-500">→</span>
                <span className="text-emerald-400 font-bold">Response</span>
                <span className="text-slate-500">→</span>
                <span className="text-indigo-400 font-bold">Frontend</span>
              </div>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={onNavigateToPlayground}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition"
            >
              <span>{lang === 'en' ? 'Launch Flow Simulator' : 'லைவ் சிமுலேட்டர்'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition text-center"
              >
                {lang === 'en' ? 'Expand All' : 'அனைத்தும் விரி'}
              </button>
              <button
                onClick={collapseAll}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition text-center"
              >
                {lang === 'en' ? 'Collapse All' : 'சுருக்கு'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Epic Filter Tabs */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedEpicFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedEpicFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {lang === 'en' ? 'All Epics (5)' : 'அனைத்து எபிக் (5)'}
          </button>
          {EPICS_DATA.map((epic) => (
            <button
              key={epic.id}
              onClick={() => setSelectedEpicFilter(epic.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedEpicFilter === epic.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Epic {epic.number}: {epic.title.split(' ')[0]}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400 shrink-0 hidden sm:block">
          {filteredEpics.reduce((acc, e) => acc + e.stories.length, 0)} {lang === 'en' ? 'Total User Stories' : 'மொத்த கதைகள்'}
        </div>
      </div>

      {/* Epics List */}
      <div className="space-y-8">
        {filteredEpics.map((epic) => {
          const EpicIcon = EPIC_ICONS[epic.number] || Layers;
          return (
            <div
              key={epic.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
            >
              {/* Epic Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <EpicIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Epic {epic.number}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {epic.stories.length} Stories Ready
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {lang === 'en' ? epic.title : epic.tamilTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      {lang === 'en' ? epic.summary : epic.tamilSummary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stories under this Epic */}
              <div className="space-y-4">
                {epic.stories.map((story) => {
                  const isExpanded = expandedStories[story.id] ?? false;

                  return (
                    <div
                      key={story.id}
                      className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 rounded-xl transition duration-200 overflow-hidden"
                    >
                      {/* Story Accordion Header */}
                      <button
                        onClick={() => toggleStory(story.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-900/40 hover:bg-slate-800/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold text-white">
                              {lang === 'en' ? story.title : (story.tamilTitle || story.title)}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {story.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {story.codeRef && (
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToCode(story.codeRef!);
                              }}
                              className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20"
                              title="Inspect Code"
                            >
                              <FileCode className="w-3.5 h-3.5" />
                              {story.codeRef}
                            </span>
                          )}
                          <span className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800/80">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        </div>
                      </button>

                      {/* Story Expanded Details */}
                      {isExpanded && (
                        <div className="p-4 sm:p-6 border-t border-slate-800/80 space-y-5 bg-slate-950/40">
                          {/* Description */}
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              {lang === 'en' ? 'Story Description' : 'கதையின் விளக்கம்'}
                            </h4>
                            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                              {lang === 'en' ? story.description : (story.tamilDescription || story.description)}
                            </p>
                          </div>

                          {/* Objectives */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                              <Target className="w-3.5 h-3.5" />
                              <span>{lang === 'en' ? 'Core Objectives' : 'நோக்கங்கள் (Objectives)'}</span>
                            </div>
                            <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                              {story.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Activities Checklist */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-400">
                              <div className="flex items-center gap-2">
                                <ListChecks className="w-3.5 h-3.5" />
                                <span>{lang === 'en' ? 'Activities & Action Items' : 'செயல்பாடுகள் (Activities)'}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 normal-case font-normal">
                                {lang === 'en' ? '(Click item to verify)' : '(சரிபார்க்க கிளிக் செய்யவும்)'}
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {story.activities.map((act, actIdx) => {
                                const key = `${story.id}-act-${actIdx}`;
                                const isChecked = checkedActivities[key] ?? true; // default verified
                                return (
                                  <div
                                    key={actIdx}
                                    onClick={() => toggleActivity(key)}
                                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition text-xs sm:text-sm ${
                                      isChecked
                                        ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                                        : 'bg-slate-950 border-slate-800/60 text-slate-500 line-through'
                                    }`}
                                  >
                                    {isChecked ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                                    )}
                                    <span className={isChecked ? 'text-slate-200' : 'text-slate-500'}>
                                      {act}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Expected Outcome */}
                          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/60 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                <CheckCheck className="w-4 h-4" />
                                <span>{lang === 'en' ? 'Expected Outcome' : 'எதிர்பார்க்கப்படும் முடிவு'}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                                {story.expectedOutcome}
                              </p>
                            </div>
                            {story.codeRef && (
                              <button
                                onClick={() => onNavigateToCode(story.codeRef!)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition shrink-0"
                              >
                                <span>View {story.codeRef}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
