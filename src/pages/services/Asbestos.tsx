 
// No JS-based header offset; anchors handled via CSS :target
import ServiceCta from "../../components/common/ServiceCta";
import { getMenuItemsByPath } from "../../constants/menu";

const Asbestos = () => {
  const menuItems = getMenuItemsByPath("/services/asbestos");
  // Anchors are handled by CSS :target { scroll-margin-top: var(--app-header-h); }

  return (
    <main className="min-h-screen">
      <section data-has-hero className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            석면조사 및 분석
          </h1>
          <p className="text-lg lg:text-xl opacity-95 max-w-3xl">
            고용노동부 지정 석면조사기관으로 산업안전보건법 및 석면안전관리법에 따른 전문적이고 체계적인 석면 안전관리 서비스를 제공합니다
          </p>
        </div>
      </section>

      <div className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="card p-6 sticky top-32 card-tokenized">
              <h3 className="font-bold text-lg mb-2">석면조사</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">세부 서비스</p>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const hash = item.path.includes('#') ? `#${item.path.split('#')[1]}` : item.path;
                  return (
                    <a
                      key={hash}
                      href={hash}
                      className="block px-4 py-3 rounded-lg text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card p-8 card-tokenized">
              <h2 id="survey" className="heading-md mb-6">석면조사·분석 서비스</h2>
              <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              한국환경안전연구소는 고용노동부 지정 석면조사기관으로 2006년부터 다양한 현장에서의 노하우를 바탕으로 석면 관리 컨설팅을
              수행해 왔습니다. 석면안전관리법, 산업안전보건법 등 관련 법령에 따른 전문적이고 체계적인 석면 안전관리 서비스를 제공합니다.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-8">
              <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">
                ● 석면조사(산업안전보건법-고용노동부) - 산업안전보건법 제119조
              </h3>
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mt-4">
                <h4 className="font-bold text-base mb-2 flex items-center text-gray-900 dark:text-gray-300">
                  <span className="text-green-600 dark:text-green-400 mr-2">📋</span>
                  석면조사
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  해당건축물이나 설비에 석면이 함유되어 있는지의 여부, 함유된 석면의 종류 및 함유량, 함유 제품의 위치 및 면적을 
                  파악하기 위한 조사로서 일정규모 이상의 건축물 또는 설비를 철거 · 해체하고자 하려는 자는 지정 석면조사기관을 통해 
                  석면조사를 실시 한 후 그 결과를 기록 · 보존하여야 함
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-300">
                ● 석면조사대상(산업안전보건법-고용노동부) - 산업안전보건법 제119조
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  과태료 : 기관석면조사대상 5천만원 이하 / 일반석면조사대상 300만원 이하
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-bold text-base mb-3 text-primary-600 dark:text-primary-400">기관석면조사대상</h4>
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li>• <strong>일반건축물(주택 제외):</strong> 연면적 합계가 50㎡ 이상이면서, 그 건축물의 철거·해체하려는 부분의 면적 합계가 50㎡ 이상</li>
                    <li>• <strong>주택:</strong> 연면적 합계가 200㎡ 이상이면서, 그 주택의 철거·해체하려는 부분의 면적 합계가 200㎡ 이상</li>
                    <li>• <strong>설비:</strong> 단열재, 보온재, 내화피복재 등을 사용한 면적의 합이 15㎡ 이상 또는 그 부피의 합이 1㎥ 이상</li>
                    <li>• <strong>파이프:</strong> 길이의 합이 80m 이상이면서, 그 파이프의 철거·해체하려는 부분의 보온재로 사용된 길이의 합이 80m 이상</li>
                  </ul>
                </div>
                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-bold text-base mb-3 text-gray-600 dark:text-gray-400">일반석면조사대상</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">기관석면조사 대상 이외의 건축물 및 설비</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-300">
                ● 석면조사대상(석면안전관리법-기후에너지환경부) - 석면안전관리법 제21조
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  과태료 : 2천만원 이하
                </p>
              </div>

              <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• 연면적이 500㎡ 이상인 건축물</li>
                <li>• 국회, 법원, 헌법재판소 등 중앙행정기관 및 그 소속 기관과 지방자치단체가 소유 및 사용하는 건축물</li>
                <li>• 공공기관이 사용하는 건축물</li>
                <li>• 특별법에 따라 설립된 특수법인이 소유 및 사용하는 건축물</li>
                <li>• 지방공기업법에 따른 지방공사 및 지방공단이 소유 및 사용하는 건축물</li>
                <li>• 영유아 보육법에 따른 어린이집, 유아교육법에 따른 유치원, 초중등교육법에 따른 학교, 고등교육법에 따른 학교 및 아동복지법에 따른 지역아동센터</li>
                <li>• 불특정 다수인이 사용하는 다중이용시설 건축물 (지하역사, 지하도상가, 철도역사 대합실 등)</li>
                <li>• 문화 및 집회시설, 의료시설, 노유자시설</li>
              </ul>
            </div>

            {/* 석면농도측정 섹션 */}
            <div className="mt-12 mb-8">
              <h2 id="concentration" className="heading-md mb-6">석면농도측정</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">
                    ● 석면농도측정(산업안전보건법-고용노동부) - 산업안전보건법 제124조
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                    <strong>과태료:</strong> 3백만원이하
                  </p>
                  <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                    <li>• 석면해체제거자는 석면의 제거작업이 완료된 후 해당작업장의 공기 중 석면농도가 고용노동부령으로 정하는 허용기준 0.01개/CC 미만이 되도록 하고 그렇지 않으면 고용노동부 장관에게 제출하여야 한다</li>
                    <li>• 측정대상: 건축물 부착 시(실내)에 석면해체작업이 있을 시</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 석면비산정도측정 섹션 */}
            <div className="mt-12 mb-8">
              <h2 id="dispersion" className="heading-md mb-6">석면비산정도측정</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">
                    ● 석면비산정도측정(석면안전관리법-기후에너지환경부) - 석면안전관리법 제28조
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                    <strong>과태료:</strong> 석면비산정도를 미측정시 : 5백만원이하 / 석면비산정도 측정결과의 미제출 또는<br/>
                    거짓으로 제출시 : 200만원이하
                  </p>
                  <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                    <li>• 석면 해체·제거 작업이나 석면 해체·제거 작업을 수반하는 건축물 해체 시 공기 중 석면농도가 허용기준 0.01개/CC를 초과하지 않도록 석면의 비산정도를 측정하고 그 결과를 통지하여야 한다</li>
                    <li>• 측정대상: 공사규모 석면면적이 500제곱미터 이상</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 석면해체제거감리 섹션 */}
            <div className="mt-12 mb-8">
              <h2 id="supervision" className="heading-md mb-6">석면해체제거감리</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">
                    ● 석면해체제거감리(석면안전관리법-기후에너지환경부) - 석면안전관리법 제30조
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                    <strong>과태료:</strong> 업무 미수행시 : 3백만원이하 / 다음각호 위반시 : 1년 이하의 징역 또는 1천만원 이하의 벌금
                  </p>
                  <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                    <li>• 발주자는 석면해체 제거작업을 결산 전까지 석면해체 제거작업의 안전한 관리를 위하여 석면해체 제거작업의 감리인을 지정하여야 한다</li>
                    <li>• 감리대상</li>
                    <li className="ml-4">-- 일반감리대상: 석면제거 800제곱미터 이상 2,000제곱미터 미만</li>
                    <li className="ml-4">-- 고급감리대상: 석면면적이 2,000제곱미터 이상</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 석면건축물 위해성평가 섹션 */}
            <div className="mt-12 mb-8">
              <h2 id="risk-assessment" className="heading-md mb-6">석면건축물 위해성평가</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">
                    ● 석면건축물 위해성평가(석면안전관리법-기후에너지환경부) - 석면안전관리법 시행령 제33조
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                    <strong>과태료:</strong> 1천만원이하
                  </p>
                  <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                    <li>• 석면건축물의 소유자는 관할청 제23조제2항에따라 시행령 제33조에 따른 석면건축물의 손상 상태 및 석면의 비산 가능성 등을 조사하여 관리인을 선임하여야 한다</li>
                    <li>• 석면조사기관(석면건축물공기질측정자 제외) 및 석면해체제거업자에게 의뢰할 할 수 있다</li>
                    <li>• 위해성평가기간시 : 석면의 면적이 50제곱미터 이상인 석면건축물</li>
                    <li>• 위해성평가주기 : 6개월마다(6개월이 되는 날의 최하는 달의 말일까지)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 석면건축물 공기질측정 섹션 */}
            <div className="mt-12 mb-8">
              <h2 id="air-quality" className="heading-md mb-6">석면건축물 공기질측정</h2>
              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-300">
                    ● 석면건축물공기질측정(석면안전관리법-기후에너지환경부) - 석면안전관리법 시행령 제33조
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                    <strong>과태료:</strong> 5백만원이하
                  </p>
                  <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                    <li>• 석면건축물의 소유자는 석면건축물에 대하여 실내공기 중 석면농도를 측정하도록 한 후... 그 결과를 기준으로 하고 석면농도가 0.01개/CC 초과 시 보수, 밀봉, 구역의 관리조치를 취하여야 한다</li>
                    <li>• 석면건축물공기질측정대상: 석면의 면적이 50제곱미터 이상인 석면건축물</li>
                    <li>• 석면건축물공기질측정주기 : 2년마다(매 2년이 되는 해의 1월 1일 2일까지 발부받는다)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA 섹션 */}
            <div className="mt-12">
              <ServiceCta message="석면조사 문의가 필요하신가요?" />
            </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Asbestos;
