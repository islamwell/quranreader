export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audioUrl?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs?: Ayah[];
}

export interface Reciter {
  id: string;
  name: string;
  subfolder: string;
}

export interface Settings {
  fontSize: number;
  fontFamily: string;
  reciter: string;
}
