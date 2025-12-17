import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * 관리자 페이지 공통 레이아웃
 * - 다크 그라데이션 배경
 * - 애니메이션 파티클 효과
 * - 통일된 헤더 구조
 */
const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  description,
  actions,
}) => {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
      {/* 관리자 헤더 */}
      <header className="relative z-20 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-white font-semibold text-lg">KESRI Admin</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/admin/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                대시보드
              </Link>
              <Link to="/admin/notices" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                공지사항 관리
              </Link>
              <Link to="/admin/qna" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                질문답변 관리
              </Link>
              <Link to="/admin/free" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                자유게시판 관리
              </Link>
              <Link to="/admin/resources" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                자료실 관리
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">홈페이지로</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-4 h-4" />
              <span className="text-sm">{userData?.displayName || "관리자"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      {/* 애니메이션 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient"></div>

      {/* 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* 배경 패턴 */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      ></div>

      {/* 컨텐츠 */}
      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-1">
              {title}
            </h1>
            {description && <p className="text-gray-300 mt-1">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </motion.div>

        {/* 페이지 컨텐츠 */}
        {children}
      </div>

      {/* 관리자 푸터 */}
      <footer className="relative z-20 mt-auto bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-400 text-sm">
          <p>&copy; 2025 한국환경안전연구소 (KESRI). All rights reserved. | Administrator Panel</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
