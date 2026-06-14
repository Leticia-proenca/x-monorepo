import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { LAYOUT } from '@/constants/layout';
import { useThemeColor } from '@/hooks/use-theme-color';

const logo = require('@/assets/images/tx.svg');

type AuthBandHeaderProps = {
  subtitle: string;
  fontFamily?: string;
};

/**
 * Full-bleed institutional band: the charcoal brand color carries the header
 * (the "official health system" statement). Squared geometry, no glow.
 */
export function AuthBandHeader({ subtitle, fontFamily }: AuthBandHeaderProps) {
  const bandColor = useThemeColor({}, 'buttonColor');
  const fontStyle = fontFamily ? { fontFamily } : null;

  return (
    <View style={[styles.band, { backgroundColor: bandColor }]}>
      <View style={styles.inner}>
        <Image source={logo} style={styles.logo} contentFit="contain" />
        <ThemedText style={[styles.brand, fontStyle]}>Triagem X</ThemedText>
        <ThemedText style={[styles.subtitle, fontStyle]}>{subtitle}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    width: '100%',
    paddingTop: 52,
    paddingBottom: 36,
    paddingHorizontal: 24,
    borderBottomWidth: 3,
    borderBottomColor: '#11151A',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: LAYOUT.formMaxWidth,
    gap: 14,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  brand: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: 0.2,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.85)',
  },
});
