import { useState } from 'react';
import type { AppSettings } from '../components/SettingsPanel';
import { defaultSettings } from '../components/SettingsPanel';

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('prompt-enhancer-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('prompt-enhancer-settings', JSON.stringify(newSettings));
  };

  return { settings, saveSettings };
}
