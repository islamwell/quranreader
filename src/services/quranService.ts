import axios from 'axios';
import { Surah, Ayah } from '../types/quran';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export const quranService = {
  async getSurah(surahNumber: number): Promise<Surah | null> {
    try {
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
      console.error('Error fetching surah:', error);
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
