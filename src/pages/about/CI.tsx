import { motion } from "framer-motion";
import { Palette, Eye, Heart, Target, Lightbulb, Shield } from "lucide-react";

const CI = () => {
  const colors = [
    {
      name: "Primary Blue",
      hex: "#2563eb",
      rgb: "RGB(37, 99, 235)",
      description: "신뢰성과 전문성",
    },
    {
      name: "Secondary Green",
      hex: "#059669",
      rgb: "RGB(5, 150, 105)",
      description: "환경과 성장",
    },
    {
      name: "Accent Orange",
      hex: "#ea580c",
      rgb: "RGB(234, 88, 12)",
      description: "활력과 혁신",
    },
    {
      name: "Neutral Gray",
      hex: "#6b7280",
      rgb: "RGB(107, 114, 128)",
      description: "균형과 안정",
    },
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">CI 소개</h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              한국환경안전연구소의 브랜드 아이덴티티와 디자인 철학
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-8">브랜드 로고</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Logo Display */}
            <div className="space-y-8">
              {/* Light Mode Logo */}
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                <h3 className="text-lg font-bold mb-4 text-neutral-800">
                  라이트 모드
                </h3>
                <div className="bg-neutral-50 rounded-xl p-8 flex items-center justify-center">
                  <img
                    src="/images/logo_horizontal.png"
                    alt="KETRI Logo Light"
                    className="h-16 object-contain"
                  />
                </div>
              </div>

              {/* Dark Mode Logo */}
              <div className="bg-neutral-800 rounded-2xl p-8 shadow-soft">
                <h3 className="text-lg font-bold mb-4 text-white">다크 모드</h3>
                <div className="bg-neutral-700 rounded-xl p-8 flex items-center justify-center">
                  <img
                    src="/images/logo_horizontal_trans.png"
                    alt="KETRI Logo Dark"
                    className="h-16 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Logo Meaning */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">로고의 의미</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-6">
                  한국환경안전연구소의 로고는 <strong>환경보호</strong>와{" "}
                  <strong>안전</strong>이라는 핵심 가치를 시각적으로 표현합니다.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold mb-2">신뢰성</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        깔끔하고 전문적인 디자인으로 신뢰할 수 있는 기관임을
                        표현
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold mb-2">환경 친화성</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        자연과 조화를 이루는 친환경적 가치 추구
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-bold mb-2">혁신성</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        지속적인 발전과 혁신을 통한 미래 지향적 사고
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">브랜드 컬러</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-soft"
              >
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">{color.name}</h4>
                  <div className="text-sm space-y-1 mb-3">
                    <div className="font-mono text-neutral-600 dark:text-neutral-400">
                      {color.hex}
                    </div>
                    <div className="font-mono text-neutral-600 dark:text-neutral-400">
                      {color.rgb}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {color.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-lg text-center mb-12">브랜드 가치</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">투명성</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                모든 과정을 투명하게 공개하여 고객의 신뢰를 얻습니다
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">책임감</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                환경과 안전에 대한 사회적 책임을 다합니다
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">정확성</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                정밀하고 정확한 분석으로 최고의 결과를 제공합니다
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">혁신</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                지속적인 연구개발로 미래를 선도합니다
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">안전성</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                모든 작업에서 안전을 최우선으로 생각합니다
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">전문성</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                높은 전문성과 풍부한 경험을 바탕으로 서비스를 제공합니다
              </p>
            </div>
          </div>
        </motion.div>

        {/* Usage Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            CI 사용 가이드라인
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-green-600">
                권장사항
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  로고 주변에 충분한 여백 확보
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  브랜드 컬러 정확히 사용
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  고해상도 이미지 사용
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  일관된 톤앤매너 유지
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-red-600">금지사항</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  로고 변형 및 왜곡 금지
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  임의 색상 변경 금지
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  저해상도 이미지 사용 금지
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  브랜드 가치에 어긋나는 사용 금지
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CI;
