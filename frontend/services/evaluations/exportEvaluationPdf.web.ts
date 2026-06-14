import { fetchEvaluationPdfBuffer } from './exportEvaluationPdf.shared';

function downloadPdfOnWeb(buffer: ArrayBuffer, filename: string): void {
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function exportEvaluationPdf(evaluationId: string): Promise<void> {
  const buffer = await fetchEvaluationPdfBuffer(evaluationId);
  downloadPdfOnWeb(buffer, `avaliacao-${evaluationId}.pdf`);
}
