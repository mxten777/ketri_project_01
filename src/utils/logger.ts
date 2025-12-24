/**
 * 프로덕션에서는 console을 제거하고, 개발 환경에서만 로깅하는 유틸리티
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  error: (...args: unknown[]) => {
    // 에러는 프로덕션에서도 기록 (모니터링 필요)
    console.error(...args);
  },

  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },

  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};

// 단순 에러만 필요한 경우
export const logError = (message: string, error?: unknown) => {
  console.error(`[Error] ${message}`, error);
};

// 개발 환경에서만 로그
export const logDev = (...args: unknown[]) => {
  if (isDevelopment) {
    console.log(...args);
  }
};
