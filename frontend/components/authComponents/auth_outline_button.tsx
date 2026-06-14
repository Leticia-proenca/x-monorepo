import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type AuthOutlineButtonProps = {
  label: string;
  onPress: () => void;
  squared?: boolean;
  fontFamily?: string;
};

export function AuthOutlineButton({
  label,
  onPress,
  squared = false,
  fontFamily,
}: AuthOutlineButtonProps) {
  const borderColor = useThemeColor({}, 'cardBorder');
  const textColor = useThemeColor({}, 'buttonColor');

  return (
    <TouchableOpacity
      style={[styles.button, { borderColor, borderRadius: 4 }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <ThemedText style={[styles.label, { color: textColor }, fontFamily ? { fontFamily } : null]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
