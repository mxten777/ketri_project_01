/**
 * Kakao Maps SDK 로더 유틸리티
 * 중복 로드를 방지하고 안전하게 SDK를 로드합니다.
 * 
 * @version 2.0 - 개선된 로깅 및 에러 처리
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
    console.log('[KakaoMaps] 🚀 Loading initiated...');

    // API 키 유효성 검사
    if (!appKey || appKey.trim() === '') {
      console.error('[KakaoMaps] ❌ Invalid API key provided');
      reject(new Error('Invalid API key: empty or undefined'));
      return;
    }

    // 이미 로드된 경우
    if (isLoaded && window.kakao && window.kakao.maps) {
      console.log('[KakaoMaps] ✅ Already loaded, using cached SDK');
      resolve();
      return;
    }

    // 로딩 중인 경우 - 기존 로딩 완료를 기다림
    if (isLoading) {
      console.log('[KakaoMaps] ⏳ Already loading, waiting...');
      const checkInterval = setInterval(() => {
        if (isLoaded && window.kakao && window.kakao.maps) {
          clearInterval(checkInterval);
          console.log('[KakaoMaps] ✅ Load completed (waited)');
          resolve();
        }
      }, 100);
      
      // 15초 타임아웃 (네트워크 느린 환경 고려)
      setTimeout(() => {
        clearInterval(checkInterval);
        console.error('[KakaoMaps] ⏱️ Timeout: SDK loading took too long (15s)');
        reject(new Error('Kakao Maps loading timeout (15s)'));
      }, 15000);
      return;
    }

    // SDK 로드 시작
    isLoading = true;
    console.log('[KakaoMaps] 📦 Creating script element...');

    // 이미 스크립트가 DOM에 있는지 확인
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existingScript) {
      console.warn('[KakaoMaps] ⚠️ Removing existing script tag');
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log('[KakaoMaps] 📥 Script loaded, initializing Maps API...');
      
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          isLoaded = true;
          isLoading = false;
          console.log('[KakaoMaps] ✅ Maps API initialized successfully');
          resolve();
        });
      } else {
        isLoading = false;
        console.error('[KakaoMaps] ❌ window.kakao.maps not found after script load');
        console.error('[KakaoMaps] 💡 Possible causes:');
        console.error('   1. Invalid API key (check Kakao Developers console)');
        console.error('   2. Domain not registered in Kakao platform settings');
        console.error('   3. API key expired or restricted');
        reject(new Error('Kakao Maps object not found - possible API key issue'));
      }
    };

    script.onerror = (event) => {
      isLoading = false;
      console.error('[KakaoMaps] ❌ Script loading failed');
      console.error('[KakaoMaps] 💡 Possible causes:');
      console.error('   1. Network connection issue');
      console.error('   2. CORS policy blocking (unlikely with Kakao)');
      console.error('   3. Browser extension blocking (AdBlock, Privacy Badger)');
      console.error('   4. CSP (Content Security Policy) restriction');
      console.error('   5. Invalid SDK URL');
      console.error('[KakaoMaps] 🔗 Script URL:', script.src);
      console.error('[KakaoMaps] 📋 Error event:', event);
      reject(new Error('Failed to load Kakao Maps SDK script - check network/console'));
    };

    console.log('[KakaoMaps] 🔗 Loading from:', script.src);
    document.head.appendChild(script);
  });
}

/**
 * Kakao Maps SDK가 이미 로드되었는지 확인
 */
export function isKakaoMapsLoaded(): boolean {
  return isLoaded && window.kakao && window.kakao.maps;
}
