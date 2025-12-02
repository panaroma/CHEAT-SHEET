import { useState } from 'react';
import { Sparkles, Copy, RefreshCw, Settings as SettingsIcon } from 'lucide-react';
import { LLMService } from './services/llm/LLMService';
import { SettingsPanel } from './components/SettingsPanel';
import { CheatSheet } from './components/CheatSheet';
import { useSettings } from './hooks/useSettings';

function App() {
  const { settings, saveSettings } = useSettings();
  const [inputPrompt, setInputPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async () => {
    if (!inputPrompt.trim()) return;

    setIsEnhancing(true);
    setError(null);
    setEnhancedPrompt('');

    try {
      const llmService = LLMService.getInstance();

      // Determine which API key to use based on provider
      let apiKey = undefined;
      if (settings.provider === 'openai') apiKey = settings.openaiKey;
      if (settings.provider === 'gemini') apiKey = settings.geminiKey;

      const result = await llmService.enhancePrompt(
        inputPrompt,
        settings.provider,
        apiKey
      );

      if (result.error) {
        setError(result.error);
      } else {
        setEnhancedPrompt(result.enhancedPrompt);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsEnhancing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
  };

  const handleAddShot = (shotName: string) => {
    setInputPrompt((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return shotName;
      // Add a comma if it doesn't end with punctuation, otherwise just space
      return /[.,;]$/.test(trimmed)
        ? `${trimmed} ${shotName}`
        : `${trimmed}, ${shotName}`;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Prompt Enhancer
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-400">
              Using: <span className="text-blue-400 font-medium uppercase">{settings.provider}</span>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

          {/* Left Column: Prompt Input & Output */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-full min-h-0">
            {/* Input Section */}
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col">
              <label className="text-sm font-medium text-neutral-400 mb-2">Original Prompt</label>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Enter your basic idea here (e.g., 'A cyberpunk city at night')..."
                className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-neutral-200 placeholder-neutral-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-neutral-500">
                   Tip: Click a camera shot on the right to add it.
                </span>
                <button
                  onClick={handleEnhance}
                  disabled={isEnhancing || !inputPrompt.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium rounded-lg transition-all"
                >
                  {isEnhancing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" /> Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Enhance Prompt
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                 <label className="text-sm font-medium text-neutral-400">Enhanced Result</label>
                 {enhancedPrompt && (
                   <button
                     onClick={copyToClipboard}
                     className="text-xs flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                   >
                     <Copy className="w-3 h-3" /> Copy
                   </button>
                 )}
              </div>

              <div className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-neutral-200 overflow-y-auto">
                {error ? (
                  <div className="text-red-400 flex flex-col items-center justify-center h-full text-center">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm opacity-80">{error}</p>
                    {settings.provider === 'local' && (
                        <p className="text-xs text-neutral-500 mt-2">Is Ollama running? (try `ollama serve`)</p>
                    )}
                  </div>
                ) : enhancedPrompt ? (
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {enhancedPrompt}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-neutral-600 text-sm">
                    Enhanced prompt will appear here...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Cheat Sheet */}
          <div className="lg:col-span-1 h-full min-h-0">
            <CheatSheet onShotClick={handleAddShot} />
          </div>

        </div>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={saveSettings}
        initialSettings={settings}
      />
    </div>
  );
}

export default App;
