/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// App font (web uses the loaded Space Grotesk; native falls back to system).
export const APP_FONT =
  "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const tintColorLight = '#1F2733';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    pageBackground: '#F4F5F7',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    placeholderTextColor: '#C2C6D4',
    buttonColor: '#1F2733',
    iconColor: '#1F2733',
    iconBoxColor: '#EEF0F3',
    label: '#424752',
    inputBackground: '#FFFFFF',
    inputBorder: '#DDE4EE',
    inputText: '#0F172A',
    error: '#DC2626',
    cardBorder: '#C2C6D4',
    cardSurface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    suspectValue: '#E53E3E',
    badgeSuspectBackground: '#FEE2E2',
    badgeSuspectText: '#C53030',
    badgeNormalBackground: '#D1FAE5',
    badgeNormalText: '#065F46',
    buttonShadow: '#1F2733',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    pageBackground: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    placeholderTextColor: '#C2C6D4',
    buttonColor: '#374151',
    iconColor: '#AEB6C2',
    iconBoxColor: '#1F2426',
    label: '#94A3B8',
    inputBackground: '#1F2426',
    inputBorder: '#384047',
    inputText: '#ECEDEE',
    error: '#F87171',
    cardBorder: '#384047',
    cardSurface: '#1F2426',
    onPrimary: '#FFFFFF',
    suspectValue: '#FC8181',
    badgeSuspectBackground: '#422020',
    badgeSuspectText: '#FCA5A5',
    badgeNormalBackground: '#064E3B',
    badgeNormalText: '#6EE7B7',
    buttonShadow: '#11151A',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
