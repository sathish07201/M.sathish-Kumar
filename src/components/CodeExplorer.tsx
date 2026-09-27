import React, { useState } from 'react';
import { CODE_FILES, CodeFile } from '../data/codeTemplates';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Folder, 
  Layers, 
  FileText, 
  Terminal, 
  File
} from 'lucide-react';

interface CodeExplorerProps {
  selectedFileName?: string;
  onSelectFile?: (filename: string) => void;
  lang: 'en' | 'ta';
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({
  selectedFileName,
  onSelectFile,
  lang,
}) => {
  const [currentFile, setCurrentFile] = useState<CodeFile>(() => {
    if (selectedFileName) {
      const found = CODE_FILES.find((f) => f.path === selectedFileName || f.name === selectedFileName);
      if (found) return found;
    }
    return CODE_FILES[0];
  });

  const [copied, setCopied] = useState<boolean>(false);

  const handleSelect = (file: CodeFile) => {
    setCurrentFile(file);
    if (onSelectFile) onSelectFile(file.path);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = (file: CodeFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.split('/').pop() || file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.py')) return <FileCode className="w-4 h-4 text-amber-400" />;
    if (fileName.endsWith('.html')) return <FileText className="w-4 h-4 text-orange-400" />;
    if (fileName.endsWith('.txt')) return <Terminal className="w-4 h-4 text-blue-400" />;
    if (fileName.endsWith('.example')) return <File className="w-4 h-4 text-emerald-400" />;
    if (fileName.endsWith('.md')) return <FileText className="w-4 h-4 text-indigo-400" />;
    return <File className="w-4 h-4 text-slate-400" />;
  };

  const lines = currentFile.content.split('\n');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>FastAPI Production Codebase</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {lang === 'en' ? 'Complete Python & Template Source Files' : 'முழுமையான பைதான் மற்றும் டெம்ப்ளேட் கோப்புகள்'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'en'
              ? 'Ready-to-run files implemented for each Epic and Story in the project development plan.'
              : 'புராஜெக்ட் திட்டத்தில் உள்ள ஒவ்வொரு கதைக்கும் ஏற்ப தயாரிக்கப்பட்ட இயக்கக்கூடிய கோப்புகள்.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownloadSingle(currentFile)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Download {currentFile.name.split('/').pop()}</span>
          </button>
        </div>
      </div>

      {/* Editor & Tree Container */}
      <div className="grid lg:grid-cols-12 gap-6 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Sidebar File Tree */}
        <div className="lg:col-span-4 bg-slate-950 border-r border-slate-800 p-4 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-indigo-400" />
              <span>Project Directory</span>
            </span>
            <span>{CODE_FILES.length} Files</span>
          </div>

          <div className="space-y-1">
            {CODE_FILES.map((file) => {
              const isSelected = currentFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => handleSelect(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {getFileIcon(file.name)}
                    <span className="truncate">{file.path}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mapping to Epic info */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Epic Association:</span>
            <div className="text-xs text-indigo-300 font-medium">
              {currentFile.epicRef}
            </div>
            <p className="text-[11px] text-slate-400">
              {currentFile.description}
            </p>
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900 border-b border-slate-800 px-5">
            <div className="flex items-center gap-3">
              {getFileIcon(currentFile.name)}
              <span className="font-mono text-xs sm:text-sm font-semibold text-slate-200">
                {currentFile.path}
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {lines.length} lines
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleDownloadSingle(currentFile)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            </div>
          </div>

          {/* Syntax Code Display with Line Numbers */}
          <div className="flex-1 overflow-x-auto p-4 font-mono text-xs leading-relaxed max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 group">
                    <td className="w-10 pr-4 text-right text-slate-600 select-none text-[11px] font-mono border-r border-slate-800/60 group-hover:text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="pl-4 whitespace-pre font-mono text-slate-200">
                      {line}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
