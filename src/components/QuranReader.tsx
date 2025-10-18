import React, { useState, useEffect } from 'react';
import { Surah, Ayah, Settings as SettingsType } from '../types/quran';
import { quranService } from '../services/quranService';
import SurahList from './SurahList';
import Settings from './Settings';
import AudioPlayer from './AudioPlayer';
import './QuranReader.css';

const QuranReader: React.FC = () => {
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [currentSurahNumber, setCurrentSurahNumber] = useState(1);
  const [surahListOpen, setSurahListOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState<SettingsType>({
    fontSize: 24,
    fontFamily: '"Traditional Arabic", serif',
    reciter: 'Nasser_Alqatami',
  });

  useEffect(() => {
    loadSurah(currentSurahNumber);
  }, [currentSurahNumber]);

  const loadSurah = async (surahNumber: number) => {
    setLoading(true);
    setIsPlaying(false);
    setCurrentAyahIndex(0);
    const surah = await quranService.getSurah(surahNumber);
    setCurrentSurah(surah);
    setLoading(false);
  };

  const handleSelectSurah = (surahNumber: number) => {
    setCurrentSurahNumber(surahNumber);
  };

  const handleNextAyah = () => {
    if (currentSurah && currentAyahIndex < currentSurah.ayahs!.length - 1) {
      setCurrentAyahIndex(currentAyahIndex + 1);
    } else if (currentSurah && currentSurahNumber < 114) {
      // Move to next surah
      setCurrentSurahNumber(currentSurahNumber + 1);
      setCurrentAyahIndex(0);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAyahClick = (index: number) => {
    setCurrentAyahIndex(index);
    setIsPlaying(true);
  };

  const getCurrentAudioUrl = (): string => {
    if (!currentSurah || !currentSurah.ayahs) return '';
    const ayah = currentSurah.ayahs[currentAyahIndex];
    return quranService.getAudioUrl(currentSurahNumber, ayah.numberInSurah, settings.reciter);
  };

  return (
    <div className="quran-reader">
      <header className="header">
        <div className="header-content">
          <h1>Quran Reader</h1>
          <div className="header-buttons">
            <button className="icon-btn" onClick={() => setSettingsOpen(true)} title="Settings">
              ⚙️
            </button>
            <button className="icon-btn" onClick={() => setSurahListOpen(true)} title="Surahs">
              📖
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : currentSurah ? (
          <div className="surah-container">
            <div className="surah-header">
              <h2 className="surah-name-arabic">{currentSurah.name}</h2>
              <h3 className="surah-name-english">{currentSurah.englishName}</h3>
              <div className="surah-info-text">
                Surah {currentSurah.number} • {currentSurah.numberOfAyahs} Ayahs • {currentSurah.revelationType}
              </div>
            </div>

            {currentSurahNumber !== 1 && currentSurahNumber !== 9 && (
              <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            )}

            <div className="ayahs-container">
              {currentSurah.ayahs?.map((ayah: Ayah, index: number) => (
                <div
                  key={ayah.number}
                  className={`ayah ${currentAyahIndex === index ? 'active' : ''}`}
                  onClick={() => handleAyahClick(index)}
                  style={{
                    fontSize: `${settings.fontSize}px`,
                    fontFamily: settings.fontFamily,
                  }}
                >
                  <span className="ayah-text">{ayah.text}</span>
                  <span className="ayah-number">﴿{ayah.numberInSurah}﴾</span>
                </div>
              ))}
            </div>

            <div className="audio-container">
              <AudioPlayer
                audioUrl={getCurrentAudioUrl()}
                onEnded={handleNextAyah}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
              />
              <div className="audio-info">
                Playing: Ayah {currentAyahIndex + 1} of {currentSurah.numberOfAyahs}
              </div>
            </div>
          </div>
        ) : (
          <div className="error">Error loading Surah</div>
        )}
      </main>

      <SurahList
        isOpen={surahListOpen}
        onClose={() => setSurahListOpen(false)}
        onSelectSurah={handleSelectSurah}
        currentSurah={currentSurahNumber}
      />

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
};

export default QuranReader;
