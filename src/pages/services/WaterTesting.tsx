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
            환경부 지정 수질검사기관으로 60여 개 항목 수질검사 서비스를 제공합니다. 먹는물관리법과 수돗물법에 따른 정확하고 신속한 분석으로 안전한 먹는물을 책임집니다.
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
                  한국환경안전연구소는 금강유역환경청 지정 수질검사기관으로 2006년부터 20만여 건의 수질검사를 수행했습니다. ISO/IEC 17025 국제 표준에 따른 품질관리 시스템으로 60여 개 항목의 정확하고 신속한 수질검사 서비스를 제공합니다.
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

                <h3 id="schedule" className="text-2xl font-bold mt-8 mb-4">수질검사주기 및 수수료</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-primary-600 text-white">
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">관련법령</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사대상</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사종류</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사주기</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">검사항목</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수수료<br/>(VAT포함)</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">시료량<br/>(무균채수병)</th>
                        <th className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 수도법 제33조 */}
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">수도법 제33조</td>
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">대형건축물<br/>소유주 및 관리자</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">저수조</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">62,680</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 align-middle">지역별, 개수별<br/>수수료 상이</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">급수관</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">7</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">69,220</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      </tr>

                      {/* 지하수법 제20조 */}
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">지하수법 제20조</td>
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">지하수관정 소유주 및<br/>이용자</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2년 1회 이상</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">294,470</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                        <td rowSpan={11} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 align-middle">시료채취비 별도</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">생활용수</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">3년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">20</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">151,580</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">농/공/어업용수</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">3년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">15</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">120,340</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      </tr>

                      {/* 먹는물 관리법 */}
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">먹는물 관리법</td>
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">지자체 등</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">먹는샘물 (제품수)</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">52</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">380,160</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">샘물 (원수)</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">48</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">356,180</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6L</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">먹는물 공동시설</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">분기1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">47</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">336,710</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>

                      {/* 수도법 제29조 */}
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">수도법 제29조</td>
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수도사업자 등</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수도수 59항목</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">59</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">359,040</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수도수 60항목</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">60</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">370,700</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>

                      {/* 식품위생법 */}
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">식품위생법</td>
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">식품접객업소 및<br/>집단급식소</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수 12항목</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">12</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">58,080</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2L</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수 46항목</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2년 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">294,470</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">식품 및 접가물제조,<br/>가공업자</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수 46항목</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">년 1회<br/>음료는 반기 1회</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">294,470</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      </tr>

                      {/* 체육시설의 설치이용 관련 법률 */}
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">체육시설의<br/>설치이용에 관한 법률</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">시설 관리자 등</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수영장수</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">9</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">77,110</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2"></td>
                      </tr>

                      {/* 물환경보전법 */}
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">물환경보전법</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">시설 관리자 등</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수경시설</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">51,700</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">출장료 별도<br/>지역별 상이</td>
                      </tr>

                      {/* 기타 */}
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">정수기</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-right font-bold text-primary-600">26,620</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">130ml</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">출장료 별도<br/>지역별, 개수별 상이</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-xl font-bold mt-8 mb-4">먹는물 수질감시항목 외</h4>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-primary-600 text-white">
                        <th colSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">분석항목명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold text-center">유해영향<br/>무기물질</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Antimony</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Molybdenum</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Perchlorate</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td rowSpan={21} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold text-center align-top">유해영향<br/>유기물질</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Vinyl Chloride</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Styrene</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Chloroethane</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Bromoform</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Chlorophenol</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2,4-Dichlorophenol</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Pentachlorophenol</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2,4,6-Trichlorophenol</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Di-2(ethylhexyl)phthalate</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Di-2(ethylhexyl)adipate</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Polychlorinated Biphenyls(PCBs)</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">유기인</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">1,2-Dichloroethane</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Hexachlorobenzene</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Benzo(a)pyrene</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Microcystins 6종(Microcystin-LR, RR, YR, LA, LY, LF)</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2,4-D</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Alachlor</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">PFOS(Perfluorooctane sulfonate)</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">PFOA(Perfluorooctanoic acid)</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">PFHxS(Perfluorohexane sulfonic acid)</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td rowSpan={5} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold text-center align-top">소독<br/>부산물</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Chlorate</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Ethylendibromide</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Bromochloroacetonitrile</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Monobromoacetic acid</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Monochloroacetic acid</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td rowSpan={3} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold text-center align-top">심미적<br/>영향물질</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Geosmin</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">2-Methyl isoborneol(2-MIB)</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">부식성 지수(LI)</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold text-center">자연방사성물질</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">Radon</td>
                      </tr>
                      <tr className="bg-neutral-50 dark:bg-neutral-700">
                        <td rowSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold text-center align-top">미생물</td>
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">엔도톡신</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">생균수</td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <td colSpan={2} className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center italic text-neutral-600 dark:text-neutral-400">그 외 미지물질도 가능하오니 연락바랍니다.</td>
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
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">실험실 정성, 정량 분석</p>
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
                  <p className="text-neutral-700 dark:text-neutral-200 mb-2">환경부로부터 먹는물 수질검사기관으로 지정받아 공신력 있는 검사 성적서를 발급합니다.</p>
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
