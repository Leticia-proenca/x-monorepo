import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FormButton } from '@/components/ui/form-button';
import { useBreakpointLayout } from '@/hooks/useBreakpointLayout';
import { useThemeColor } from '@/hooks/use-theme-color';
import { exportEvaluationPdf } from '@/services/evaluations';
import { showAlert } from '@/utils/showAlert';

const BUTTON_HEIGHT = 52;

type ResultadoAvaliacaoActionsProps = {
  evaluationId?: string;
  onGoHome?: () => void;
  onNewEvaluation?: () => void;
};

export function ResultadoAvaliacaoActions({
  evaluationId,
  onGoHome,
  onNewEvaluation,
}: ResultadoAvaliacaoActionsProps) {
  const { isStatsRow } = useBreakpointLayout();
  const buttonColor = useThemeColor({}, 'buttonColor');
  const onPrimaryColor = useThemeColor({}, 'onPrimary');
  const labelColor = useThemeColor({}, 'label');
  const backgroundColor = useThemeColor({}, 'background');
  const greenColor = '#10B981';

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    if (!evaluationId) {
      showAlert('Relatório em PDF', 'Avaliação não identificada para exportar.');
      return;
    }

    setIsDownloading(true);
    try {
      await exportEvaluationPdf(evaluationId);
    } catch (error) {
      showAlert(
        'Relatório em PDF',
        error instanceof Error
          ? error.message
          : 'Não foi possível gerar o PDF da avaliação.',
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadLabel = isDownloading ? 'Gerando PDF...' : 'Baixar Relatório (PDF)';

  if (isStatsRow) {
    return (
      <View style={styles.wideContainer}>
        <TouchableOpacity
          style={[
            styles.wideButton,
            { backgroundColor: buttonColor },
            isDownloading && styles.buttonDisabled,
          ]}
          activeOpacity={0.85}
          onPress={handleDownload}
          disabled={isDownloading}
        >
          <IconSymbol name="arrow.down.circle.fill" size={20} color={onPrimaryColor} />
          <ThemedText style={[styles.widePrimaryLabel, { color: onPrimaryColor }]}>
            {downloadLabel}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.wideButton,
            styles.wideOutlineButton,
            { backgroundColor, borderColor: labelColor },
          ]}
          activeOpacity={0.85}
          onPress={onGoHome}
        >
          <IconSymbol name="house.fill" size={18} color={labelColor} />
          <ThemedText style={[styles.wideOutlineLabel, { color: labelColor }]}>
            Voltar ao Início
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.wideButton,
            styles.wideOutlineButton,
            { backgroundColor, borderColor: greenColor },
          ]}
          activeOpacity={0.85}
          onPress={onNewEvaluation}
        >
          <IconSymbol name="plus.circle.fill" size={18} color={greenColor} />
          <ThemedText style={[styles.wideOutlineLabel, { color: greenColor }]}>
            Nova Avaliação
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FormButton
        label={downloadLabel}
        icon="arrow.down.circle.fill"
        grouped
        onPress={handleDownload}
        disabled={isDownloading}
      />

      <View style={styles.secondaryButtonsRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor, borderColor: labelColor }]}
          activeOpacity={0.85}
          onPress={onGoHome}
        >
          <IconSymbol name="house.fill" size={18} color={labelColor} />
          <ThemedText style={[styles.secondaryLabel, { color: labelColor }]}>
            Voltar ao{'\n'}Início
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor, borderColor: greenColor }]}
          activeOpacity={0.85}
          onPress={onNewEvaluation}
        >
          <IconSymbol name="plus.circle.fill" size={18} color={greenColor} />
          <ThemedText style={[styles.secondaryLabel, { color: greenColor }]}>
            Nova{'\n'}Avaliação
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 24,
  },
  wideContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
    marginTop: 24,
  },
  wideButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: BUTTON_HEIGHT,
    gap: 8,
    paddingHorizontal: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  wideOutlineButton: {
    borderWidth: 2,
  },
  widePrimaryLabel: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  wideOutlineLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 100,
    borderWidth: 2,
    gap: 8,
  },
  secondaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
});
