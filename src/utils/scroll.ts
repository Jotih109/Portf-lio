import type Lenis from 'lenis';

/**
 * O Lenis roda um loop proprio de scroll. Se a navegacao usar
 * scrollIntoView/window.scrollTo com behavior:'smooth', os dois disputam
 * a mesma posicao e o salto fica travado. Entao quem estiver ativo manda:
 * com Lenis, usa o scrollTo dele; sem Lenis, cai no nativo.
 */
let lenisInstance: Lenis | null = null;

export const registerLenis = (instance: Lenis | null): void => {
  lenisInstance = instance;
};

export const scrollToTarget = (targetId?: string): void => {
  const el = targetId ? document.getElementById(targetId) : null;

  if (lenisInstance) {
    if (el) {
      lenisInstance.scrollTo(el);
    } else {
      lenisInstance.scrollTo(0);
    }
    return;
  }

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
