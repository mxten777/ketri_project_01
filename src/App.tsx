import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';

// Service Pages (lazy load for better performance)
import { lazy, Suspense } from 'react';
const IndustrialHealth = lazy(() => import('./pages/services/IndustrialHealth'));
const WaterTesting = lazy(() => import('./pages/services/WaterTesting'));
const DialysisWater = lazy(() => import('./pages/services/DialysisWater'));
const IndoorAirQuality = lazy(() => import('./pages/services/IndoorAirQuality'));
const Asbestos = lazy(() => import('./pages/services/Asbestos'));
const Board = lazy(() => import('./pages/board/Board'));
const NoticeList = lazy(() => import('./pages/board/NoticeList'));
const NoticeDetail = lazy(() => import('./pages/board/NoticeDetail'));
const NoticeForm = lazy(() => import('./pages/board/NoticeForm'));
const QnAList = lazy(() => import('./pages/board/QnAList'));
const QnADetail = lazy(() => import('./pages/board/QnADetail'));
const QnAForm = lazy(() => import('./pages/board/QnAForm'));
const ResourceList = lazy(() => import('./pages/board/ResourceList'));
const ResourceForm = lazy(() => import('./pages/board/ResourceForm'));
const QuoteRequest = lazy(() => import('./pages/QuoteRequest'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const MyPage = lazy(() => import('./pages/MyPage'));
const Admin = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const QuoteManagement = lazy(() => import('./pages/admin/QuoteManagement'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Dark mode initialization
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Industrial Health */}
            <Route path="/industrial-health/*" element={<IndustrialHealth />} />
            
            {/* Water Testing */}
            <Route path="/water-testing/*" element={<WaterTesting />} />
            
            {/* Dialysis Water */}
            <Route path="/dialysis-water/*" element={<DialysisWater />} />
            
            {/* Indoor Air Quality */}
            <Route path="/indoor-air-quality/*" element={<IndoorAirQuality />} />
            
            {/* Asbestos */}
            <Route path="/asbestos/*" element={<Asbestos />} />
            
            {/* Board */}
            <Route path="/board/*" element={<Board />} />
            
            {/* Notice Board */}
            <Route path="/board/notice" element={<NoticeList />} />
            <Route path="/board/notice/:id" element={<NoticeDetail />} />
            <Route path="/board/notice/create" element={
              <ProtectedRoute requireAdmin>
                <NoticeForm />
              </ProtectedRoute>
            } />
            <Route path="/board/notice/edit/:id" element={
              <ProtectedRoute requireAdmin>
                <NoticeForm />
              </ProtectedRoute>
            } />
            
            {/* QnA Board */}
            <Route path="/board/qna" element={<QnAList />} />
            <Route path="/board/qna/:id" element={<QnADetail />} />
            <Route path="/board/qna/new" element={
              <ProtectedRoute>
                <QnAForm />
              </ProtectedRoute>
            } />
            <Route path="/board/qna/edit/:id" element={
              <ProtectedRoute>
                <QnAForm />
              </ProtectedRoute>
            } />
            
            {/* Resource Library */}
            <Route path="/board/resources" element={<ResourceList />} />
            <Route path="/board/resources/upload" element={
              <ProtectedRoute requireAdmin>
                <ResourceForm />
              </ProtectedRoute>
            } />
            
            {/* Quote Request - Public */}
            <Route path="/quote-request" element={<QuoteRequest />} />
            
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* My Page - Protected */}
            <Route path="/my-page/*" element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            } />
            
            {/* Admin - Protected (Admin Only) */}
            <Route path="/admin/*" element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requireAdmin>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/quotes" element={
              <ProtectedRoute requireAdmin>
                <QuoteManagement />
              </ProtectedRoute>
            } />
            
            {/* 404 Not Found */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-6xl font-bold text-neutral-300 mb-4">404</h1>
                <p className="text-xl text-neutral-600 mb-8">페이지를 찾을 수 없습니다</p>
                <a href="/" className="btn btn-primary">홈으로 돌아가기</a>
              </div>
            } />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
