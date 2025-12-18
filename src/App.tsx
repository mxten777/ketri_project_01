import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// Industrial Health Sub-pages
const WorkEnvironment = lazy(() => import("./pages/services/industrial-health/WorkEnvironment"));
const RiskAssessment = lazy(() => import("./pages/services/industrial-health/RiskAssessment"));

// Water Testing Sub-pages
const WaterIntro = lazy(() => import("./pages/services/water-testing/WaterIntro"));
const WaterScope = lazy(() => import("./pages/services/water-testing/WaterScope"));
const WaterFee = lazy(() => import("./pages/services/water-testing/WaterFee"));
const WaterProcess = lazy(() => import("./pages/services/water-testing/WaterProcess"));

// Dialysis Water Sub-pages
const DialysisIntro = lazy(() => import("./pages/services/dialysis-water/DialysisIntro"));
const DialysisRequest = lazy(() => import("./pages/services/dialysis-water/DialysisRequest"));
const DialysisCycle = lazy(() => import("./pages/services/dialysis-water/DialysisCycle"));
const DialysisStandard = lazy(() => import("./pages/services/dialysis-water/DialysisStandard"));
const DialysisSampling = lazy(() => import("./pages/services/dialysis-water/DialysisSampling"));

// Indoor Air Quality Sub-pages
const IndoorIntro = lazy(() => import("./pages/services/indoor-air-quality/IndoorIntro"));
const IndoorRequest = lazy(() => import("./pages/services/indoor-air-quality/IndoorRequest"));
const IndoorResult = lazy(() => import("./pages/services/indoor-air-quality/IndoorResult"));

