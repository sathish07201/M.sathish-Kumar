import React, { useState } from 'react';
import { EPICS_DATA, PROJECT_METADATA } from '../data/projectData';
import { 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  User, 
  Building
} from 'lucide-react';

interface ProjectReportViewProps {
  lang: 'en' | 'ta';
  onPrint: () => void;
}

export const ProjectReportView: React.FC<ProjectReportViewProps> = ({
  lang,
  onPrint,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const generateMarkdownReport = (): string => {
    let md = `# ${PROJECT_METADATA.title}\n\n`;
    md += `**Subtitle:** ${PROJECT_METADATA.subtitle}\n`;
    md += `**Date:** ${new Date().toLocaleDateString()}\n`;
    md += `**Backend Stack:** ${PROJECT_METADATA.backendTech}\n`;
    md += `**AI Engine:** ${PROJECT_METADATA.aiTech}\n`;
    md += `**Architecture Flow:** ${PROJECT_METADATA.architectureFlow}\n\n`;
    md += `---\n\n`;

    EPICS_DATA.forEach((epic) => {
      md += `## Epic ${epic.number}: ${epic.title}\n\n`;
      md += `*Summary:* ${epic.summary}\n\n`;

      epic.stories.forEach((story) => {
        md += `### ${story.title}\n\n`;
        md += `${story.description}\n\n`;

        md += `**Core Objectives:**\n`;
        story.objectives.forEach((obj) => {
          md += `- ${obj}\n`;
        });
        md += `\n`;

        md += `**Activities:**\n\n`;
        story.activities.forEach((act) => {
          md += `* ${act}\n`;
        });
        md += `\n`;

        md += `**Expected Outcome:**\n${story.expectedOutcome}\n\n`;
        if (story.codeRef) {
          md += `**Associated Source Code:** \`${story.codeRef}\`\n\n`;
        }
        md += `---\n\n`;
      });
    });

    md += `## Conclusion\n\n`;
    md += `The Generative AI application is developed through a structured process beginning with Generative AI model selection and application architecture design. The development environment is then configured, followed by implementation of the core functionalities and FastAPI backend.\n\n`;
    md += `The FastAPI framework provides efficient routing and user input processing, while Jinja2 enables dynamic interaction between the backend and frontend. A simple and user-friendly interface is developed to allow users to interact with the Generative AI system.\n\n`;
    md += `Finally, the complete application is prepared for local deployment and thoroughly tested to verify its functionality, performance, and reliability.\n\n`;
    md += `Through these five Epics, the project provides a complete development workflow from model selection and architecture design to implementation, frontend integration, testing, and local deployment.\n`;

    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generateMarkdownReport()], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Generative_AI_Project_Development_Plan.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar for Report View */}
      <div className="print:hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Formal Project Documentation Format</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {lang === 'en' ? 'Printable Project Report & Submission Document' : 'அச்சிடக்கூடிய திட்ட அறிக்கை ஆவணம்'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Complete with executive summary, 5 Epics, 10 Stories, diagrams, test verification, and sign-off.'
              : 'அனைத்து எபிக், கதைகள், வரைபடங்கள் மற்றும் கையொப்பப் பகுதிகளுடன் கூடிய முழுமையான அறிக்கை.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Download .md</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print to PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Formal Document Container */}
      <div 
        id="printable-report"
        className="bg-slate-900 border border-slate-800 print:border-none print:bg-white print:text-black rounded-2xl p-6 sm:p-12 shadow-2xl text-slate-100 print:p-0 max-w-4xl mx-auto space-y-10"
      >
        {/* Cover Page Header */}
        <div className="border-b-2 border-indigo-500/40 pb-8 text-center sm:text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-400 font-bold">
              Software Engineering Project Report
            </span>
            <span className="text-xs px-2.5 py-1 rounded bg-slate-800 print:bg-gray-100 text-slate-300 print:text-gray-800 font-mono">
              Document Ref: GENAI-FASTAPI-2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black leading-tight">
            GENERATIVE AI APPLICATION – PROJECT DEVELOPMENT PLAN
          </h1>

          <p className="text-base text-slate-300 print:text-gray-700">
            A Comprehensive Architectural Specification and Production Roadmap for FastAPI, Jinja2, and Foundation Large Language Models.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-400 print:text-gray-600 border-t border-slate-800/80 print:border-gray-300">
            <div>
              <span className="text-slate-500 block">Framework:</span>
              <strong className="text-slate-200 print:text-black">Python FastAPI</strong>
            </div>
            <div>
              <span className="text-slate-500 block">AI Engine:</span>
              <strong className="text-slate-200 print:text-black">Google Gemini 3.8</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Template Engine:</span>
              <strong className="text-slate-200 print:text-black">Jinja2 Dynamic</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Server:</span>
              <strong className="text-slate-200 print:text-black">Uvicorn ASGI</strong>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-indigo-400 print:text-indigo-900 border-b border-slate-800 print:border-gray-200 pb-2 flex items-center gap-2">
            <span>1. Executive Summary</span>
          </h2>
          <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed">
            This document sets forth the comprehensive, multi-tiered project development plan for building, verifying, and deploying a production-grade Generative Artificial Intelligence (Generative AI) web application.
            Built with modern software engineering practices, the solution couples an asynchronous Python backend powered by FastAPI with server-side dynamic Jinja2 HTML templates and cutting-edge Foundation Large Language Models.
          </p>
          {lang === 'ta' && (
            <div className="p-3.5 bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-200 rounded-xl text-xs text-indigo-300 print:text-indigo-900 space-y-1">
              <strong>தமிழ் சுருக்கம்:</strong>
              <p>
                இந்த திட்டம் Generative AI மாடல் தேர்வு முதல் FastAPI பேக்எண்ட், Jinja2 டைனமிக் டெம்ப்ளேட்கள் மற்றும் உள்ளூர் Uvicorn வெளியீடு வரையிலான 5 முக்கிய எபிக் (Epics) மற்றும் 10 பயனர் கதைகளை உள்ளடக்கியுள்ளது.
              </p>
            </div>
          )}
        </section>

        {/* Architecture & Flowchart */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-indigo-400 print:text-indigo-900 border-b border-slate-800 print:border-gray-200 pb-2">
            2. System Architecture & Request Lifecycle
          </h2>
          <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed">
            The system adheres strictly to the single-responsibility principle: the frontend renders dynamic user interfaces; the FastAPI routing layer validates and dispatches incoming traffic; the AI Service abstracts model inference; and Jinja2 dynamically injects responses into the presentation layer.
          </p>
          <div className="bg-slate-950 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300 font-mono text-xs text-emerald-400 print:text-gray-900 space-y-1 overflow-x-auto">
            <div className="font-bold text-indigo-400 print:text-indigo-800 mb-2">Architecture Pipeline:</div>
            <div>[ User ]</div>
            <div>   │ (Enters prompt in browser form)</div>
            <div>   ▼</div>
            <div>[ Frontend Interface ] ── (templates/index.html with Jinja2)</div>
            <div>   │ (HTTP POST /generate)</div>
            <div>   ▼</div>
            <div>[ FastAPI Backend (app.py) ] ── (Uvicorn ASGI Server)</div>
            <div>   │ (Routes request to APIRouter)</div>
            <div>   ▼</div>
            <div>[ Routes Module (routes.py) ] ── (Input Sanitization & Pydantic Validation)</div>
            <div>   │ (Async AI invocation)</div>
            <div>   ▼</div>
            <div>[ AI Service (ai_service.py) ] ── (Google GenAI SDK Client)</div>
            <div>   │ (API Call via Gemini 3.8 Flash)</div>
            <div>   ▼</div>
            <div>[ Generative AI Model (LLM) ] ── (Generates response tokens)</div>
            <div>   │ (Response text payload)</div>
            <div>   ▼</div>
            <div>[ Jinja2 Context Assembler ] ── (Passes prompt, latency & response)</div>
            <div>   │ (HTTP 200 OK HTML / JSON)</div>
            <div>   ▼</div>
            <div>[ Rendered Response on Frontend ]</div>
          </div>
        </section>

        {/* The 5 Epics Detailed Section */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-indigo-400 print:text-indigo-900 border-b border-slate-800 print:border-gray-200 pb-2">
            3. Project Development Epics & Detailed User Stories
          </h2>

          <div className="space-y-8">
            {EPICS_DATA.map((epic) => (
              <div key={epic.id} className="space-y-4">
                <div className="bg-slate-800/80 print:bg-gray-200 p-3 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="text-base font-bold text-white print:text-black">
                    Epic {epic.number}: {epic.title}
                  </h3>
                  <p className="text-xs text-slate-300 print:text-gray-700 mt-0.5">
                    {epic.summary}
                  </p>
                </div>

                <div className="space-y-6 pl-2 sm:pl-4">
                  {epic.stories.map((story) => (
                    <div 
                      key={story.id} 
                      className="bg-slate-950/60 print:bg-white p-4 sm:p-5 rounded-xl border border-slate-800 print:border-gray-300 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 print:border-gray-200 pb-2">
                        <h4 className="text-sm font-bold text-emerald-400 print:text-emerald-800">
                          {story.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          {story.codeRef && (
                            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 print:bg-gray-100 px-2 py-0.5 rounded border border-indigo-500/20">
                              Ref: {story.codeRef}
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                            Status: Verified
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed whitespace-pre-line">
                        {story.description}
                      </p>

                      {/* Activities */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-bold text-amber-400 print:text-amber-800 uppercase tracking-wider block">
                          Activities:
                        </span>
                        <ul className="list-disc list-inside text-xs text-slate-300 print:text-gray-700 space-y-1 pl-1">
                          {story.activities.map((act, idx) => (
                            <li key={idx}>{act}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Expected Outcome */}
                      <div className="p-3 bg-slate-900 print:bg-gray-100 rounded-lg border border-slate-800 print:border-gray-200 text-xs text-slate-200 print:text-gray-900">
                        <strong className="text-emerald-400 print:text-emerald-800 mr-2">Expected Outcome:</strong>
                        <span>{story.expectedOutcome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-4 pt-4 border-t border-slate-800 print:border-gray-200">
          <h2 className="text-lg font-bold text-indigo-400 print:text-indigo-900 border-b border-slate-800 print:border-gray-200 pb-2">
            4. Conclusion
          </h2>
          <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed">
            The Generative AI application is developed through a structured process beginning with Generative AI model selection and application architecture design. The development environment is then configured, followed by implementation of the core functionalities and FastAPI backend.
          </p>
          <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed">
            The FastAPI framework provides efficient routing and user input processing, while Jinja2 enables dynamic interaction between the backend and frontend. A simple and user-friendly interface is developed to allow users to interact with the Generative AI system.
          </p>
          <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed">
            Finally, the complete application is prepared for local deployment and thoroughly tested to verify its functionality, performance, and reliability.
          </p>
          <p className="text-sm font-semibold text-emerald-400 print:text-emerald-800 leading-relaxed">
            Through these five Epics, the project provides a complete development workflow from model selection and architecture design to implementation, frontend integration, testing, and local deployment.
          </p>
        </section>

        {/* Signatures / Approval Block */}
        <div className="pt-8 border-t-2 border-slate-800 print:border-gray-400 grid grid-cols-2 gap-8 text-xs font-mono text-slate-400 print:text-gray-600">
          <div className="space-y-6">
            <div>Prepared By:</div>
            <div className="border-b border-slate-700 print:border-gray-400 w-48 pb-1 text-slate-200 print:text-black">
              Lead Software Engineer
            </div>
            <div>Date: {new Date().toLocaleDateString()}</div>
          </div>
          <div className="space-y-6">
            <div>Reviewed & Approved By:</div>
            <div className="border-b border-slate-700 print:border-gray-400 w-48 pb-1 text-slate-200 print:text-black">
              Engineering Director / Project Lead
            </div>
            <div>Status: Approved for Production</div>
          </div>
        </div>
      </div>
    </div>
  );
};
