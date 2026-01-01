import { useState } from "react";
import { Container, Section, Card, CardHeader, CardTitle, CardContent, CardFooter, Input } from "@/components/ui";
import Button from "@/components/common/Button";

const classify = (text: string) => {
  const t = text.toLowerCase();
  if (/견적|가격|단가|견적서/.test(t)) return "견적 문의";
  if (/시험|검사|분석|테스트/.test(t)) return "시험/분석 문의";
  if (/인증|인증서|인증절차/.test(t)) return "인증 문의";
  return "기타 문의";
};

const suggestServices = (text: string) => {
  const t = text.toLowerCase();
  const services = [] as string[];
  if (/수질|water|물/.test(t)) services.push("수질/물 관련 시험");
  if (/공기|미세먼지|indoor|공기질/.test(t)) services.push("실내공기질 검사");
  if (/석면|asbestos/.test(t)) services.push("석면 관련 검사");
  if (/건강|work|근골격/.test(t)) services.push("산업보건/작업환경 검사");
  if (services.length === 0) services.push("일반 분석/시험 상담 필요");
  return services;
};

const checkMissing = (text: string, sample?: string, purpose?: string, date?: string) => {
  const missing: string[] = [];
  if (!text || text.trim().length < 10) missing.push("문의 요약(더 자세한 설명 필요)");
  if (!sample) missing.push("시료/제품 종류");
  if (!purpose) missing.push("문의 목적(견적/시험/인증 등)");
  if (!date) missing.push("희망 일정");
  return missing;
};

