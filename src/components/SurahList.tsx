import React from 'react';
import { surahs } from '../data/surahs';
import './SurahList.css';

interface SurahListProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSurah: (surahNumber: number) => void;
  currentSurah: number;
}

const SurahList: React.FC<SurahListProps> = ({ isOpen, onClose, onSelectSurah, currentSurah }) => {
  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`surah-list ${isOpen ? 'open' : ''}`}>
        <div className="surah-list-header">
          <h2>Surahs</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="surah-list-content">
          {surahs.map((surah) => (
            <div
              key={surah.number}
              className={`surah-item ${currentSurah === surah.number ? 'active' : ''}`}
              onClick={() => {
                onSelectSurah(surah.number);
                onClose();
              }}
            >
              <div className="surah-number">{surah.number}</div>
              <div className="surah-info">
                <div className="surah-name-arabic">{surah.name}</div>
                <div className="surah-name-english">{surah.englishName}</div>
              </div>
              <div className="surah-ayah-count">{surah.numberOfAyahs} ayahs</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SurahList;
