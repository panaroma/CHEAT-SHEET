import React, { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';
import type { LLMProviderType } from '../services/llm/types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: AppSettings) => void;
  initialSettings: AppSettings;
}

export interface AppSettings {
  provider: LLMProviderType;
  openaiKey: string;
  geminiKey: string;
  localModel: string;
}

export const defaultSettings: AppSettings = {
  provider: 'mock',
  openaiKey: '',
  geminiKey: '',
  localModel: 'llama3',
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSettings,
}) => {
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  if (!isOpen) return null;

  const handleChange = (key: keyof AppSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Settings className="w-5 h-5" /> Settings
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              LLM Provider
            </label>
            <select
              value={settings.provider}
              onChange={(e) => handleChange('provider', e.target.value as LLMProviderType)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="mock">Mock (Testing)</option>
              <option value="local">Local (Ollama)</option>
              <option value="openai">OpenAI</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>

          {settings.provider === 'local' && (
             <div>
             <label className="block text-sm font-medium text-neutral-300 mb-1">
               Local Model Name
             </label>
             <input
               type="text"
               value={settings.localModel}
               onChange={(e) => handleChange('localModel', e.target.value)}
               placeholder="e.g. llama3, mistral"
               className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
             />
             <p className="text-xs text-neutral-500 mt-1">
               Ensure Ollama is running at http://localhost:11434
             </p>
           </div>
          )}

          {settings.provider === 'openai' && (
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={settings.openaiKey}
                onChange={(e) => handleChange('openaiKey', e.target.value)}
                placeholder="sk-..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          {settings.provider === 'gemini' && (
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Gemini API Key
              </label>
              <input
                type="password"
                value={settings.geminiKey}
                onChange={(e) => handleChange('geminiKey', e.target.value)}
                placeholder="AIza..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
