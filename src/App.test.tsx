import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the quranService
jest.mock('./services/quranService', () => ({
  quranService: {
    getSurah: jest.fn().mockResolvedValue({
      number: 1,
      name: 'الفاتحة',
      englishName: 'Al-Fatihah',
      numberOfAyahs: 7,
      revelationType: 'Meccan',
      ayahs: [],
    }),
    getAudioUrl: jest.fn().mockReturnValue('http://example.com/audio.mp3'),
  },
}));

test('renders quran reader', async () => {
  render(<App />);
  await waitFor(() => {
    const titleElement = screen.getByText(/Quran Reader/i);
    expect(titleElement).toBeInTheDocument();
  });
});


