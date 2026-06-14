import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

type AlertType = 'warning' | 'danger' | 'info';

type ResultadoAvaliacaoAlertCardProps = {
  title: string;
  description: string;
  type?: AlertType;
  style?: StyleProp<ViewStyle>;
};

export function ResultadoAvaliacaoAlertCard({
  title,
  description,
  type = 'info',
  style,
}: ResultadoAvaliacaoAlertCardProps) {
  const surface = useThemeColor({}, 'cardSurface');
  const inkColor = useThemeColor({}, 'text');
  const cardBorderColor = useThemeColor({}, 'cardBorder');

  const colors = (() => {
    switch (type) {
      case 'danger':
      case 'warning':
        return {
          backgroundColor: surface,
          borderColor: '#DC2626',
          iconColor: '#DC2626',
          textColor: '#DC2626',
        };
      case 'info':
      default:
        return {
          backgroundColor: surface,
          borderColor: cardBorderColor,
          iconColor: inkColor,
          textColor: inkColor,
        };
    }
  })();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        <View style={[styles.iconBox, { backgroundColor: colors.borderColor + '20' }]}>
          <IconSymbol
            name={type === 'danger' ? 'exclamationmark.triangle.fill' : 'exclamationmark.circle.fill'}
            size={20}
            color={colors.iconColor}
          />
        </View>

        <View style={styles.textColumn}>
          <ThemedText style={[styles.title, { color: colors.textColor }]}>{title}</ThemedText>
          <ThemedText style={[styles.description, { color: colors.textColor }]}>
            {description}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  textColumn: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
