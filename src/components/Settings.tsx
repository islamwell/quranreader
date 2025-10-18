import React, { useState } from 'react';
import { reciters } from '../data/reciters';
import { Settings as SettingsType } from '../types/quran';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFontSizeChange = (size: number) => {
    onSettingsChange({ ...settings, fontSize: size });
  };

  const handleFontFamilyChange = (family: string) => {
    onSettingsChange({ ...settings, fontFamily: family });
  };

  const handleReciterChange = (reciter: string) => {
    onSettingsChange({ ...settings, reciter });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login functionality (optional - just for UI)
    alert(`Login functionality not implemented. Username: ${username}`);
    setShowLogin(false);
    setUsername('');
    setPassword('');
  };

  const fontFamilies = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: '"Traditional Arabic", serif', label: 'Traditional Arabic' },
    { value: '"Amiri", serif', label: 'Amiri' },
    { value: '"Scheherazade", serif', label: 'Scheherazade' },
  ];

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`settings-menu ${isOpen ? 'open' : ''}`}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="settings-content">
          {!showLogin ? (
            <>
              <div className="settings-section">
                <h3>Font Size</h3>
                <div className="font-size-controls">
                  <button
                    className="size-btn"
                    onClick={() => handleFontSizeChange(Math.max(14, settings.fontSize - 2))}
                  >
                    A-
                  </button>
                  <span className="current-size">{settings.fontSize}px</span>
                  <button
                    className="size-btn"
                    onClick={() => handleFontSizeChange(Math.min(36, settings.fontSize + 2))}
                  >
                    A+
                  </button>
                </div>
                <input
                  type="range"
                  min="14"
                  max="36"
                  value={settings.fontSize}
                  onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                  className="size-slider"
                />
              </div>

              <div className="settings-section">
                <h3>Font Family</h3>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => handleFontFamilyChange(e.target.value)}
                  className="font-select"
                >
                  {fontFamilies.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="settings-section">
                <h3>Reciter</h3>
                <select
                  value={settings.reciter}
                  onChange={(e) => handleReciterChange(e.target.value)}
                  className="reciter-select"
                >
                  {reciters.map((reciter) => (
                    <option key={reciter.id} value={reciter.subfolder}>
                      {reciter.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="settings-section">
                <h3>Account</h3>
                <button className="login-btn" onClick={() => setShowLogin(true)}>
                  Login (Optional)
                </button>
              </div>
            </>
          ) : (
            <div className="login-form">
              <h3>Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">Login</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowLogin(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
