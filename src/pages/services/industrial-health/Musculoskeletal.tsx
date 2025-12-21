import Button from "../../../components/common/Button";

const Musculoskeletal = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              근골격계 유해요인조사
            </h1>
            <p className="text-lg text-white/90">
              산업안전보건법에 따른 근골격계부담작업 유해요인조사로 근로자의 건강장해를 예방합니다
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="card p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">근골격계 유해요인조사란?</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                근골격계질환은 반복적인 동작, 부적절한 작업자세, 무리한 힘의 사용, 날카로운 면과의 신체접촉, 
                진동 및 온도 등의 요인에 의하여 발생하는 건강장해로서, 목, 어깨, 허리, 팔·다리의 신경·근육 
                및 그 주변 신체조직 등에 나타나는 질환을 말합니다.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4">조사 대상</h3>
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-6 mb-8 border border-primary-100 dark:border-primary-800">
                <h4 className="font-semibold mb-3 text-neutral-900 dark:text-white">근골격계부담작업 11종</h4>
                <ul className="space-y-2 text-neutral-700 dark:text-neutral-200">
                  <li>• 하루에 4시간 이상 집중적으로 자료입력 등을 위해 키보드 또는 마우스를 조작하는 작업</li>
                  <li>• 하루에 총 2시간 이상 목, 어깨, 팔꿈치, 손목 또는 손을 사용하여 같은 동작을 반복하는 작업</li>
                  <li>• 하루에 총 2시간 이상 머리 위에 손이 있거나, 팔꿈치가 어깨 위에 있거나, 팔꿈치를 몸통으로부터 들거나, 팔꿈치를 몸통 뒤쪽에 위치하도록 하는 상태에서 이루어지는 작업</li>
                  <li>• 지지되지 않은 상태이거나 임의로 자세를 바꿀 수 없는 조건에서, 하루에 총 2시간 이상 목이나 허리를 구부리거나 트는 상태에서 이루어지는 작업</li>
                  <li>• 하루에 총 2시간 이상 쪼그려 앉거나 무릎을 굽힌 자세에서 이루어지는 작업</li>
                  <li>• 하루에 총 2시간 이상 지지되지 않은 상태에서 1kg 이상의 물건을 한 손의 손가락으로 집어 올리거나, 2kg 이상에 상응하는 힘을 가하여 한 손의 손가락으로 물건을 쥐는 작업</li>
                  <li>• 하루에 총 2시간 이상 지지되지 않은 상태에서 4.5kg 이상의 물건을 한 손으로 들거나 동일한 힘으로 쥐는 작업</li>
                  <li>• 하루에 10회 이상 25kg 이상의 물체를 드는 작업</li>
                  <li>• 하루에 25회 이상 10kg 이상의 물체를 무릎 아래에서 들거나, 어깨 위에서 들거나, 팔을 뻗은 상태에서 드는 작업</li>
                  <li>• 하루에 총 2시간 이상, 분당 2회 이상 4.5kg 이상의 물체를 드는 작업</li>
                  <li>• 하루에 총 2시간 이상 시간당 10회 이상 손 또는 무릎을 사용하여 반복적으로 충격을 가하는 작업</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">조사 시기</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-200 dark:border-primary-800 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3 text-primary-600 dark:text-primary-300">정기조사</h4>
                  <p className="text-neutral-600 dark:text-neutral-200">
                    근골격계부담작업이 있는 사업장은 <strong>3년마다 1회 이상</strong> 정기적으로 유해요인조사를 실시해야 합니다.
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/30 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-3 text-orange-600 dark:text-orange-300">수시조사</h4>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-200 text-sm">
                    <li>• 법에 따른 임시건강진단 등에서 근골격계질환자가 발생한 경우</li>
                    <li>• 근골격계부담작업에 해당하는 새로운 작업·설비를 도입한 경우</li>
                    <li>• 근골격계부담작업에 해당하는 업무의 양과 작업공정 등 작업환경을 변경한 경우</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">조사 내용</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">설비·작업공정·작업량·작업속도 등 작업장 상황</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">작업환경 전반에 대한 조사</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">작업시간·작업자세·작업방법 등 작업조건</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">근로자의 실제 작업 방식 분석</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">작업과 관련된 근골격계질환 징후와 증상 유무</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">근로자 건강 상태 파악</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">조사 방법</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-left">구분</th>
                      <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-left">내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">체크리스트</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">근골격계부담작업 유무 판단 및 기본 정보 수집</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">증상설문조사</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">근로자의 근골격계 증상 유무 및 정도 파악</td>
                    </tr>
                    <tr className="bg-white dark:bg-neutral-800">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">인간공학적 평가</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">REBA, RULA, OWAS, NLE 등 표준화된 평가도구 활용</td>
                    </tr>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3 font-bold">작업분석</td>
                      <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3">작업동작 촬영 및 분석, 작업부하 측정</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-secondary-50 to-accent-50 dark:from-secondary-900/20 dark:to-accent-900/20 border-l-4 border-secondary-500 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 flex items-center text-neutral-900 dark:text-white">
                  <span className="text-2xl mr-2">📋</span>
                  개선 권고사항 제공
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  조사 결과를 바탕으로 작업공정 개선, 작업자세 교정, 보조기구 도입 등 
                  실질적이고 구체적인 개선방안을 제시하여 근골격계질환 예방에 기여합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Musculoskeletal;
