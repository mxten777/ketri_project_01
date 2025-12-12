import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Save,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MyPage = () => {
  const {
    currentUser,
    userData,
    updateUserProfile,
    changePassword,
    deleteAccount,
    logout,
  } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(userData?.displayName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "delete">(
    "profile"
  );

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateUserProfile(displayName);
      setMessage({
        type: "success",
        text: "프로필이 성공적으로 업데이트되었습니다.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({ type: "error", text: "프로필 업데이트에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "비밀번호는 6자 이상이어야 합니다." });
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "비밀번호가 일치하지 않습니다." });
      setLoading(false);
      return;
    }

    try {
      await changePassword(newPassword);
      setMessage({
        type: "success",
        text: "비밀번호가 성공적으로 변경되었습니다.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Password change error:", error);
      if (error.code === "auth/requires-recent-login") {
        setMessage({
          type: "error",
          text: "보안을 위해 다시 로그인한 후 시도해주세요.",
        });
      } else {
        setMessage({ type: "error", text: "비밀번호 변경에 실패했습니다." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await deleteAccount();
      navigate("/");
    } catch (error: any) {
      console.error("Account deletion error:", error);
      if (error.code === "auth/requires-recent-login") {
        setMessage({
          type: "error",
          text: "보안을 위해 다시 로그인한 후 시도해주세요.",
        });
      } else {
        setMessage({ type: "error", text: "계정 삭제에 실패했습니다." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              마이페이지
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              계정 정보를 관리하고 설정을 변경할 수 있습니다
            </p>
          </div>

          {/* User Info Card */}
          <div className="card p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {userData?.displayName || "사용자"}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {currentUser?.email}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {userData?.role === "admin" ? "관리자" : "일반 회원"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card mb-6">
            <div className="border-b border-neutral-200 dark:border-neutral-700">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "profile"
                      ? "border-primary-500 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  프로필 수정
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "password"
                      ? "border-primary-500 text-primary-600 dark:text-primary-400"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  비밀번호 변경
                </button>
                <button
                  onClick={() => setActiveTab("delete")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "delete"
                      ? "border-red-500 text-red-600 dark:text-red-400"
                      : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }`}
                >
                  계정 삭제
                </button>
              </nav>
            </div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`mx-6 mt-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}
              >
                <p
                  className={`text-sm ${
                    message.type === "success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {message.text}
                </p>
              </motion.div>
            )}

            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      이름
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="이름을 입력하세요"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      이메일
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="email"
                        value={currentUser?.email || ""}
                        className="w-full pl-11 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <p className="mt-2 text-xs text-neutral-500">
                      이메일은 변경할 수 없습니다
                    </p>
                  </div>

                  <Button type="submit" isLoading={loading} disabled={loading}>
                    <Save className="w-5 h-5 mr-2" />
                    {loading ? "저장 중..." : "프로필 저장"}
                  </Button>
                </form>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      현재 비밀번호
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="현재 비밀번호"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      새 비밀번호
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="6자 이상"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      새 비밀번호 확인
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="비밀번호 재입력"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" isLoading={loading} disabled={loading}>
                    <Lock className="w-5 h-5 mr-2" />
                    {loading ? "변경 중..." : "비밀번호 변경"}
                  </Button>
                </form>
              )}

              {/* Delete Tab */}
              {activeTab === "delete" && (
                <div className="space-y-6">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                      계정 삭제
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                      계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이
                      작업은 되돌릴 수 없습니다.
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400 space-y-1 mb-6">
                      <li>모든 개인 정보가 삭제됩니다</li>
                      <li>작성한 게시글과 댓글이 삭제됩니다</li>
                      <li>동일한 이메일로 재가입할 수 있습니다</li>
                    </ul>
                    <Button
                      variant="outline"
                      onClick={handleDeleteAccount}
                      isLoading={loading}
                      disabled={loading}
                      className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-5 h-5 mr-2" />
                      {loading ? "삭제 중..." : "계정 영구 삭제"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              로그아웃
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyPage;
