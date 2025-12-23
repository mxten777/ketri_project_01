import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

// About pages
import Greeting from "./pages/about/Greeting";
import History from "./pages/about/History";
import Organization from "./pages/about/Organization";
import CI from "./pages/about/CI";
import Location from "./pages/about/Location";
import Equipment from "./pages/about/Equipment";
import Certificates from "./pages/about/Certificates";

// Service pages
import IndustrialHealth from "./pages/services/IndustrialHealth";
import WaterTesting from "./pages/services/WaterTesting";
import DialysisWater from "./pages/services/DialysisWater";
import IndoorAirQuality from "./pages/services/IndoorAirQuality";
import Asbestos from "./pages/services/Asbestos";

// Board pages
import NoticeList from "./pages/board/NoticeList";
import NoticeDetail from "./pages/board/NoticeDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* 연구소 소개 */}
        <Route path="/about/greeting" element={<Greeting />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/organization" element={<Organization />} />
        <Route path="/about/ci" element={<CI />} />
        <Route path="/about/location" element={<Location />} />
        <Route path="/about/equipment" element={<Equipment />} />
        <Route path="/about/certificates" element={<Certificates />} />

        {/* 서비스 */}
        <Route path="/services/industrial-health" element={<IndustrialHealth />} />
        <Route path="/services/water-testing" element={<WaterTesting />} />
        <Route path="/services/dialysis-water" element={<DialysisWater />} />
        <Route path="/services/indoor-air-quality" element={<IndoorAirQuality />} />
        <Route path="/services/asbestos" element={<Asbestos />} />

        {/* 정보센터 - 공지사항만 */}
        <Route path="/board/notice" element={<NoticeList />} />
        <Route path="/board/notice/:id" element={<NoticeDetail />} />

        {/* 없는 경로는 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
