const IndoorAirQuality = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">실내공기질 측정</h1>
          <p className="text-lg">다중이용시설 실내공기질 측정 전문기관</p>
        </div>
      </div>
      
      <div className="section container-custom">
        <div className="card p-8">
          <h2 className="heading-md mb-6">실내공기질 측정 서비스</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              실내공기질 관리법에 따른 다중이용시설의 실내공기질을 측정하고
              개선방안을 제시하는 환경부 지정 측정대행업체입니다.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">측정 대상 시설</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏫</div>
                <h4 className="font-bold text-lg mb-2">교육시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 어린이집 (430㎡ 이상)</li>
                  <li>• 유치원 (430㎡ 이상)</li>
                  <li>• 초·중·고등학교</li>
                  <li>• 학원 (연면적 1,000㎡ 이상)</li>
                </ul>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏥</div>
                <h4 className="font-bold text-lg mb-2">의료시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 종합병원</li>
                  <li>• 병원 (입원실 100개 이상)</li>
                  <li>• 산후조리원</li>
                  <li>• 노인요양시설</li>
                </ul>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl">
                <div className="text-4xl mb-3">🏢</div>
                <h4 className="font-bold text-lg mb-2">다중이용시설</h4>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <li>• 대형마트 (3,000㎡ 이상)</li>
                  <li>• 지하역사, 지하도상가</li>
                  <li>• 철도역사, 공항시설</li>
                  <li>• 도서관, 박물관, 미술관</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">측정 항목 및 유지기준</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">오염물질</th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">단위</th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">유지기준</th>
                    <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">권고기준</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">미세먼지 (PM10)</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">μg/m³</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">100 이하</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">50 이하</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">초미세먼지 (PM2.5)</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">μg/m³</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">50 이하</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">25 이하</td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">이산화탄소 (CO₂)</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">ppm</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">1,000 이하</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">폼알데하이드 (HCHO)</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">μg/m³</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">100 이하</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">총부유세균</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">CFU/m³</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">800 이하</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">일산화탄소 (CO)</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">ppm</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-green-600">10 이하</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                  </tr>
                  <tr className="bg-white dark:bg-neutral-800">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">총휘발성유기화합물 (TVOC)</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">μg/m³</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-blue-600">500 이하</td>
                  </tr>
                  <tr className="bg-neutral-50 dark:bg-neutral-700">
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">라돈 (Rn)</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">Bq/m³</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center">-</td>
                    <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-center font-bold text-blue-600">148 이하</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">측정 주기</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-green-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">신축 건물</h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li><strong>사용승인 전:</strong> 의무 측정</li>
                  <li><strong>사용승인 후:</strong> 연 1회 이상</li>
                  <li><strong>리모델링 시:</strong> 공사 후 즉시 측정</li>
                </ul>
              </div>
              <div className="border-2 border-emerald-500 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-emerald-600 dark:text-emerald-400">기존 건물</h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li><strong>지하역사, 철도역사:</strong> 반기 1회</li>
                  <li><strong>의료시설, 어린이시설:</strong> 연 1회</li>
                  <li><strong>기타 다중이용시설:</strong> 연 1회</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">측정 프로세스</h3>
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">1</div>
                  <h4 className="font-bold mb-1">측정 계획 수립</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">시설 현황 파악</p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">2</div>
                  <h4 className="font-bold mb-1">현장 측정</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">전문장비로 측정</p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">3</div>
                  <h4 className="font-bold mb-1">시료 분석</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">실험실 정밀분석</p>
                </div>
                <div className="text-3xl text-neutral-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1 text-center">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">4</div>
                  <h4 className="font-bold mb-1">결과 보고</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">개선방안 제시</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">공기질 개선 방안</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h4 className="font-bold text-lg mb-3">🌬️ 환기 개선</h4>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• 기계환기장치 설치 및 관리</li>
                  <li>• 자연환기 시간 확보 (1일 3회, 회당 10분)</li>
                  <li>• 공조시스템 필터 정기 교체</li>
                  <li>• 외부공기 도입량 증대</li>
                </ul>
              </div>
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <h4 className="font-bold text-lg mb-3">🧹 오염원 관리</h4>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• 저방출 자재 사용 (친환경 마크)</li>
                  <li>• 실내흡연 금지 철저</li>
                  <li>• 청소 및 먼지 제거</li>
                  <li>• 습도 관리 (30~60%)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 mb-8">
              <h3 className="font-bold text-lg mb-2 text-red-900 dark:text-red-300">
                ⚠️ 기준 초과 시 조치사항
              </h3>
              <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                <li>• 즉시 환기 및 오염원 제거</li>
                <li>• 30일 이내 개선 후 재측정</li>
                <li>• 개선계획 수립 및 이행</li>
                <li>• 이용자에게 측정결과 공개 (게시)</li>
              </ul>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">전문 측정 장비 보유</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">광산란법 측정기 (DustTrak)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">PM10, PM2.5 실시간 측정</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">NDIR CO₂ 측정기</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">이산화탄소 연속 측정</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">HPLC (고성능액체크로마토그래피)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">폼알데하이드 정밀 분석</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">GC/MS (가스크로마토그래프)</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">TVOC 성분 분석</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndoorAirQuality;
