import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import Home from "./pages/Home";
import ScrollToTop from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Service Pages (lazy load for better performance)
import { lazy, Suspense } from "react";
const IndustrialHealth = lazy(
  () => import("./pages/services/IndustrialHealth")
);
const WaterTesting = lazy(() => import("./pages/services/WaterTesting"));
const DialysisWater = lazy(() => import("./pages/services/DialysisWater"));
const IndoorAirQuality = lazy(
  () => import("./pages/services/IndoorAirQuality")
);
const Asbestos = lazy(() => import("./pages/services/Asbestos"));
const Board = lazy(() => import("./pages/board/Board"));
const NoticeList = lazy(() => import("./pages/board/NoticeList"));
const NoticeDetail = lazy(() => import("./pages/board/NoticeDetail"));
const NoticeForm = lazy(() => import("./pages/board/NoticeForm"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NoticeAdmin = lazy(() => import("./pages/admin/NoticeAdmin"));
const NaraPurchase = lazy(() => import("./pages/admin/NaraPurchase"));
const ContentManagement = lazy(() => import("./pages/admin/ContentManagement"));

// About Pages (연구소 소개)
const Greeting = lazy(() => import("./pages/about/Greeting"));
const History = lazy(() => import("./pages/about/History"));
const Organization = lazy(() => import("./pages/about/Organization"));
const CI = lazy(() => import("./pages/about/CI"));
const Certificates = lazy(() => import("./pages/about/Certificates"));
const Equipment = lazy(() => import("./pages/about/Equipment"));
const Location = lazy(() => import("./pages/about/Location"));

// Theme System Demo
const ThemeSystemDemo = lazy(() => import("./pages/ThemeSystemDemo"));
const UITest = lazy(() => import("./pages/UITest"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Dark mode initialization
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Login - AdminLayout 없이 */}
        <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
        
        {/* Admin Routes - AdminLayout 사용 */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout title="" description="">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/notice" element={<NoticeAdmin />} />
                    <Route path="/notice/create" element={<NoticeForm />} />
                    <Route path="/notice/edit/:id" element={<NoticeForm />} />
                    <Route path="/nara-purchase" element={<NaraPurchase />} />
                  </Routes>
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* General Routes - 일반 Layout 사용 */}
        <Route
          path="/*"
          element={
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Theme System Demo */}
            <Route path="/theme-demo" element={<ThemeSystemDemo />} />
            <Route path="/ui-test" element={<UITest />} />

            {/* Service Pages */}
            <Route path="industrial-health" element={<IndustrialHealth />} />
            <Route path="industrial-health/*" element={<Navigate to="/industrial-health" replace />} />
            <Route path="water-testing" element={<WaterTesting />} />
            <Route path="water-testing/*" element={<Navigate to="/water-testing" replace />} />
            <Route path="dialysis-water" element={<DialysisWater />} />
            <Route path="dialysis-water/*" element={<Navigate to="/dialysis-water" replace />} />
            <Route path="indoor-air-quality" element={<IndoorAirQuality />} />
            <Route path="indoor-air-quality/*" element={<Navigate to="/indoor-air-quality" replace />} />
            <Route path="asbestos" element={<Asbestos />} />
            <Route path="asbestos/*" element={<Navigate to="/asbestos" replace />} />

            {/* Notice Board */}
            <Route path="board/notice" element={<NoticeList />} />
            <Route path="board/notice/:id" element={<NoticeDetail />} />
            <Route
              path="board/notice/create"
              element={
                <ProtectedRoute requireAdmin>
                  <NoticeForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="board/notice/edit/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <NoticeForm />
                </ProtectedRoute>
              }
            />





            {/* About Pages - 연구소 소개 */}
            <Route path="about/greeting" element={<Greeting />} />
            <Route path="about/history" element={<History />} />
            <Route path="about/organization" element={<Organization />} />
            <Route path="about/ci" element={<CI />} />
            <Route path="about/certificates" element={<Certificates />} />
            <Route path="about/equipment" element={<Equipment />} />
            <Route path="about/location" element={<Location />} />



            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen">
                  <h1 className="text-6xl font-bold text-neutral-300 mb-4">
                    404
                  </h1>
                  <p className="text-xl text-neutral-600 mb-8">
                    페이지를 찾을 수 없습니다
                  </p>
                  <a href="/" className="btn btn-primary">
                    홈으로 돌아가기
                  </a>
                </div>
              }
            />
                </Routes>
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
