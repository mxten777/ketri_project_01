/**
 * Kakao Maps SDK 로더 유틸리티
 * 중복 로드를 방지하고 안전하게 SDK를 로드합니다.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KakaoMaps = any;

declare global {
  interface Window {
    kakao: {
      maps: KakaoMaps;
    };
  }
}

let isLoading = false;
let isLoaded = false;

/**
 * Kakao Maps SDK를 로드합니다.
 * @param appKey - Kakao JavaScript 앱 키
 * @returns Promise<void> - 로드 완료 시 resolve
 */
export function loadKakaoMaps(appKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 이미 로드된 경우
    if (isLoaded && window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    // 로딩 중인 경우 - 기존 로딩 완료를 기다림
    if (isLoading) {
      const checkInterval = setInterval(() => {
        if (isLoaded && window.kakao && window.kakao.maps) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      
      // 10초 타임아웃
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Kakao Maps loading timeout'));
      }, 10000);
      return;
    }

    // SDK 로드 시작
    isLoading = true;

    // 이미 스크립트가 DOM에 있는지 확인
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          isLoaded = true;
          isLoading = false;
          resolve();
        });
      } else {
        isLoading = false;
        reject(new Error('Kakao Maps object not found'));
      }
    };

    script.onerror = () => {
      isLoading = false;
      reject(new Error('Failed to load Kakao Maps SDK script'));
    };

    document.head.appendChild(script);
  });
}

/**
 * Kakao Maps SDK가 이미 로드되었는지 확인
 */
export function isKakaoMapsLoaded(): boolean {
  return isLoaded && window.kakao && window.kakao.maps;
}
