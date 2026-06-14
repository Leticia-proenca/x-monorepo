import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

type FormButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  showIcon?: boolean;
  icon?: string;
  grouped?: boolean;
  /** Applies the system's single Action Shadow under the primary CTA. */
  elevated?: boolean;
  /** Institutional 4px corners instead of the default 10px. */
  squared?: boolean;
  fontFamily?: string;
};

export function FormButton({
  onPress,
  label,
  disabled = false,
  showIcon = true,
  icon = 'arrow.right.circle.fill',
  grouped = false,
  elevated = false,
  squared = false,
  fontFamily,
}: FormButtonProps) {
  const buttonColor = useThemeColor({}, 'buttonColor');
  const onPrimaryColor = useThemeColor({}, 'onPrimary');
  const shadowColor = useThemeColor({}, 'buttonShadow');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        !grouped && styles.buttonSpaced,
        { backgroundColor: buttonColor },
        squared && styles.squared,
        elevated && !disabled && [styles.elevated, { shadowColor }],
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <ThemedText style={[styles.label, { color: onPrimaryColor }, fontFamily ? { fontFamily } : null]}>
        {label}
      </ThemedText>
      {showIcon ? (
        <IconSymbol name={icon as never} size={20} color={onPrimaryColor} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 52,
    gap: 8,
  },
  buttonSpaced: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  squared: {
    borderRadius: 4,
  },
  elevated: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});
