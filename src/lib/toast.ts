export type ToastType = 'success' | 'error' | 'info';

export type ToastPayload = {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  durationMs?: number;
};

type ToastListener = (payload: Required<ToastPayload>) => void;

let listener: ToastListener | null = null;

function randomId(): string {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function registerToastListener(next: ToastListener | null) {
  listener = next;
}

export function showToast(payload: ToastPayload) {
  if (!listener) return;
  const message = String(payload.message || '').trim();
  if (!message) return;
  listener({
    id: payload.id || randomId(),
    type: payload.type || 'info',
    title: payload.title || '',
    message,
    durationMs: Math.max(1200, Number(payload.durationMs || 4500)),
  });
}

export const toast = {
  show: showToast,
  success: (message: string, title = 'Success') => showToast({ type: 'success', title, message }),
  error: (message: string, title = 'Error') => showToast({ type: 'error', title, message, durationMs: 6200 }),
  info: (message: string, title = 'Info') => showToast({ type: 'info', title, message }),
};
