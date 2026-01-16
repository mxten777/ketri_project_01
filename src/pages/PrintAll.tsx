/**
 * PrintAll - 전체 사이트 통합 인쇄 페이지
 * 모든 페이지 콘텐츠를 순차적으로 배치하여 한 번에 PDF 생성
 */

import Home from "./Home";
import Greeting from "./about/Greeting";
import History from "./about/History";
import Organization from "./about/Organization";
import Equipment from "./about/Equipment";
import Certificates from "./about/Certificates";
import CI from "./about/CI";
import Location from "./about/Location";
import IndustrialHealth from "./services/IndustrialHealth";
import WaterTesting from "./services/WaterTesting";
import DialysisWater from "./services/DialysisWater";
import IndoorAirQuality from "./services/IndoorAirQuality";
import Asbestos from "./services/Asbestos";

export default function PrintAll() {
  return (
    <div className="print-all-container">
      {/* 페이지 구분선 */}
      <style>{`
        .page-divider {
          page-break-before: always;
          margin: 2rem 0;
          padding-top: 2rem;
          border-top: 2px solid #e5e7eb;
        }
        
        .page-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        
        @media print {
          .page-divider {
            margin: 0;
            padding-top: 0;
            border: none;
          }
        }
      `}</style>

      {/* 표지 */}
      <section className="cover-page" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0569d8 0%, #004ba0 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '4rem'
      }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          한국환경안전연구소
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          종합 사이트 안내서
        </p>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          {new Date().getFullYear()}년 {new Date().getMonth() + 1}월
        </p>
      </section>

      {/* 목차 */}
      <section className="page-divider">
        <h2 className="page-title">📑 목차</h2>
        <div style={{ fontSize: '1.1rem', lineHeight: '2' }}>
          <p><strong>1. 홈페이지</strong></p>
          <p><strong>2. 연구소 소개</strong></p>
          <p style={{ paddingLeft: '2rem' }}>2.1 인사말</p>
          <p style={{ paddingLeft: '2rem' }}>2.2 연혁</p>
          <p style={{ paddingLeft: '2rem' }}>2.3 조직도</p>
          <p style={{ paddingLeft: '2rem' }}>2.4 보유장비</p>
          <p style={{ paddingLeft: '2rem' }}>2.5 인증서 및 자격현황</p>
          <p style={{ paddingLeft: '2rem' }}>2.6 CI 소개</p>
          <p style={{ paddingLeft: '2rem' }}>2.7 오시는 길</p>
          <p><strong>3. 주요 서비스</strong></p>
          <p style={{ paddingLeft: '2rem' }}>3.1 작업환경측정</p>
          <p style={{ paddingLeft: '2rem' }}>3.2 먹는물 검사</p>
          <p style={{ paddingLeft: '2rem' }}>3.3 혈액투석용수 검사</p>
          <p style={{ paddingLeft: '2rem' }}>3.4 실내공기질 측정</p>
          <p style={{ paddingLeft: '2rem' }}>3.5 석면조사분석</p>
        </div>
      </section>

      {/* 1. 홈페이지 */}
      <section className="page-divider">
        <h2 className="page-title">1. 홈페이지</h2>
        <Home />
      </section>

      {/* 2. 연구소 소개 */}
      <section className="page-divider">
        <h2 className="page-title">2. 연구소 소개</h2>
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          2.1 인사말
        </h3>
        <Greeting />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          2.2 연혁
        </h3>
        <History />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          2.3 조직도
        </h3>
        <Organization />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          2.4 보유장비
        </h3>
        <Equipment />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          2.5 인증서 및 자격현황
        </h3>
        <Certificates />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          2.6 CI 소개
        </h3>
        <CI />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          2.7 오시는 길
        </h3>
        <Location />
      </section>

      {/* 3. 주요 서비스 */}
      <section className="page-divider">
        <h2 className="page-title">3. 주요 서비스</h2>
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          3.1 작업환경측정
        </h3>
        <IndustrialHealth />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          3.2 먹는물 검사
        </h3>
        <WaterTesting />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          3.3 혈액투석용수 검사
        </h3>
        <DialysisWater />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          3.4 실내공기질 측정
        </h3>
        <IndoorAirQuality />
      </section>

      <section className="page-divider">
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          3.5 석면조사분석
        </h3>
        <Asbestos />
      </section>

      {/* 끝 페이지 */}
      <section className="page-divider" style={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          문의하기
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          ☎ 043-237-7824
        </p>
        <p style={{ fontSize: '1rem', color: '#6b7280' }}>
          충청북도 청주시 흥덕구 2순환로 1433 (지번: 석소동 159-16)
        </p>
      </section>
    </div>
  );
}
