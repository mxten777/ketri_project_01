import Button from "../../../components/common/Button";

const DialysisSampling = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              채수 방법 및 위치
            </h1>
            <p className="text-lg text-white/90">
              정확한 검사를 위한 올바른 시료 채취 방법을 안내합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">채수 위치</h2>
              
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl mb-8">
                <h3 className="font-bold text-lg mb-4 text-primary-900 dark:text-primary-300">
                  채수 지점 선정 원칙
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                  투석 환자에게 실제로 공급되는 물과 동일한 수질을 확인하기 위해 
                  투석기 직전 지점에서 시료를 채취하는 것이 원칙입니다.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-primary-500">
                  <h3 className="font-bold text-lg mb-3">1차 채수 지점 (필수)</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                    <strong>투석기 공급 라인 (개별 투석기 직전)</strong>
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• 투석기에 연결되기 직전의 배관 말단</li>
                      <li>• 혈액회로 연결 전 채취</li>
                      <li>• 실제 투석 시 사용되는 수질 확인</li>
                      <li>• 각 투석 구역별 1개소 이상 채취 권장</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-l-4 border-gray-500">
                  <h3 className="font-bold text-lg mb-3">2차 채수 지점 (권장)</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                    <strong>정수장치 출구</strong>
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                      <li>• R.O (역삼투) 장치 직후</li>
                      <li>• 정수시스템 성능 평가</li>
                      <li>• 배관 오염도 확인 가능</li>
                      <li>• 문제 발생 시 원인 파악에 유용</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">채수 방법</h2>
              
              <h3 className="text-xl font-bold mb-4">화학적 검사 시료 채취</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">사전 준비</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 멸균 1L 플라스틱 용기 준비</li>
                        <li>• 알코올 솜 준비</li>
                        <li>• 일회용 장갑 착용</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">수도꼭지 소독</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 알코올 솜으로 수도꼭지 외부를 닦음</li>
                        <li>• 특히 물이 나오는 부분을 중점적으로 소독</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">방류</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 수도꼭지를 완전히 열어 5~10분간 방류</li>
                        <li>• 배관 내 정체된 물 제거</li>
                        <li>• 방류 시간이 짧으면 부정확한 결과 초래</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">시료 채취</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 용기 뚜껑을 열고 직접 채수</li>
                        <li>• 용기를 물로 헹구지 않음</li>
                        <li>• 용기 입구가 수도꼭지나 다른 물체에 닿지 않도록 주의</li>
                        <li>• 약 800mL~1L 채취 (여유 공간 남김)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">밀봉 및 표시</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 뚜껑을 단단히 닫음</li>
                        <li>• 병원명, 채취 위치, 채취 일시 기재</li>
                        <li>• 보냉백에 넣어 실온 보관</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">미생물 검사 시료 채취</h3>
              <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-6">
                <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-300">⚠️ 주의: 무균 조작 필수</h4>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                  미생물 검사는 외부 오염에 매우 민감하므로 엄격한 무균 조작이 필요합니다.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">사전 준비</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 멸균 120mL 용기 준비</li>
                        <li>• 알코올 솜, 토치 (알코올 램프) 준비</li>
                        <li>• 멸균 장갑 착용</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">수도꼭지 화염 소독</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 알코올 솜으로 닦은 후 토치로 화염 소독</li>
                        <li>• 또는 70% 알코올 분무 후 충분히 건조</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">충분한 방류</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 5~10분간 충분히 방류</li>
                        <li>• 미생물 검사는 방류 시간이 더욱 중요</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">무균 채취</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 용기 뚜껑을 벗기지 말고 뚜껑만 살짝 엶</li>
                        <li>• 용기 입구가 수도꼭지 외에는 아무것도 닿지 않게 주의</li>
                        <li>• 약 100~120mL 채취</li>
                        <li>• 즉시 뚜껑을 단단히 닫음</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border-2 border-gray-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">냉장 보관 및 신속 이송</h4>
                      <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• 즉시 아이스팩과 함께 보냉백에 보관</li>
                        <li>• 4℃ 냉장 상태 유지</li>
                        <li>• 채취 후 24시간 이내 실험실 도착 필수</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-12">채수 시 주의사항</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-primary-700 dark:text-primary-300">✅ 해야 할 것</h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 투석 직전 또는 투석 중 채취</li>
                    <li>• 충분한 방류 후 채취</li>
                    <li>• 멸균 용기 사용</li>
                    <li>• 냉장 보관 및 신속 이송</li>
                    <li>• 채취 정보 상세 기록</li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">❌ 하지 말아야 할 것</h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
                    <li>• 방류 없이 바로 채취</li>
                    <li>• 용기를 물로 헹굼</li>
                    <li>• 용기 입구를 손으로 만짐</li>
                    <li>• 장시간 실온 방치</li>
                    <li>• 채취 후 48시간 이상 경과</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6">
                <h3 className="font-bold text-lg mb-2 text-primary-900 dark:text-primary-300">
                  📞 채수 교육 및 문의
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                  정확한 채수 방법에 대한 현장 교육을 제공합니다. 
                  요청 시 전문 채수요원이 직접 방문하여 시료를 채취해 드립니다.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">전화:</span>
                    <span className="ml-2 font-bold">02-1234-5678</span>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">이메일:</span>
                    <span className="ml-2 font-bold">dialysis@ketri.co.kr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DialysisSampling;
