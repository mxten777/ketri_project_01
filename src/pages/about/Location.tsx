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
} from "lucide-react";

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
      time: "09:00 - 18:00",
      note: "점심시간: 12:00 - 13:00",
    },
    { day: "토요일", time: "09:00 - 13:00", note: "오후 휴무" },
    { day: "일요일/공휴일", time: "휴무", note: "응급시 전화 문의" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">오시는길</h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              한국환경안전연구소 찾아오는 방법과 주변 정보
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom">
        {/* Address and Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
                  <MapPin className="w-6 h-6 text-primary-500 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">주소</h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      충북 청주시 서원구 남이면 양동3길 7-30
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      우편번호: 28211
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
                  <Phone className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">전화번호</h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      대표: 043.237.7624~5
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      팩스: 043.237.7626
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
                  <Mail className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">이메일</h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      info@ketri.re.kr
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      업무 문의 및 견적 요청
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="text-xl font-bold mb-4">운영시간</h3>

              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft overflow-hidden">
                {operatingHours.map((schedule, index) => (
                  <div
                    key={schedule.day}
                    className={`p-4 ${
                      index < operatingHours.length - 1
                        ? "border-b border-neutral-200 dark:border-neutral-700"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{schedule.day}</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {schedule.note}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${
                            schedule.time === "휴무"
                              ? "text-red-500"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {schedule.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">위치 안내</h3>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft overflow-hidden">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-500">지도가 여기에 표시됩니다</p>
                  <p className="text-sm text-neutral-400 mt-2">
                    Google Maps / Naver Map 연동
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Navigation className="w-5 h-5 text-primary-500" />
                  <span className="font-medium">길찾기</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                    <span>네이버맵</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    <span>구글맵</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transportation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">교통안내</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {transportInfo.map((transport, index) => {
              const Icon = transport.icon;
              return (
                <motion.div
                  key={transport.type}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-soft"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold">{transport.type}</h3>
                  </div>

                  <div className="space-y-4">
                    {transport.routes.map((route, routeIndex) => (
                      <div key={routeIndex} className="flex items-start gap-3">
                        <Route className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">주요 랜드마크</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landmarks.map((landmark, index) => (
              <motion.div
                key={landmark.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-bold mb-2">{landmark.name}</h3>
                <div className="text-sm space-y-1">
                  <div className="text-neutral-600 dark:text-neutral-400">
                    거리: {landmark.distance}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    소요시간: {landmark.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Parking Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            주차 및 방문 안내
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold mb-2">주차공간</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                충분한 주차공간 확보
                <br />
                무료 주차 가능
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold mb-2">방문 예약</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                사전 방문 예약 권장
                <br />
                전화 또는 이메일 문의
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold mb-2">연락처</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                043.237.7624~5
                <br />
                평일 09:00-18:00
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white dark:bg-neutral-800 rounded-xl text-center">
            <p className="text-neutral-600 dark:text-neutral-300">
              <strong>방문 시 참고사항:</strong> 시료 접수나 상담을 위한
              방문시에는 사전에 전화로 연락해 주시면 더욱 신속한 서비스를 받으실
              수 있습니다.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Location;