export default function AiOps() {
  const [query, setQuery] = useState("");
  const [sample, setSample] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");

  const [results, setResults] = useState<null | {
    category: string;
    services: string[];
    missing: string[];
    nextAction: string;
    draft?: string;
  }>(null);

  const run = () => {
    if (!query.trim()) return;
    const category = classify(query);
    const services = suggestServices(query);
    const missing = checkMissing(query, sample, purpose, date);
    const nextAction = missing.length
      ? `추가정보 요청: ${missing.join(", ")}`
      : "운영자 검토 후 담당 부서에 전달(견적/시험 접수)";
    
    // 답변 초안 생성
    let draft = "안녕하세요. 한국환경안전연구소입니다.\n문의 주신 내용을 확인했습니다.\n\n";

    // 문의 유형 요약
    if (category === "견적 문의") {
      draft += "시험 분석 및 견적과 관련하여 문의하신 것으로 확인됩니다. ";
    } else if (category === "시험/분석 문의") {
      draft += "시험 및 분석 서비스와 관련하여 문의하신 것으로 확인됩니다. ";
    } else if (category === "인증 문의") {
      draft += "인증 절차 및 관련 시험에 대해 문의하신 것으로 확인됩니다. ";
    } else {
      draft += "문의하신 내용을 검토했습니다. ";
    }

    // 관련 서비스 안내
    if (services.length > 0 && services[0] !== "일반 분석/시험 상담 필요") {
      draft += `문의 내용을 바탕으로 ${services[0]}이(가) 관련될 수 있을 것으로 보입니다. `;
    }
    draft += "시료의 특성 및 시험 목적에 따라 진행 가능 여부와 세부 내용이 달라질 수 있습니다.\n\n";

    // 확인이 필요한 정보
    draft += "정확한 안내를 위해 아래 사항을 추가로 확인해 주시면 검토 후 안내드리겠습니다.\n\n";
    
    const requiredInfo: string[] = [];
    if (missing.includes("시료/제품 종류")) {
      requiredInfo.push("• 시료/제품의 종류 및 형태 (예: 액체, 고체, 분말 등)");
    } else if (sample) {
      requiredInfo.push(`• 시료 형태 및 상태: ${sample}`);
    } else {
      requiredInfo.push("• 시료/제품의 구체적인 종류 및 형태");
    }

    if (missing.includes("문의 목적(견적/시험/인증 등)")) {
      requiredInfo.push("• 시험 목적 (제출처, 법적 기준 해당 여부 등)");
    } else if (purpose) {
      requiredInfo.push(`• 시험 목적: ${purpose} 관련 세부 사항`);
    } else {
      requiredInfo.push("• 분석 또는 시험의 목적 (제출처 및 관련 법규 포함)");
    }

    requiredInfo.push("• 확인이 필요한 시험 항목 또는 대상 물질");

    if (missing.includes("희망 일정")) {
      requiredInfo.push("• 희망 일정 또는 긴급성");
    } else if (date) {
      requiredInfo.push(`• 희망 일정: ${date} (조정 가능 여부)`);
    } else {
      requiredInfo.push("• 희망 일정 및 긴급 여부");
    }

    requiredInfo.push("• 시료 제공 가능 수량 및 제출 방식 (방문, 택배 등)");

    draft += requiredInfo.join("\n") + "\n\n";

    // 다음 절차 안내
    draft += "위 정보를 확인한 후, 담당 부서 검토를 통해 시험 가능 여부, 소요 기간, 예상 비용 범위를 안내드리겠습니다. ";
    draft += "검토 과정에서 추가로 필요한 사항이 있을 경우 별도로 연락드릴 수 있습니다.\n\n";
    draft += "문의해 주셔서 감사합니다.";

    setResults({ category, services, missing, nextAction, draft });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Ops-only Status Bar */}
      <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
        <div className="max-w-screen-xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Logo Symbol */}
            <img 
              src="/images/ketri_symbol.png" 
              alt="" 
              className="h-5 w-auto pointer-events-none select-none"
            />
            
            {/* AI Emoji */}
            <span className="text-lg leading-none pointer-events-none select-none">🤖</span>
            
            {/* Main Label */}
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              내부 AI 보조 도구 (운영 전용 · 비공식)
            </span>
          </div>
          
          {/* Helper Text */}
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-2">
            본 도구는 내부 운영 참고용이며, AI 결과는 최종 판단이 아닙니다.
          </p>
        </div>
      </div>

      <Section spacing="md">
        <Container size="lg">
          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>AI 문의 사전정리 (운영 전용)</CardTitle>
              <p className="text-body-sm text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
                고객 문의를 분류하고 누락 정보를 확인하는 보조 도구입니다. 모든 결과는 참고용 초안입니다.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <label className="block text-body-md font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  고객 문의 원문 (필수)
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={6}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-normal focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  placeholder="고객 문의 원문을 붙여넣어 주세요. 예: 제품 A의 성분 분석 및 인증 관련 견적 문의..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                  label="시료/제품 종류 (선택)" 
                  value={sample} 
                  onChange={(e) => setSample(e.target.value)}
                />
                <Input 
                  label="문의 목적 (선택)" 
                  value={purpose} 
                  onChange={(e) => setPurpose(e.target.value)}
                />
                <Input 
                  label="희망 일정 (선택)" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter>
              <div className="flex items-center gap-3">
                <Button onClick={run} disabled={!query.trim()}>
                  실행
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { 
                    setQuery(""); 
                    setSample(""); 
                    setPurpose(""); 
                    setDate(""); 
                    setResults(null); 
                  }}
                >
                  초기화
                </Button>
              </div>
            </CardFooter>
          </Card>

          {results && (
            <div className="mt-6 space-y-4">
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>1) 문의 유형 분류 (참고용)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-body-md font-medium text-neutral-900 dark:text-neutral-100">
                      {results.category}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(results.category)}
                    >
                      복사
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle>2) 관련 서비스/시험 분야 (참고용)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.services.map((s, i) => (
                      <li key={i} className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                        <span className="text-body-md font-medium text-neutral-900 dark:text-neutral-100">
                          {s}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(s)}
                        >
                          복사
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle>3) 누락 정보 체크리스트</CardTitle>
                </CardHeader>
                <CardContent>
                  {results.missing.length ? (
                    <ul className="space-y-3">
                      {results.missing.map((m, i) => (
                        <li key={i} className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                          <span className="text-body-md font-medium text-neutral-900 dark:text-neutral-100">
                            {m}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => copyToClipboard(m)}
                          >
                            복사
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-body-md font-medium text-neutral-600 dark:text-neutral-400">
                      누락된 정보 없음
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle>4) 운영자 기준 다음 액션 제안 (참고용)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-body-md font-medium text-neutral-900 dark:text-neutral-100">
                      {results.nextAction}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(results.nextAction)}
                    >
                      복사
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle>5) 답변 초안 (참고용 · 수정 후 사용)</CardTitle>
                  <p className="text-body-sm text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
                    운영자가 내용을 검토하고 수정한 후 사용하세요.
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <pre className="whitespace-pre-wrap text-body-md font-normal text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
{results.draft}
                  </pre>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(results.draft || "")}
                    >
                      복사
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
