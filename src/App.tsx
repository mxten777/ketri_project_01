import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import PrintAllLayout from "./components/layout/PrintAllLayout";
import Home from "./pages/Home";
import { scrollToHash } from "./utils/scrollToHash";

// About pages
import Greeting from "./pages/about/Greeting";
import History from "./pages/about/History";
import Organization from "./pages/about/Organization";
import CI from "./pages/about/CI";
import Location from "./pages/about/Location";
import AboutIndex from "./pages/about/AboutIndex";
import Equipment from "./pages/about/Equipment";
import Certificates from "./pages/about/Certificates";

// Service pages
import IndustrialHealth from "./pages/services/IndustrialHealth";
import AnalysisService from "./pages/services/industrial-health/AnalysisService";
import WaterTesting from "./pages/services/WaterTesting";
import DialysisWater from "./pages/services/DialysisWater";
import IndoorAirQuality from "./pages/services/IndoorAirQuality";
import Asbestos from "./pages/services/Asbestos";

// Board pages
import NoticeList from "./pages/board/NoticeList";
import NoticeDetail from "./pages/board/NoticeDetail";
import AiOps from "./pages/ops/AiOps";

// Print page
import PrintAll from "./pages/PrintAll";

// Admin pages (for admin notice management)
import AdminLogin from "./pages/admin/AdminLogin";
import NoticeAdmin from "./pages/admin/NoticeAdmin";
import NoticeForm from "./pages/board/NoticeForm";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Handle hash scrolling on route changes
  useEffect(() => {
    if (location.hash) {
      // Delay to ensure DOM is ready after route change
      scrollToHash(location.hash);
    } else {
      // No hash: scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return (
    <Routes>
      {/* 인쇄 전용 페이지 (헤더/푸터 없음) */}
      <Route element={<PrintAllLayout />}>
        <Route path="/print-all" element={<PrintAll />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* 연구소 소개 */}
        <Route path="/about/greeting" element={<Greeting />} />
        <Route path="/about" element={<AboutIndex />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/organization" element={<Organization />} />
        <Route path="/about/ci" element={<CI />} />
        <Route path="/about/location" element={<Location />} />
        <Route path="/about/equipment" element={<Equipment />} />
        <Route path="/about/certificates" element={<Certificates />} />

        {/* 서비스 */}
        <Route path="/services/industrial-health" element={<IndustrialHealth />} />
        <Route path="/services/industrial-health/analysis-service" element={<AnalysisService />} />
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

      {/* Operations - AI helpers (standalone, no global header/footer) */}
      <Route path="/ops/ai" element={<AiOps />} />

      {/* Admin routes (separate layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/notice"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout title="공지사항 관리">
              <NoticeAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notice/create"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout title="공지사항 작성">
              <NoticeForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notice/edit/:id"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout title="공지사항 수정">
              <NoticeForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
