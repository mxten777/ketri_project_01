// No JS-based header offset; anchors handled via CSS :target

import ServiceCta from "../../components/common/ServiceCta";

const WaterTesting = () => {
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }

  return (
    <main className="min-h-screen">
      <section data-has-hero className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">먹는물 수질검사</h1>
          <p className="text-lg">
            환경부 지정 수질검사기관으로 60여개 항목 수질검사 서비스를 제공합니다. 먹는물관리법과 수돗물법에 따른 정확하고 신속한 분석으로 안전한 먹는물을 책임집니다.
          </p>
        </div>
      </section>

      <div className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-6 sticky top-32 card-tokenized">
              <h3 className="font-bold text-lg mb-2">먹는물 검사</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
              <nav className="space-y-2">
                {[
                  { label: "업무소개", href: "#introduction" },
                  { label: "수질검사대상 및 범위", href: "#scope" },
                  { label: "수질검사주기 및 수수료", href: "#schedule" },
                  { label: "검사의뢰 신청절차", href: "#procedure" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
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
            <div className="card p-8 card-tokenized">
              <h2 id="introduction" className="heading-md mb-6">먹는물 수질검사 서비스</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                  한국환경안전연구소는 금강유역환경청 지정 수질검사기관으로 2006년부터 200,000 여건의 수질검사를 수행했습니다. ISO/IEC 17025 국제 표준에 따른 품질관리 시스템으로 60여개 항목의 정확하고 신속한 수질검사 서비스를 제공합니다.
                </p>

                <h3 id="scope" className="text-2xl font-bold mt-8 mb-4">수질검사대상 및 범위</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-neutral-800 dark:to-neutral-800 rounded-xl">
                    <div className="text-4xl mb-3">🏢</div>
                    <h4 className="font-bold text-lg mb-2">건물 급수시설</h4>
                    <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                      <li>• 아파트, 오피스텔</li>
                      <li>• 상업용 빌딩</li>
                      <li>• 학교, 병원</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-neutral-800 dark:to-neutral-800 rounded-xl">
                    <div className="text-4xl mb-3">💧</div>
                    <h4 className="font-bold text-lg mb-2">소규모 급수시설</h4>
                    <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                      <li>• 마을상수도</li>
                      <li>• 소규모 급수시설</li>
                      <li>• 전용상수도</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-indigo-50/50 to-cyan-50/50 dark:from-neutral-800 dark:to-neutral-800 rounded-xl">
                    <div className="text-4xl mb-3">🏭</div>
                    <h4 className="font-bold text-lg mb-2">지하수</h4>
                    <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                      <li>• 농, 공업용관정</li>
                      <li>• 생활용수</li>
                      <li>• 개인주택</li>
                      <li>• 집단급식소, 식품접객업소</li>
                      <li>• 식품, 음료 생산시설</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">수질검사주기 및 수수료</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-neutral-200 dark:bg-neutral-700">
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">분류</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사주기</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사항목</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">금액</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">시료량<br/>(무균채수병)</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-bold">급수설비</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">저수조<br/>년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">62,680</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">지역별 상이</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">급수관<br/>2년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">7</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">69,220</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-bold">지하수</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수<br/>2년 1회 이상</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">327,470</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                        <td rowSpan={10} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-xs">물조로 지역별 가수율 상이</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">생활용수<br/>3년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">20</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">184,580</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2L</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">농/공/어업<br/>3년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">15</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">153,340</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={4} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-bold">먹는물</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">먹는샘물<br/>(제조수)</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">52</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">413,160</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">샘물 (원수)</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">48</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">389,180</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">먹는물<br/>공동시설<br/>분기1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">47</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">369,710</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">정수기</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">26,620</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">130ml</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-bold">실용에<br/>사용되는<br/>수도<br/>(지하수)</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">실용에관련<br/>용도 (월1회)<br/>년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">12</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">91,080</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={2}>2년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">327,470</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">327,470</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td colSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-bold text-center">수영장수</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">9</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">77,110</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-xs">물조로 지역별 수수</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td colSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-bold text-center">수경시설</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right">51,700</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 id="procedure" className="text-2xl font-bold mt-8 mb-4">검사의뢰 신청절차</h3>
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-center">
                      <div className="w-20 h-20 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">1</div>
                      <h4 className="font-bold mb-1">검사 의뢰</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">전화 또는 온라인 신청</p>
                    </div>
                    <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">→</div>
                    <div className="flex-1 text-center">
                      <div className="w-20 h-20 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">2</div>
                      <h4 className="font-bold mb-1">시료 채취</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">전문인력 현장 방문</p>
                    </div>
                    <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">→</div>
                    <div className="flex-1 text-center">
                      <div className="w-20 h-20 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">3</div>
                      <h4 className="font-bold mb-1">정밀 분석</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">실험실 정량 분석</p>
                    </div>
                    <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">→</div>
                    <div className="flex-1 text-center">
                      <div className="w-20 h-20 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">4</div>
                      <h4 className="font-bold mb-1">성적서 발급</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">결과 통보 및 컨설팅</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-neutral-800 border-l-4 border-blue-500 p-6 mb-8">
                  <h3 className="font-bold text-lg mb-2 text-blue-900 dark:text-neutral-100">✅ 지정검사기관 자격 보유</h3>
                  <p className="text-neutral-700 dark:text-neutral-200 mb-2">환경부로부터 먹는물 수질검사기관으로 지정받아 공신력 있는 검사 성적서를 발급합니다。</p>
                  <ul className="space-y-1 text-neutral-700 dark:text-neutral-200 text-sm">
                    <li>• 최신 분석 장비 (ICP/MS, GC/MS, IC 등) 보유</li>
                    <li>• 숙련된 분석 전문인력</li>
                  </ul>
                </div>

                <ServiceCta message="수질검사 문의가 필요하신가요?" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WaterTesting;
