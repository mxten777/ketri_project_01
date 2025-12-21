import { motion } from "framer-motion";
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
} from "lucide-react";
import Button from "../../components/common/Button";

const Location = () => {
  const transportInfo = [
    {
      type: "자가용",
      icon: Car,
      routes: [
        "경부고속도로 → 청주IC → 청주시내 → 서원구 남이면",
        "중부고속도로 → 남청주IC → 서원구 방향 → 남이면",
        "청주시내에서 36번 국도 → 남이면 → 양동3길",
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
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 dark:from-primary-700 dark:via-primary-800 dark:to-blue-900 text-white py-20 overflow-hidden">
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
      <section className="py-20">
        <div className="container-custom">
          {/* Map Section - 큰 사이즈로 강조 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-heading-xl mb-3 text-neutral-900 dark:text-white">
                위치 안내
              </h2>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                지도를 클릭하여 더 자세한 위치를 확인하세요
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
              <div className="aspect-[16/9] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.234!2d127.4894!3d36.5674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM0JzAyLjciTiAxMjfCsDI5JzIxLjgiRQ!5e0!3m2!1sko!2skr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="한국환경안전연구소 위치"
                  className="grayscale-0 hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>

              {/* Map Navigation Buttons */}
              <div className="p-6 bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-700 border-t border-neutral-200 dark:border-neutral-600">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      길찾기 바로가기
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="https://map.naver.com/p/search/충북 청주시 서원구 남이면 양동3길 7-30"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <span>네이버맵</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://map.kakao.com/link/search/충북 청주시 서원구 남이면 양동3길 7-30"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <span>카카오맵</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=충북 청주시 서원구 남이면 양동3길 7-30"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <span>구글맵</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

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
                    남이면 양동3길 7-30
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
                    href="tel:043-237-7624"
                    className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 transition-colors block"
                  >
                    대표: 043-237-7624~5
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
                  043-237-7624~5
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
        </div>
      </section>
    </div>
  );
};

export default Location;