// Asbestos Sub-pages
const AsbestosSurvey = lazy(() => import("./pages/services/asbestos/AsbestosSurvey"));
const AsbestosConcentration = lazy(() => import("./pages/services/asbestos/AsbestosConcentration"));
const AsbestosDispersion = lazy(() => import("./pages/services/asbestos/AsbestosDispersion"));
const AsbestosSupervision = lazy(() => import("./pages/services/asbestos/AsbestosSupervision"));
const AsbestosRisk = lazy(() => import("./pages/services/asbestos/AsbestosRisk"));
const AsbestosAir = lazy(() => import("./pages/services/asbestos/AsbestosAir"));
const Board = lazy(() => import("./pages/board/Board"));
const NoticeList = lazy(() => import("./pages/board/NoticeList"));
const NoticeDetail = lazy(() => import("./pages/board/NoticeDetail"));
const NoticeForm = lazy(() => import("./pages/board/NoticeForm"));
const QnAList = lazy(() => import("./pages/board/QnAList"));
const QnADetail = lazy(() => import("./pages/board/QnADetail"));
const QnAForm = lazy(() => import("./pages/board/QnAForm"));
const FreeList = lazy(() => import("./pages/board/FreeList"));
const FreeDetail = lazy(() => import("./pages/board/FreeDetail"));
const FreeForm = lazy(() => import("./pages/board/FreeForm"));
const ResourceList = lazy(() => import("./pages/board/ResourceList"));
const ResourceForm = lazy(() => import("./pages/board/ResourceForm"));
const ResourceEdit = lazy(() => import("./pages/board/ResourceEdit"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const MyPage = lazy(() => import("./pages/MyPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const NoticeAdmin = lazy(() => import("./pages/admin/NoticeAdmin"));
const QnAAdmin = lazy(() => import("./pages/admin/QnAAdmin"));
const FreeAdmin = lazy(() => import("./pages/admin/FreeAdmin"));
const ResourceAdmin = lazy(() => import("./pages/admin/ResourceAdmin"));
const ContentManagement = lazy(() => import("./pages/admin/ContentManagement"));

// About Pages (연구소 소개)
const Greeting = lazy(() => import("./pages/about/Greeting"));
const History = lazy(() => import("./pages/about/History"));
const Organization = lazy(() => import("./pages/about/Organization"));
const CI = lazy(() => import("./pages/about/CI"));
const Certificates = lazy(() => import("./pages/about/Certificates"));
const Equipment = lazy(() => import("./pages/about/Equipment"));
const Location = lazy(() => import("./pages/about/Location"));

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
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/notice" element={<NoticeAdmin />} />
                    <Route path="/notice/create" element={<NoticeForm />} />
                    <Route path="/notice/edit/:id" element={<NoticeForm />} />
                    <Route path="/qna" element={<QnAAdmin />} />
                    <Route path="/qna/edit/:id" element={<QnAForm />} />
                    <Route path="/free" element={<FreeAdmin />} />
                    <Route path="/free/edit/:id" element={<FreeForm />} />
                    <Route path="/resources" element={<ResourceAdmin />} />
                    <Route path="/resources/create" element={<ResourceForm />} />
                    <Route path="/resources/edit/:id" element={<ResourceEdit />} />
                    <Route path="/content" element={<ContentManagement />} />
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

            {/* Industrial Health */}
            <Route path="industrial-health/*" element={<IndustrialHealth />} />
            <Route path="industrial-health/work-environment" element={<WorkEnvironment />} />
            <Route path="industrial-health/risk-assessment" element={<RiskAssessment />} />

            {/* Water Testing */}
            <Route path="water-testing/*" element={<WaterTesting />} />
            <Route path="water-testing/intro" element={<WaterIntro />} />
            <Route path="water-testing/scope" element={<WaterScope />} />
            <Route path="water-testing/fee" element={<WaterFee />} />
            <Route path="water-testing/process" element={<WaterProcess />} />

            {/* Dialysis Water */}
            <Route path="dialysis-water/*" element={<DialysisWater />} />
            <Route path="dialysis-water/intro" element={<DialysisIntro />} />
            <Route path="dialysis-water/request" element={<DialysisRequest />} />
            <Route path="dialysis-water/cycle" element={<DialysisCycle />} />
            <Route path="dialysis-water/standard" element={<DialysisStandard />} />
            <Route path="dialysis-water/sampling" element={<DialysisSampling />} />

            {/* Indoor Air Quality */}
            <Route
              path="indoor-air-quality/*"
              element={<IndoorAirQuality />}
            />
            <Route path="indoor-air-quality/intro" element={<IndoorIntro />} />
            <Route path="indoor-air-quality/request" element={<IndoorRequest />} />
            <Route path="indoor-air-quality/result" element={<IndoorResult />} />

            {/* Asbestos */}
            <Route path="asbestos/*" element={<Asbestos />} />
            <Route path="asbestos/survey" element={<AsbestosSurvey />} />
            <Route path="asbestos/concentration" element={<AsbestosConcentration />} />
            <Route path="asbestos/dispersion" element={<AsbestosDispersion />} />
            <Route path="asbestos/supervision" element={<AsbestosSupervision />} />
            <Route path="asbestos/risk" element={<AsbestosRisk />} />
            <Route path="asbestos/air" element={<AsbestosAir />} />

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

            {/* QnA Board */}
            <Route path="board/qna" element={<QnAList />} />
            <Route path="board/qna/:id" element={<QnADetail />} />
            <Route
              path="board/qna/new"
              element={
                <ProtectedRoute>
                  <QnAForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="board/qna/edit/:id"
              element={
                <ProtectedRoute>
                  <QnAForm />
                </ProtectedRoute>
              }
            />

            {/* Free Board */}
            <Route path="board/free" element={<FreeList />} />
            <Route path="board/free/:id" element={<FreeDetail />} />
            <Route
              path="board/free/new"
              element={
                <ProtectedRoute>
                  <FreeForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="board/free/edit/:id"
              element={
                <ProtectedRoute>
                  <FreeForm />
                </ProtectedRoute>
              }
            />

            {/* Resource Library */}
            <Route path="board/resources" element={<ResourceList />} />
            <Route
              path="board/resources/upload"
              element={
                <ProtectedRoute requireAdmin>
                  <ResourceForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="board/resources/edit/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <ResourceEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="board/resources/new"
              element={
                <ProtectedRoute requireAdmin>
                  <ResourceForm />
                </ProtectedRoute>
              }
            />

            {/* Quote Request - Public */}
            <Route path="quote-request" element={<QuoteRequest />} />

            {/* About Pages - 연구소 소개 */}
            <Route path="about/greeting" element={<Greeting />} />
            <Route path="about/history" element={<History />} />
            <Route path="about/organization" element={<Organization />} />
            <Route path="about/ci" element={<CI />} />
            <Route path="about/certificates" element={<Certificates />} />
            <Route path="about/equipment" element={<Equipment />} />
            <Route path="about/location" element={<Location />} />

            {/* Auth */}
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* My Page - Protected */}
            <Route
              path="my-page/*"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />

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
