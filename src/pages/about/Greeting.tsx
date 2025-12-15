import { motion } from "framer-motion";
import { User, Heart, Award, Target } from "lucide-react";

const Greeting = () => {
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">인사말</h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              한국환경안전연구소를 찾아주신 여러분께 진심으로 감사드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CEO Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-64 h-64 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
              <User
                size={80}
                className="text-primary-600 dark:text-primary-400"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                대표이사 이사장
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                한국환경안전연구소
              </p>
            </div>
          </motion.div>

          {/* CEO Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                안녕하십니까. 한국환경안전연구소 대표이사입니다.
              </p>

              <p>
                저희 한국환경안전연구소는 <strong>환경보호</strong>와{" "}
                <strong>안전관리</strong>를 통해 국민의 건강하고 안전한 삶을
                지원하는 전문 연구기관입니다.
              </p>

              <p>
                산업보건, 먹는물 검사, 실내공기질 측정, 석면 조사·분석 등 다양한
                분야에서 축적된 <strong>전문성</strong>과{" "}
                <strong>신뢰성</strong>을 바탕으로 고객 여러분께 최고 품질의
                서비스를 제공하고 있습니다.
              </p>

              <p>
                특히 급변하는 환경 규제와 안전 기준에 발맞춰 지속적인 연구개발과
                첨단 장비 도입을 통해 정확하고 신속한 분석 서비스를
                제공하겠습니다.
              </p>

              <p>
                앞으로도 <strong>"정확성, 신속성, 전문성"</strong>을 바탕으로
                고객 만족과 사회적 책임을 다하는 연구소가 되겠습니다.
              </p>

              <p className="text-lg font-medium">감사합니다.</p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="heading-lg text-center mb-12">우리의 가치</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-soft">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold mb-3">신뢰성</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                정확하고 투명한 검사와 분석으로 고객의 신뢰를 얻습니다
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-soft">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-3">전문성</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                풍부한 경험과 최신 기술로 전문적인 서비스를 제공합니다
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-soft">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold mb-3">혁신성</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                지속적인 연구개발로 환경안전 분야를 선도합니다
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Greeting;
