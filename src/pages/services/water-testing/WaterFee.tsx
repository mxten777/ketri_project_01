 
const WaterFee = () => {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section data-has-hero className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">검사 주기 및 수수료</h1>
            <p className="text-lg text-white/90">
              시설 유형별 수질검사 주기와 검사 수수료를 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">수질검사 주기 및 수수료</h2>
              
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
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold" rowSpan={2}>수도법 제33조</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={2}>대형건기숙물<br/>소유주 및 관리자</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">저수조</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">62,680</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={2}>지역별, 개수별<br/>수수료 상이</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">급수관</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">7</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">69,220</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                    </tr>

                    {/* 지하수법 제20조 */}
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold" rowSpan={3}>지하수법 제20조</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={3}>지하수관정 소유주 및<br/>이용자</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2년 1회 이상</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">294,470</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={3}></td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">생활용수</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">3년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">20</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">151,580</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">농/공/어업용수</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">3년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">15</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">120,340</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                    </tr>

                    {/* 먹는물 관리법 */}
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold" rowSpan={3}>먹는물 관리법</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={3}>지자체 등</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">먹는샘물 (제품수)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">52</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">380,160</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6L</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={3}>시료제출비 별도</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">샘물 (원수)</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">48</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">356,180</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">6L</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">먹는물 공동시설</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">분기1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">47</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">336,710</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                    </tr>

                    {/* 수도법 제29조 */}
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold" rowSpan={2}>수도법 제29조</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={2}>수도사업자 등</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수도수 59항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">59</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">359,040</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={2}></td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수도수 60항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">60</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">370,700</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                    </tr>

                    {/* 식품위생법 */}
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold" rowSpan={3}>식품위생법</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={2}>식품접객업소 및<br/>집단급식소</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수 12항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">12</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">58,080</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2L</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2" rowSpan={3}></td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수 46항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2년 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">294,470</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">식품 및 접가물제조,<br/>가공업자</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">음용수 46항목</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">년 1회<br/>음료는 반기 1회</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">46</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">294,470</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4L</td>
                    </tr>

                    {/* 제조시설의 설치이용 관련 법률 */}
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">제조시설의<br/>설치이용 관련 법률</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">시설 관리자 등</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수영장수</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">9</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">77,110</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2"></td>
                    </tr>

                    {/* 물환경보전법 */}
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">물환경보전법</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">시설 관리자 등</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">수영시설</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">4</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">51,700</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">1L</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">출장료 별도<br/>지역별 상이</td>
                    </tr>

                    {/* 기타 */}
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 font-semibold">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">정수기</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">-</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">2</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center font-bold text-primary-600">26,620</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2 text-center">130ml</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-3 py-2">출장료 별도<br/>지역별, 개수별 상이</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-8">
                <h3 className="font-bold text-lg mb-2 text-yellow-900 dark:text-yellow-300">⚠️ 검사 주기 준수 의무</h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  각 관련 법령에 따라 정기적인 수질검사를 실시하지 않을 경우 과태료가 부과될 수 있습니다.
                  정확한 검사 주기는 시설 유형과 관할 지자체에 따라 다를 수 있으니 문의 바랍니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-primary-900 dark:text-primary-300">
                    💰 수수료 안내
                  </h3>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <li>• 모든 금액은 VAT 포함 가격입니다</li>
                    <li>• 시료 채취비는 별도 협의</li>
                    <li>• 지역별로 출장료 상이</li>
                    <li>• 개수별 할인 가능</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <h3 className="font-bold text-lg mb-3 text-primary-900 dark:text-primary-300">📋 포함 사항</h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 현장 시료 채취 (일부 항목)</li>
                    <li>• 실험실 정밀 분석</li>
                    <li>• 시험성적서 발급</li>
                    <li>• 전문가 상담 서비스</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-cyan-900 dark:text-cyan-300">
                    🎯 특별 할인
                  </h3>
                  <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                    <li>• 연간 계약: 10~15% 할인</li>
                    <li>• 다수 시설: 5~10% 할인</li>
                    <li>• 정기 검사 계약: 특별 할인</li>
                    <li>• 재검사 1회 무료 (부적합 시)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  📞 정확한 견적 문의
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  시설 유형, 규모, 검사 항목에 따라 수수료가 달라질 수 있습니다.<br/>
                  정확한 견적 및 검사 일정은 전화 또는 온라인 문의를 통해 안내해 드립니다.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">전화:</span>
                    <span className="ml-2 font-bold text-primary-600">042-861-4567</span>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">팩스:</span>
                    <span className="ml-2 font-bold">042-861-4568</span>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">이메일:</span>
                    <span className="ml-2 font-bold">kesri@kesri.co.kr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WaterFee;
