import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.core";
import { useNavigate } from "react-router-dom";

const AdminPassword = () => {
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 6) {
      setError("새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(newPassword);
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "auth/requires-recent-login") {
        setError("보안을 위해 로그아웃 후 다시 로그인한 뒤 변경해주세요.");
      } else if (code === "auth/weak-password") {
        setError("비밀번호가 너무 약합니다. 6자 이상으로 설정해주세요.");
      } else {
        setError(err instanceof Error ? err.message : "비밀번호 변경에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">비밀번호 변경</h2>
            <p className="text-white/50 text-sm">관리자 계정 비밀번호를 변경합니다</p>
          </div>
        </div>

        {success && (
          <div className="flex flex-col space-y-3 mb-6">
            <div className="flex items-center space-x-2 bg-green-500/20 border border-green-500/40 rounded-xl p-4">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-300 text-sm font-medium">비밀번호가 성공적으로 변경되었습니다.</p>
            </div>
            <button
              onClick={() => navigate("/admin/notice")}
              className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 text-white font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>공지사항 관리로 돌아가기</span>
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 새 비밀번호 */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">새 비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호 입력 (6자 이상)"
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-11 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 새 비밀번호 확인 */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">새 비밀번호 확인</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호 재입력"
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-11 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-red-400 text-xs mt-1">비밀번호가 일치하지 않습니다</p>
            )}
            {confirmPassword && newPassword === confirmPassword && newPassword.length >= 6 && (
              <p className="text-green-400 text-xs mt-1">비밀번호가 일치합니다</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 6}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span>변경 중...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>비밀번호 변경</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <p className="text-yellow-300/80 text-xs leading-relaxed">
            ※ 변경 후 다음 로그인 시 새 비밀번호를 사용하세요.<br/>
            ※ 오류 발생 시 로그아웃 후 다시 로그인한 뒤 변경해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPassword;
