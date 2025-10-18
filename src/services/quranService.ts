import axios from 'axios';
import { Surah, Ayah } from '../types/quran';
import { surahs } from '../data/surahs';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
const BACKUP_API_BASE = 'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist';

export const quranService = {
  async getSurah(surahNumber: number): Promise<Surah | null> {
    try {
      // Try primary API
      const response = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}`);
      if (response.data && response.data.data) {
        const surahData = response.data.data;
        const ayahs: Ayah[] = surahData.ayahs.map((ayah: any) => ({
          number: ayah.number,
          text: ayah.text,
          numberInSurah: ayah.numberInSurah,
        }));
        
        return {
          number: surahData.number,
          name: surahData.name,
          englishName: surahData.englishName,
          numberOfAyahs: surahData.numberOfAyahs,
          revelationType: surahData.revelationType,
          ayahs,
        };
      }
      return null;
    } catch (error) {
      console.error('Primary API failed, trying backup:', error);
      // Try backup API
      try {
        const response = await axios.get(`${BACKUP_API_BASE}/chapters/ar/ar-${surahNumber}.json`);
        if (response.data && Array.isArray(response.data)) {
          const surahInfo = surahs.find(s => s.number === surahNumber);
          // Generate unique ayah numbers: base number for surah + ayah position
          const ayahs: Ayah[] = response.data.map((ayah: any, index: number) => {
            const ayahText = typeof ayah === 'string' ? ayah : (ayah.text || ayah.verse || '');
            return {
              number: (surahNumber - 1) * 1000 + index + 1,
              text: ayahText,
              numberInSurah: index + 1,
            };
          });
          
          return {
            number: surahNumber,
            name: surahInfo?.name || '',
            englishName: surahInfo?.englishName || '',
            numberOfAyahs: ayahs.length,
            revelationType: surahInfo?.revelationType || 'Unknown',
            ayahs,
          };
        }
      } catch (backupError) {
        console.error('Backup API failed, using demo data:', backupError);
      }
      
      // Final fallback - return demo surah data
      const surahInfo = surahs.find(s => s.number === surahNumber);
      if (surahInfo) {
        // Generate demo ayahs for demonstration
        const demoAyahs: Ayah[] = Array.from({ length: surahInfo.numberOfAyahs }, (_, i) => ({
          number: (surahNumber - 1) * 1000 + i + 1,
          text: `آية ${i + 1} من سورة ${surahInfo.name} - يرجى الاتصال بالإنترنت لتحميل النص الكامل`,
          numberInSurah: i + 1,
        }));
        
        return {
          ...surahInfo,
          ayahs: demoAyahs,
        };
      }
      
      return null;
    }
  },

  getAudioUrl(surahNumber: number, ayahNumber: number, reciter: string): string {
    // Format: https://everyayah.com/data/reciter_subfolder/001001.mp3
    const paddedSurah = String(surahNumber).padStart(3, '0');
    const paddedAyah = String(ayahNumber).padStart(3, '0');
    return `https://everyayah.com/data/${reciter}/${paddedSurah}${paddedAyah}.mp3`;
  },
};
