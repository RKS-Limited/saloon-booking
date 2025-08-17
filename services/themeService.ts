
import { ThemeColors } from '../types';

function rgbToCssString(rgb: { r: number; g: number; b: number }): string {
    return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

function getBrightness(r: number, g: number, b: number): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export const extractColorsFromImage = (imageUrl: string): Promise<ThemeColors> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Could not get canvas context'));
            }
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const colorCounts: { [key: string]: { count: number; r: number; g: number; b: number } } = {};
            
            // Sample pixels for performance
            const sampleRate = 5;
            for (let i = 0; i < data.length; i += 4 * sampleRate) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];
                const a = data[i+3];

                // Ignore transparent or near-white/black pixels
                if (a < 128 || (r > 250 && g > 250 && b > 250) || (r < 10 && g < 10 && b < 10)) {
                    continue;
                }

                const key = `${r},${g},${b}`;
                if (!colorCounts[key]) {
                    colorCounts[key] = { count: 0, r, g, b };
                }
                colorCounts[key].count++;
            }

            const sortedColors = Object.values(colorCounts).sort((a, b) => b.count - a.count);

            if (sortedColors.length < 3) {
                // Fallback to default if not enough colors found
                 resolve({
                    primary: '99 102 241',
                    secondary: '59 130 246',
                    accent: '245 158 11',
                    textBase: '17 24 39',
                    textMuted: '75 85 99',
                    background: '249 250 251',
                });
                return;
            }

            const primary = sortedColors[0];
            const secondary = sortedColors[1];
            const accent = sortedColors[2];
            
            const isDarkBackground = getBrightness(primary.r, primary.g, primary.b) < 128;
            
            resolve({
                primary: rgbToCssString(primary),
                secondary: rgbToCssString(secondary),
                accent: rgbToCssString(accent),
                background: isDarkBackground ? '17 24 39' : '249 250 251',
                textBase: isDarkBackground ? '249 250 251' : '17 24 39',
                textMuted: isDarkBackground ? '156 163 175' : '75 85 99',
            });
        };
        img.onerror = (error) => reject(error);
    });
};