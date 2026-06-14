import { getApiBaseUrl } from '@/config/env';
import { ApiError } from '@/services/api/client';
import { getAccessToken } from '@/services/api/session';

function parseErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== 'object') {
    return 'Não foi possível gerar o PDF da avaliação.';
  }

  const error = (payload as { error?: unknown }).error;

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }

  return 'Não foi possível gerar o PDF da avaliação.';
}

export async function fetchEvaluationPdfBuffer(evaluationId: string): Promise<ArrayBuffer> {
  const accessToken = await getAccessToken();
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const pdfUrl = `${baseUrl}/evaluations/${evaluationId}/pdf`;

  const response = await fetch(pdfUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/pdf',
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new ApiError(response.status, parseErrorMessage(payload));
  }

  return response.arrayBuffer();
}
