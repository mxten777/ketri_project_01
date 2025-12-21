import Button from "../../components/common/Button";

const WaterTesting = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-primary-600 dark:bg-primary-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            먹는물 수질검사
          </h1>
          <p className="text-lg">
            환경부 지정 수질검사기관 (KOLAS 인증)\uC73c로 59개 항목 수질검사
            서비스\n 먹는물관리법과 수돇법에 따른 정확하고 신속한 분석으로
            안전한 먹는물을 책임집니다
          </p>
        </div>
      </div>

      <div className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-32">
              <h3 className="font-bold text-lg mb-4">세부 서비스</h3>
              <nav className="space-y-2">
                {[
                  { label: "업무소개", path: "/water-testing/introduction" },
                  { label: "수질검사대상 및 범위", path: "/water-testing/scope" },
                  { label: "수질검사주기 및 수수료", path: "/water-testing/schedule" },
                  { label: "검사의뢰 신청절차", path: "/water-testing/procedure" },
                ].map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="block px-4 py-2 rounded-lg text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card p-8">
              <h2 className="heading-md mb-6" id="overview">먹는물 수질검사 서비스</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              한국환경안전연구소는 환경부 지정 수질검사기관(KOLAS
              No.KT-1234)으로 2006년부터 5,000여 건의 수질검사를 수행했습니다.
              ISO/IEC 17025 국제 표준에 따른 품질관리 시스템으로 59개 항목의
              정확하고 신속한 수질검사 서비스를 제공합니다.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">검사 대상 시설</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏢</div>
                <h4 className="font-bold text-lg mb-2">건물 급수시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 아파트, 오피스텔</li>
                  <li>• 상업용 빌딩</li>
                  <li>• 학교, 병원</li>
                  <li>• 집단급식소</li>
                </ul>
              </div>
              <div className="p-6 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl">
                <div className="text-4xl mb-3">💧</div>
                <h4 className="font-bold text-lg mb-2">소규모 급수시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 마을상수도</li>
                  <li>• 소규모 급수시설</li>
                  <li>• 전용상수도</li>
                  <li>• 지하수</li>
                </ul>
              </div>
              <div className="p-6 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl">
                <div className="text-4xl mb-3">🏭</div>
                <h4 className="font-bold text-lg mb-2">수처리시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 정수장</li>
                  <li>• 정수처리시설</li>
                  <li>• 저수조</li>
                  <li>• 급수관</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                🧪 KOLAS 인증 수질검사 능력 (총 59개 항목)
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                먹는물 수질기준 및 검사 등에 관한 규칙에 따른 전체 59개 항목
                분석 가능하며, ISO/IEC 17025 국제표준에 따른 품질보증 시스템으로
                정확한 결과를 제공합니다.
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              수질검사 항목 (KOLAS 인증범위)
            </h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      검사구분
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      항목수
                    </th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      주요 검사 항목
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold text-primary-600">
                      미생물 (3개 항목)
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      3개
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      일반세균, 총대장균군, 분원성대장균군/대장균
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold text-primary-600">
                      건강상 유해영향 무기물질
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      15개
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      납, 불소, 비소, 세레늄, 수은, 시안, 크롬(6가),
                      암모니아성질소, 질산성질소, 카드뮴, 붕소, 브롬산염,
                      스트론튬, 페놀, 우라늄
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold text-primary-600">
                      건강상 유해영향 유기물질
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      18개
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      총트리할로메탄, 클로로포름, 브로모디클로로메탄,
                      디브로모클로로메탄, 브로모포름, 테트라클로로에틸렌,
                      트리클로로에틸렌, 1,1,1-트리클로로에탄 외
                    </td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold text-gray-600">
                      소독제 및 소독부산물
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      7개
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      잔류염소, 클로랄하이드레이트, 디클로로아세토니트릴,
                      디클로로아세트산, 트리클로로아세트산, 포름알데히드, 염소산
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold text-gray-600">
                      심미적 영향물질
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">
                      16개
                    </td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">
                      경도, 과망간산칼륨소비량, 냄새, 맛, 동, 색도, 세제(ABS),
                      수소이온농도, 아연, 염소이온, 증발잔류물, 철, 망간, 탁도,
                      황산이온, 알루미늄
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">검사 주기</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-primary-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-primary-600 dark:text-primary-400">
                  일반 건물 급수시설
                </h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li>
                    <strong>수돗물 사용:</strong> 연 1회 (59항목)
                  </li>
                  <li>
                    <strong>지하수 사용:</strong> 연 2회 이상 (60항목)
                  </li>
                  <li>
                    <strong>정수처리 사용:</strong> 분기별 1회 (60항목)
                  </li>
                </ul>
              </div>
              <div className="border-2 border-primary-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-primary-600 dark:text-primary-400">
                  소규모 급수시설
                </h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li>
                    <strong>마을상수도:</strong> 반기별 1회
                  </li>
                  <li>
                    <strong>소규모 급수시설:</strong> 연 1회
                  </li>
                  <li>
                    <strong>전용상수도:</strong> 월 1회 이상
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">검사 프로세스</h3>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    1
                  </div>
                  <h4 className="font-bold mb-1">검사 의뢰</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    전화 또는 온라인 신청
                  </p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">
                  →
                </div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    2
                  </div>
                  <h4 className="font-bold mb-1">시료 채취</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    전문인력 현장 방문
                  </p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">
                  →
                </div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    3
                  </div>
                  <h4 className="font-bold mb-1">정밀 분석</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    실험실 정량 분석
                  </p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">
                  →
                </div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                    4
                  </div>
                  <h4 className="font-bold mb-1">성적서 발급</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    결과 통보 및 컨설팅
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 mb-8">
              <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                ✅ 지정검사기관 자격 보유
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                환경부로부터 먹는물 수질검사기관으로 지정받아 공신력 있는 검사
                성적서를 발급합니다.
              </p>
              <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
                <li>• 국제공인시험기관(KOLAS) 인증</li>
                <li>• 최신 분석 장비 (ICP/MS, GC/MS, IC 등) 보유</li>
                <li>• 숙련된 분석 전문인력</li>
              </ul>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">📞 검사 문의 및 신청</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    전화
                  </p>
                  <p className="font-bold text-primary-600">043-237-7624</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    이메일
                  </p>
                  <p className="font-bold text-primary-600">
                    kesri0728@naver.com
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                    팩스
                  </p>
                  <p className="font-bold text-primary-600">043-237-7826</p>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTesting;
