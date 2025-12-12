import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);

      // Remember Me 처리
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);

      // Firebase 에러 메시지 한글화
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (err.code === "auth/invalid-email") {
        setError("유효하지 않은 이메일 주소입니다.");
      } else if (err.code === "auth/user-disabled") {
        setError("비활성화된 계정입니다.");
      } else if (err.code === "auth/too-many-requests") {
        setError("너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.");
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-secondary-900 relative overflow-hidden">
      {/* 동적 배경 애니메이션 */}
      <div className="absolute inset-0">
        {/* 부유하는 파티클들 */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* 그라디언트 오브젝트들 */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* 기하학적 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-400 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-secondary-400 rotate-12 animate-ping"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rotate-45 animate-bounce"></div>
        </div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 왼쪽: 브랜딩 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-center lg:text-left space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent leading-tight">
                  환영합니다
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-primary-400 to-secondary-400 mx-auto lg:mx-0 mt-4"></div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed"
              >
                <span className="font-semibold text-primary-200">한국환경안전연구소</span>의<br />
                전문적인 환경 분석 서비스를<br />
                경험해보세요
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-6 pt-8"
              >
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="text-3xl font-bold text-primary-300">8,500+</div>
                  <div className="text-sm text-gray-300">검사 완료</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="text-3xl font-bold text-secondary-300">650+</div>
                  <div className="text-sm text-gray-300">고객사</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 오른쪽: 로그인 폼 */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md mx-auto"
          >
            {/* 로그인 카드 */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-10">
              {/* 헤더 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6 shadow-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔐</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  로그인
                </h1>
                <p className="text-gray-600">
                  계정에 로그인하여 서비스를 이용하세요
                </p>
              </motion.div>

              {/* 에러 메시지 */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              {/* 로그인 폼 */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* 이메일 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="이메일을 입력하세요"
                      required
                    />
                  </div>
                </div>

                {/* 비밀번호 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="비밀번호를 입력하세요"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* 옵션들 */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">자동 로그인</span>
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    비밀번호 찾기
                  </Link>
                </div>

                {/* 로그인 버튼 */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        로그인 중...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        로그인
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              {/* 구분선 */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>

              {/* 회원가입 링크 */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl"
              >
                <span className="text-sm text-gray-600 block mb-3">
                  계정이 없으신가요?
                </span>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-white rounded-xl border border-primary-200 hover:border-primary-300 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  회원가입
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
