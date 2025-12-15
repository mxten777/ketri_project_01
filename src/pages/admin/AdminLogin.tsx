import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  ChevronRight,
  Activity,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/common/Button";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, userData } = useAuth();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  useEffect(() => {
    setMounted(true);
  }, []);

  // 관리자가 아닌 사용자가 접근 시 리다이렉트
  useEffect(() => {
    if (userData && userData.role !== "admin") {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);

      // 관리자 권한 확인 후 리다이렉트
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Admin login error:", err);

      // Firebase 에러 메시지 한글화
      if (
        (err as { code?: string }).code === "auth/user-not-found" ||
        (err as { code?: string }).code === "auth/wrong-password"
      ) {
        setError(
          "관리자 인증에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
        );
      } else if ((err as { code?: string }).code === "auth/invalid-email") {
        setError("유효하지 않은 관리자 이메일 주소입니다.");
      } else if ((err as { code?: string }).code === "auth/user-disabled") {
        setError("비활성화된 관리자 계정입니다.");
      } else if ((err as { code?: string }).code === "auth/too-many-requests") {
        setError(
          "보안상 너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요."
        );
      } else {
        setError(
          err instanceof Error ? err.message : "관리자 로그인에 실패했습니다."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const adminFeatures = [
    { icon: BarChart3, title: "고급 분석", desc: "실시간 비즈니스 인사이트" },
    { icon: Users, title: "사용자 관리", desc: "통합 회원 관리 시스템" },
    {
      icon: Activity,
      title: "시스템 모니터링",
      desc: "서비스 상태 실시간 추적",
    },
    { icon: Settings, title: "시스템 설정", desc: "전체 플랫폼 제어" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 배경 효과 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      ></div>

      {/* 글로우 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 relative z-10"
      >
        {/* 왼쪽 - 브랜딩 및 기능 소개 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col justify-center space-y-8 text-white"
        >
          {/* 헤더 */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Shield className="w-12 h-12 text-purple-400" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-2 rounded-full border border-purple-400/30"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  KETRI Admin
                </h1>
                <p className="text-purple-200/80 text-sm">Management Portal</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold leading-tight mb-4">
                Enterprise-Grade
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Administrative Portal
                </span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                한국환경안전연구소의 통합 관리 시스템에 오신 것을 환영합니다.
                강력한 분석 도구와 실시간 모니터링으로 효율적인 업무 관리를
                경험하세요.
              </p>
            </motion.div>
          </div>

          {/* 기능 소개 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {adminFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <feature.icon className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* 통계 표시 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center space-x-6 text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300">시스템 정상 운영</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300">Premium Security</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 오른쪽 - 로그인 폼 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              {/* 폼 헤더 */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  관리자 로그인
                </h3>
                <p className="text-slate-300">
                  보안 인증을 통해 시스템에 접근하세요
                </p>
              </div>

              {/* 에러 메시지 */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm backdrop-blur-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 로그인 폼 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    관리자 이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="admin@ketri.co.kr"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="보안 비밀번호 입력"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center justify-end"
                >
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    비밀번호 찾기
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 via-purple-600 to-cyan-600 hover:from-purple-700 hover:via-purple-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>인증 중...</span>
                      </>
                    ) : (
                      <>
                        <span>관리자 로그인</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* 하단 링크 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-center mt-6"
              >
                <Link
                  to="/"
                  className="inline-flex items-center space-x-1 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <span>메인 사이트로 돌아가기</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
