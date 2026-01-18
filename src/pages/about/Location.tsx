import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MapPin,
  Clock,
  Car,
  Bus,
  Phone,
  Mail,
  Navigation,
  Route,
  ExternalLink,
  MapPinned,
  ParkingCircle,
  AlertCircle,
} from "lucide-react";
import { CONTACT_INFO } from "@/constants/menu";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { loadKakaoMaps } from "@/lib/kakaoMaps";

// ScrollHashHandler 컴포넌트
function ScrollHashHandler() {
  const location = useLocation();
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    if (!location.hash) return;
    if (location.pathname !== "/about/location") return;

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    didRunRef.current = true;
    // Use requestAnimationFrame to avoid arbitrary timeouts and ensure DOM painted
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.pathname, location.hash]);

  return null;
}
 
const Location = () => {
  const [mapError, setMapError] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  // Kakao Maps SDK 로드 및 지도 초기화
  useEffect(() => {
    const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

    // 환경변수 체크
    if (!kakaoKey) {
      console.warn('[Location] VITE_KAKAO_JS_KEY is missing. Map will not be displayed.');
      setMapError(true);
      return;
    }

    // 이미 지도가 초기화되어 있으면 종료
    if (mapInstanceRef.current) {
      return;
    }

    // SDK 로드 및 지도 생성
    loadKakaoMaps(kakaoKey)
      .then(() => {
        if (!mapContainerRef.current) return;

        const { latitude, longitude } = CONTACT_INFO.coordinates;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { kakao } = window as any;

        // 지도 중심 좌표
        const centerPosition = new kakao.maps.LatLng(latitude, longitude);

        // 지도 옵션
        const mapOption = {
          center: centerPosition,
          level: 3, // 확대 레벨 (1-14, 숫자가 작을수록 확대)
        };

        // 지도 생성
        const map = new kakao.maps.Map(mapContainerRef.current, mapOption);
        mapInstanceRef.current = map;

        // 마커 생성
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        // 인포윈도우 생성 (선택사항)
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:10px;font-size:14px;font-weight:bold;">한국환경안전연구소</div>`,
        });
        infowindow.open(map, marker);

        setMapError(false);
      })
      .catch((error) => {
        console.error('[Location] Failed to load Kakao Maps:', error);
        setMapError(true);
      });

    // cleanup
    return () => {
      if (mapInstanceRef.current) {
        // Kakao Maps는 별도 cleanup 불필요
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 앱 딥링크 우선 + visibility 체크로 fallback 처리
  const openWithFallback = (appUrl: string, webUrl: string) => {
    const start = Date.now();
    window.location.href = appUrl;
    
    setTimeout(() => {
      // 앱으로 전환되면 페이지가 background로 가므로, visible 상태이고 시간이 짧으면 앱 미설치
      if (document.visibilityState === "visible" && Date.now() - start < 1200) {
        window.location.href = webUrl;
      }
    }, 700);
  };

  // 모바일/인앱브라우저 안정형 네비게이션 - 앱 우선, 좌표 기반 직접 목적지
  const handleMapNavigation = (type: 'naver' | 'kakao' | 'google') => {
    const { latitude, longitude } = CONTACT_INFO.coordinates;
    const placeName = encodeURIComponent("한국환경안전연구소");
    
    let appUrl = '';
    let webUrl = '';

    switch (type) {
      case 'naver':
        // 네이버 앱: nmap 스킴으로 좌표+장소명 전달
        appUrl = `nmap://place?lat=${latitude}&lng=${longitude}&name=${placeName}&appname=ketri.co.kr`;
        // 네이버 웹: 길찾기 도착지로 바로 표시 (lng,lat 순서 주의)
        webUrl = CONTACT_INFO.naverMapWeb || `https://map.naver.com/v5/directions/-/-/${longitude},${latitude},${placeName}`;
        openWithFallback(appUrl, webUrl);
        break;
      case 'kakao':
        // 카카오 앱: look 파라미터로 좌표 전달
        appUrl = `kakaomap://look?p=${latitude},${longitude}`;
        // 카카오 웹: link/map은 바로 목적지 표시 (to는 길찾기 시작 페이지라 광고 나옴)
        webUrl = CONTACT_INFO.kakaoMapWeb || `https://map.kakao.com/link/map/${placeName},${latitude},${longitude}`;
        openWithFallback(appUrl, webUrl);
        break;
      case 'google':
        // 구글 앱: comgooglemaps 스킴 (iOS/Android 공통)
        appUrl = `comgooglemaps://?q=${latitude},${longitude}(${placeName})`;
        // 구글 웹: 좌표 기반 검색
        webUrl = CONTACT_INFO.googleMapsSearch || `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        openWithFallback(appUrl, webUrl);
        break;
    }
  };

  const transportInfo = [
    {
      type: "자가용",
      icon: Car,
      routes: [
        "경부고속도로 → 청주IC → 청주시내 → 서원구 남이면",
        "중부고속도로 → 남청주IC → 서원구 방향 → 남이면",
        "청주시내에서 36번 국도 → 남이면 → 양촌 3길",
      ],
    },
    {
      type: "대중교통",
      icon: Bus,
      routes: [
        "청주시외버스터미널 → 남이면행 시내버스",
        "청주역 → 남이면행 버스 이용",
        "청주공항 → 시내버스 환승 → 남이면",
      ],
    },
  ];

  const landmarks = [
    { name: "청주시청", distance: "15km", time: "20분" },
    { name: "청주대학교", distance: "8km", time: "12분" },
    { name: "청주공항", distance: "25km", time: "30분" },
    { name: "청주역", distance: "18km", time: "25분" },
  ];

  const operatingHours = [
    {
      day: "월요일 - 금요일",
      time: "08:00 - 18:00",
      note: "점심시간: 12:00 - 13:00",
    },
    { day: "토요일", time: "휴무", note: "" },
    { day: "일요일/공휴일", time: "휴무", note: "" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section data-has-hero className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 dark:from-primary-700 dark:via-primary-800 dark:to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                <MapPin className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-display-lg mb-4">오시는 길</h1>
            <p className="text-body-lg opacity-90 max-w-2xl mx-auto">
              한국환경안전연구소를 찾아오시는 방법을 안내해드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <Section spacing="none" className="pt-10 lg:pt-12">
        <Container>
          {/* Map Section - 큰 사이즈로 강조 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            id="map"
            data-section="location-map"
            className="mb-16 scroll-mt-[var(--app-header-h)]"
          >
            <div className="text-center mb-8">
              <h2 className="text-heading-xl mb-3 text-neutral-900 dark:text-white">
                위치 안내
              </h2>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                지도를 클릭하여 더 자세한 위치를 확인하세요
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* 좌측: 주소 카드 */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-xl border border-neutral-200 dark:border-neutral-700 group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">오시는 길</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {CONTACT_INFO.address}
                      </p>
                      <div className="mt-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <div className="mb-2">
                          <span className="font-semibold">대표전화: </span>
                          <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-primary-600">
                            {CONTACT_INFO.phone}
                          </a>
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold">이메일: </span>
                          <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary-600 break-all">
                            {CONTACT_INFO.email}
                          </a>
                        </div>
                        <div>
                          <span className="font-semibold">교통/주차: </span>
                          <span className="text-neutral-600 dark:text-neutral-400">현장 근처 무료 주차 가능. 대중교통 이용 시 청주 시내에서 버스 환승.</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleMapNavigation('google')}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                        >
                          큰 지도 보기
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(CONTACT_INFO.address);
                              alert("주소가 복사되었습니다.");
                            } catch (err) {
                              // fallback
                              try {
                                window.prompt("주소를 복사하세요:", CONTACT_INFO.address);
                              } catch (e) {
                                alert("주소 복사에 실패했습니다.");
                              }
                            }
                          }}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-neutral-900 dark:text-white rounded-xl font-semibold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 transition-all duration-200"
                        >
                          주소 복사
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 우측: 지도 - Kakao Maps SDK */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  {/* 고정 높이 컨테이너 - 모바일 최적화 */}
                  <div className="h-[280px] md:h-[360px] relative overflow-hidden">
                    {!mapError ? (
                      // Kakao 지도 컨테이너
                      <div 
                        ref={mapContainerRef}
                        className="w-full h-full"
                        style={{ background: '#f0f0f0' }}
                      />
                    ) : (
                      // Fallback UI - 지도 로딩 실패 시
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 p-6 sm:p-8">
                        <div className="max-w-xl w-full text-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neutral-900 dark:text-white">
                            지도를 불러올 수 없습니다
                          </h3>
                          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-5 sm:mb-6 leading-relaxed px-2">
                            일부 환경에서는 지도가 표시되지 않을 수 있습니다.
                            <br className="hidden sm:block" />
                            아래 버튼을 통해 외부 지도 앱에서 위치를 확인하세요.
                          </p>
                          
                          {/* 모바일 친화 grid 레이아웃 - 버튼 줄바꿈 방지 */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => handleMapNavigation('naver')}
                              className="w-full min-h-[52px] px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg flex items-center justify-between gap-3"
                            >
                              <MapPin className="w-5 h-5 flex-shrink-0" />
                              <span className="whitespace-nowrap break-keep leading-tight text-sm sm:text-base">네이버지도</span>
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMapNavigation('kakao')}
                              className="w-full min-h-[52px] px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg flex items-center justify-between gap-3"
                            >
                              <MapPin className="w-5 h-5 flex-shrink-0" />
                              <span className="whitespace-nowrap break-keep leading-tight text-sm sm:text-base">카카오맵</span>
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMapNavigation('google')}
                              className="w-full min-h-[52px] px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center justify-between gap-3"
                            >
                              <MapPin className="w-5 h-5 flex-shrink-0" />
                              <span className="whitespace-nowrap break-keep leading-tight text-sm sm:text-base">구글지도</span>
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            </button>
                          </div>

                          <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-white/50 dark:bg-neutral-700/50 rounded-xl">
                            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 break-keep">
                              <strong>주소:</strong> {CONTACT_INFO.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Map Navigation Buttons */}
                  <div className="p-6 bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-700 border-t border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <Navigation className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <span className="font-semibold text-neutral-900 dark:text-white">길찾기 바로가기</span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleMapNavigation('naver')}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <span>네이버맵</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMapNavigation('kakao')}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <span>카카오맵 길찾기</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMapNavigation('google')}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <span>구글맵</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll-to-hash correction: if navigated with #map ensure we arrive at the map start. */}
          {/* Uses requestAnimationFrame for a single, non-blocking correction without magic timeouts. */}
          {/** keep this effect client-only and run once per mount when hash present */}
          <ScrollHashHandler />

          {/* Contact Cards - 3단 그리드 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {/* Address Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    주소
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    충북 청주시 서원구
                    <br />
                    남이면 양촌 3길 7-30
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                    우편번호: 28805
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    전화번호
                  </h3>
                  <a
                    href="tel:043-237-7824"
                    className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 transition-colors block"
                  >
                    대표: 043-237-7824~5
                  </a>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    팩스: 043-237-7826
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                    이메일
                  </h3>
                  <a
                    href="mailto:kesri0728@naver.com"
                    className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 transition-colors break-all"
                  >
                    kesri0728@naver.com
                  </a>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                    업무 문의 및 견적 요청
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Operating Hours - 개선된 디자인 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
                운영시간
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                방문 전 운영시간을 확인해주세요
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-3xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
              {operatingHours.map((schedule, index) => (
                <div
                  key={schedule.day}
                  className={`p-6 flex items-center justify-between ${
                    index < operatingHours.length - 1
                      ? "border-b border-neutral-200 dark:border-neutral-700"
                      : ""
                  } hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors`}
                >
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">
                        {schedule.day}
                      </div>
                      {schedule.note && (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                          {schedule.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        schedule.time === "휴무"
                          ? "text-red-500"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {schedule.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Transportation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
                교통안내
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                편리한 교통편을 이용하세요
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {transportInfo.map((transport, index) => {
                const Icon = transport.icon;
                return (
                  <motion.div
                    key={transport.type}
                    initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-600 group"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {transport.type}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {transport.routes.map((route, routeIndex) => (
                        <div
                          key={routeIndex}
                          className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-xl hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors"
                        >
                          <Route className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {route}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Nearby Landmarks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
                주요 랜드마크
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                주요 거점에서의 거리 및 소요시간
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {landmarks.map((landmark, index) => (
                <motion.div
                  key={landmark.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center p-8 bg-white dark:bg-neutral-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 group hover:-translate-y-1"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPinned className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-neutral-900 dark:text-white">
                    {landmark.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400">
                      <span className="text-sm">거리</span>
                      <span className="font-semibold text-primary-600 dark:text-primary-400">
                        {landmark.distance}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">{landmark.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Parking & Visit Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-3xl p-10 border border-primary-200 dark:border-primary-800"
          >
            <h2 className="text-3xl font-bold text-center mb-10 text-neutral-900 dark:text-white">
              주차 및 방문 안내
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ParkingCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-neutral-900 dark:text-white">
                  주차공간
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  충분한 주차공간 확보
                  <br />
                  무료 주차 가능
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-neutral-900 dark:text-white">
                  방문 예약
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  사전 방문 예약 권장
                  <br />
                  전화 또는 이메일 문의
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-neutral-900 dark:text-white">
                  연락처
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  043-237-7824~5
                  <br />
                  평일 08:00-18:00
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-800 rounded-2xl text-center border border-neutral-200 dark:border-neutral-700">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong className="text-primary-600 dark:text-primary-400">
                  방문 시 참고사항:
                </strong>{" "}
                시료 접수나 상담을 위한 방문 시에는 사전에 전화로 연락해 주시면
                더욱 신속한 서비스를 받으실 수 있습니다.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

export default Location;
