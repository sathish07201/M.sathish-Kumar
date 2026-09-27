import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  Terminal, 
  Code2, 
  Layers, 
  Copy, 
  Check, 
  AlertCircle
} from 'lucide-react';

interface LivePlaygroundProps {
  lang: 'en' | 'ta';
}

const SAMPLE_PROMPTS = [
  {
    label: 'Explain GenAI Concept',
    prompt: 'Explain what Generative AI is, how LLMs work, and why FastAPI is an ideal backend for it.',
  },
  {
    label: 'FastAPI Code Example',
    prompt: 'Provide a clean Python FastAPI route that validates an input query using Pydantic V2.',
  },
  {
    label: 'Architecture Benefits',
    prompt: 'What are the main advantages of separating FastAPI routes into app.py, routes.py, and ai_service.py?',
  },
  {
    label: 'தமிழ் வினவல் (Tamil Query)',
    prompt: 'ஜெனரேட்டிவ் ஏஐ (Generative AI) தொழில்நுட்பம் எவ்வாறு செயல்படுகிறது? 3 முக்கிய புள்ளிகளில் விளக்குக.',
  },
];

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState<string>(
    'Explain what Generative AI is and how FastAPI routes user input to the AI Model.'
  );
  const [model, setModel] = useState<string>('gemini-3.8-flash');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [systemInstruction, setSystemInstruction] = useState<string>(
    'You are a professional Generative AI assistant built with FastAPI and Google Gemini.'
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [result, setResult] = useState<{
    text: string;
    model: string;
    latencyMs: number;
    tokensEstimated: number;
    timestamp: string;
    trace: Array<{ step: number; component: string; detail: string }>;
  } | null>(null);

  const [activeViewTab, setActiveViewTab] = useState<'jinja' | 'json' | 'logs'>('jinja');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const steps = [
    { id: 1, name: 'User Prompt', role: 'Input', tech: 'Client Browser' },
    { id: 2, name: 'Frontend View', role: 'DOM / Form', tech: 'Jinja2 HTML' },
    { id: 3, name: 'FastAPI Backend', role: 'Gateway', tech: 'app.py / Uvicorn' },
    { id: 4, name: 'Routing Layer', role: 'Validation', tech: 'routes.py' },
    { id: 5, name: 'AI Service', role: 'Inference', tech: 'ai_service.py' },
    { id: 6, name: 'Gemini LLM', role: 'Model Core', tech: model },
    { id: 7, name: 'Jinja2 Template', role: 'Dynamic Render', tech: 'index.html' },
  ];

  const handleRun = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setResult(null);
    setActiveStep(1);

    // Step 1 -> 2 -> 3 animation
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 6) return prev + 1;
        return prev;
      });
    }, 280);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model,
          systemInstruction,
          temperature,
        }),
      });

      clearInterval(stepInterval);
      setActiveStep(7);

      const data = await response.json();
      if (!response.ok && !data.text) {
        throw new Error(data.error || 'Failed to generate response.');
      }

      setResult({
        text: data.text || 'Empty response returned.',
        model: data.model || model,
        latencyMs: data.latencyMs || 350,
        tokensEstimated: data.tokensEstimated || 120,
        timestamp: data.timestamp || new Date().toISOString(),
        trace: data.trace || [
          { step: 1, component: 'Frontend', detail: 'Received prompt' },
          { step: 2, component: 'FastAPI', detail: 'Routed through routes.py' },
          { step: 3, component: 'AI Service', detail: 'Executed inference' },
          { step: 4, component: 'Jinja2', detail: 'Rendered HTML template' },
        ],
      });
    } catch (err: any) {
      clearInterval(stepInterval);
      setErrorMsg(err.message || 'An unexpected error occurred during execution.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Playground Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Architecture & Generative AI Playground</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">
              {lang === 'en' 
                ? 'End-to-End FastAPI Pipeline Simulator' 
                : 'FastAPI அப்ளிகேஷன் நேரடி ஓட்ட சிமுலேட்டர்'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'en'
                ? 'Watch your prompt travel through every node in the defined architecture: User → Frontend → FastAPI → Routes → AI Model → Response'
                : 'உங்கள் வினவல் எவ்வாறு Frontend → FastAPI → routes.py → AI Model வழியே சென்று Jinja2 மூலம் வெளிவருகிறது என்பதை நேரலையில் பார்க்கவும்.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Engine:</span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              {model}
            </span>
          </div>
        </div>

        {/* Visual Animated Pipeline Graph */}
        <div className="pt-4 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center min-w-[700px] justify-between gap-2 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
            {steps.map((s, idx) => {
              const isCurrent = loading && activeStep === s.id;
              const isPassed = activeStep >= s.id || result !== null;

              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center text-center relative group">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 scale-110 shadow-lg shadow-amber-500/40 ring-4 ring-amber-500/20 animate-pulse'
                          : isPassed
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isPassed && !isCurrent ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <span>{s.id}</span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-200 mt-1.5 whitespace-nowrap">
                      {s.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {s.tech}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 flex items-center justify-center px-1">
                      <div
                        className={`h-0.5 w-full transition-all duration-300 ${
                          activeStep > s.id
                            ? 'bg-emerald-500'
                            : isCurrent
                            ? 'bg-gradient-to-r from-emerald-500 to-amber-500 animate-pulse'
                            : 'bg-slate-800'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Settings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'en' ? 'FastAPI Request Builder' : 'கோரிக்கை கட்டமைப்பு'}</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                POST /generate
              </span>
            </div>

            {/* Quick Starters */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">
                {lang === 'en' ? 'Sample Queries:' : 'மாதிரி வினாக்கள்:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_PROMPTS.map((sp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(sp.prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                <span>{lang === 'en' ? 'User Prompt (user_prompt):' : 'பயனர் உள்ளீடு:'}</span>
                <span className="text-[10px] text-slate-400">{prompt.length} chars</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Enter prompt to send through FastAPI backend..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition resize-y"
              />
            </div>

            {/* Configuration Accordion */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                {/* Model Selector */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>LLM Model</span>
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended)</option>
                    <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex)</option>
                  </select>
                </div>

                {/* Temperature */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium flex items-center justify-between">
                    <span>Creativity (Temp)</span>
                    <span className="text-indigo-400 font-mono">{temperature}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg mt-2"
                  />
                </div>
              </div>

              {/* System Instruction */}
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">
                  System Instruction:
                </label>
                <input
                  type="text"
                  value={systemInstruction}
                  onChange={(e) => setSystemInstruction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Execute Button */}
            <button
              onClick={handleRun}
              disabled={loading || !prompt.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing through FastAPI Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute Request (FastAPI /generate)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Execution Output Views */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col min-h-[520px]">
            {/* View Switcher Bar */}
            <div className="flex items-center justify-between p-3 bg-slate-950 border-b border-slate-800 px-4">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveViewTab('jinja')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeViewTab === 'jinja'
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Jinja2 Dynamic Template View</span>
                </button>
                <button
                  onClick={() => setActiveViewTab('json')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeViewTab === 'json'
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>FastAPI JSON Payload</span>
                </button>
                <button
                  onClick={() => setActiveViewTab('logs')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeViewTab === 'logs'
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Trace & Server Logs</span>
                </button>
              </div>

              {result && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(result.text)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                    title="Copy AI Output"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-4 bg-red-950/40 border-b border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Tab 1: Jinja2 Dynamic Template Preview */}
              {activeViewTab === 'jinja' && (
                <div className="space-y-4">
                  {/* Mock Browser Frame */}
                  <div className="border border-slate-700 rounded-xl bg-slate-950 overflow-hidden shadow-inner">
                    <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="font-mono text-slate-400 ml-2">http://localhost:8000/</span>
                      </div>
                      <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                        Jinja2 Interpolation
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 space-y-5">
                      {/* Jinja Header */}
                      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span className="text-indigo-400">⚡ FastAPI GenAI</span>
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                            Epic 4 Story 2
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">templates/index.html</span>
                      </div>

                      {/* Prompt Display in Jinja Context */}
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          User Prompt Submitted
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 italic">
                          "{prompt}"
                        </p>
                      </div>

                      {/* Response Card generated by Jinja2 */}
                      {loading ? (
                        <div className="p-8 text-center space-y-3">
                          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                          <p className="text-xs text-slate-400">
                            FastAPI is communicating with Generative AI model...
                          </p>
                        </div>
                      ) : result ? (
                        <div className="bg-gradient-to-br from-indigo-950/30 to-slate-900 p-5 rounded-xl border border-indigo-500/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>AI-Generated Response</span>
                            </span>
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>{result.latencyMs}ms</span>
                            </div>
                          </div>
                          <div className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap font-sans">
                            {result.text}
                          </div>
                          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
                            <span>Model: {result.model}</span>
                            <span>Tokens: ~{result.tokensEstimated}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-10 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                          <p className="text-sm">Click "Execute Request" to test the pipeline and see Jinja2 output.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: JSON API Payload */}
              {activeViewTab === 'json' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Programmatic JSON Output from FastAPI /api/generate</span>
                    <span className="font-mono text-emerald-400">HTTP 200 OK</span>
                  </div>
                  <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
                    {result
                      ? JSON.stringify(
                          {
                            status: 'success',
                            endpoint: '/api/generate',
                            framework: 'FastAPI 0.115',
                            model: result.model,
                            latency_ms: result.latencyMs,
                            estimated_tokens: result.tokensEstimated,
                            timestamp: result.timestamp,
                            data: {
                              prompt,
                              response: result.text,
                            },
                          },
                          null,
                          2
                        )
                      : '// No request executed yet. Click Execute Request to view payload.'}
                  </pre>
                </div>
              )}

              {/* Tab 3: Trace & Logs */}
              {activeViewTab === 'logs' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">
                    Step-by-step Execution Trace across Architecture Layers:
                  </div>

                  {result ? (
                    <div className="space-y-2">
                      {result.trace.map((tr, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono"
                        >
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-[10px] font-bold">
                            {tr.step}
                          </span>
                          <div>
                            <span className="text-emerald-400 font-bold mr-2">
                              [{tr.component}]
                            </span>
                            <span className="text-slate-300">{tr.detail}</span>
                          </div>
                        </div>
                      ))}

                      <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 space-y-1">
                        <div className="text-slate-300 font-bold">Server Process Log (Uvicorn):</div>
                        <div>INFO: 127.0.0.1:49812 - "POST /generate HTTP/1.1" 200 OK</div>
                        <div>DEBUG: FastAPI route execution completed in {result.latencyMs}ms</div>
                        <div>DEBUG: Jinja2 rendered templates/index.html with response length {result.text.length}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl text-xs">
                      Run a request to capture live architecture trace.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            {result && (
              <div className="bg-slate-950 border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pipeline Verified</span>
                  </span>
                  <span className="text-slate-500">|</span>
                  <span>Latency: {result.latencyMs}ms</span>
                  <span className="text-slate-500">|</span>
                  <span>Tokens: ~{result.tokensEstimated}</span>
                </div>
                <span className="font-mono text-[11px] text-indigo-400">HTTP 200 OK</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
