const getContrastColor = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Calculate luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const normalize = (value: number) => {
      value /= 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
  };

  const { r, g, b } = hexToRgb(backgroundColor);
  const luminance = getLuminance(r, g, b);

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export default getContrastColor;
