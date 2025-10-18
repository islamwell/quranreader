# Quran Reader

A beautiful, interactive Quran reader application built with React and TypeScript. This application provides an easy-to-use interface for reading and listening to the Holy Quran with audio recitation.

## Features

- **114 Surahs with 6236 Ayahs**: Complete Holy Quran with all verses in Arabic
- **Audio Recitation**: Default audio playback from everyayah.com
- **Multiple Reciters**: Select from popular reciters including:
  - Nasser Al-Qatami (default)
  - Abdul Basit
  - Mishary Rashid Alafasy
  - Saad Al-Ghamidi
  - And more...
- **Customizable Display**:
  - Font size selection (14px - 36px)
  - Multiple Arabic font families
  - Responsive design for all devices
- **Easy Navigation**:
  - Sliding menu from the right to browse and select surahs
  - Click on any ayah to start audio playback from that point
  - Auto-advance to next ayah during playback
- **Settings Menu**:
  - Adjust font size and family
  - Select preferred reciter
  - Optional login functionality
- **User-Friendly Interface**:
  - Clean, modern design
  - Sticky audio player at the bottom
  - Active ayah highlighting during playback
  - Surah header with Arabic and English names

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/islamwell/quranreader.git
cd quranreader
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Usage

1. **Reading**: The application starts with Surah 1 (Al-Fatihah) displayed by default
2. **Navigation**: 
   - Click the 📖 icon in the header to open the surah list
   - Select any surah to navigate to it
3. **Audio Playback**:
   - Click the play button in the audio player to start recitation
   - Click on any ayah to jump to that point
   - Audio will automatically advance to the next ayah
4. **Settings**:
   - Click the ⚙️ icon to open settings
   - Adjust font size using the slider or +/- buttons
   - Select your preferred font family
   - Choose your favorite reciter
   - Optionally log in (feature placeholder)

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Axios** - HTTP client for API calls
- **AlQuran Cloud API** - Quran text data
- **EveryAyah.com** - Audio recitation files

## API Credits

- Quran text data provided by [AlQuran Cloud API](https://alquran.cloud/api)
- Audio recitations from [EveryAyah.com](https://everyayah.com/)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Thanks to AlQuran Cloud for providing the Quran API
- Thanks to EveryAyah.com for providing audio recitations
- All praise is due to Allah (SWT)
