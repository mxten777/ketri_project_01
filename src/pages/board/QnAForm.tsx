import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Lock, Globe, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { createQnA, updateQnA, getQnAById } from "../../services/qnaService";
import { QnAFormData } from "../../types";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

const QnAForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QnAFormData>({
    title: "",
    content: "",
    category: "general",
    isSecret: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!id;

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    const loadQnA = async () => {
      if (!isEditMode || !id) return;

      try {
        setLoading(true);
        const qnaData = await getQnAById(id);

        if (!qnaData) {
          alert("게시글을 찾을 수 없습니다.");
            navigate("/");
          return;
        }

        // 수정 권한 확인
        const canEdit =
          user?.uid === qnaData.authorId || userData?.role === "admin";
        if (!canEdit) {
          alert("수정 권한이 없습니다.");
            navigate("/");
          return;
        }

        setFormData({
          title: qnaData.title,
          content: qnaData.content,
          category: qnaData.category,
          isSecret: qnaData.isSecret,
        });
      } catch (error) {
        console.error("QnA 로드 오류:", error);
        alert("게시글을 불러오는데 실패했습니다.");
          navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadQnA();
  }, [isEditMode, id, user, userData, navigate]);

  const categories = [
    { value: "general", label: "일반문의" },
    { value: "service", label: "서비스" },
    { value: "technical", label: "기술지원" },
    { value: "account", label: "계정" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    } else if (formData.title.length < 5) {
      newErrors.title = "제목은 5자 이상 입력해주세요.";
    } else if (formData.title.length > 100) {
      newErrors.title = "제목은 100자 이하로 입력해주세요.";
    }

    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해주세요.";
    } else if (formData.content.length < 10) {
      newErrors.content = "내용은 10자 이상 입력해주세요.";
    } else if (formData.content.length > 5000) {
      newErrors.content = "내용은 5000자 이하로 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (isEditMode && id) {
        // 수정
        await updateQnA(id, formData);
        alert("질문이 수정되었습니다.");
          navigate(`/`);
      } else {
        // 새 작성
        const newQnAId = await createQnA(
          formData,
          user.uid,
          userData?.displayName || user.displayName || "익명",
          user.email || ""
        );
        alert("질문이 등록되었습니다.");
          navigate(`/`);
      }
    } catch (error) {
      console.error("QnA 저장 오류:", error);
      alert(isEditMode ? "수정에 실패했습니다." : "등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof QnAFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  if (!user) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-amber-500 mb-4" />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          로그인이 필요합니다
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          질문을 작성하려면 로그인해주세요.
        </p>
        <Button onClick={() => navigate("/")}>로그인하기</Button>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* 헤더 */}
      <div className="flex items-center gap-4">
          <Button onClick={() => navigate("/")} variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {isEditMode ? "질문 수정" : "질문 작성"}
        </h1>
      </div>

      {/* 폼 */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              카테고리 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="질문 제목을 입력해주세요 (5-100자)"
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.title
                  ? "border-red-300 dark:border-red-600"
                  : "border-neutral-200 dark:border-neutral-600"
              }`}
              maxLength={100}
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            )}
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {formData.title.length}/100자
            </p>
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              내용 *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="질문 내용을 자세히 적어주세요 (10-5000자)"
              rows={15}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
                errors.content
                  ? "border-red-300 dark:border-red-600"
                  : "border-neutral-200 dark:border-neutral-600"
              }`}
              maxLength={5000}
              required
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.content}
              </p>
            )}
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {formData.content.length}/5000자
            </p>
          </div>

          {/* 비밀글 설정 */}
          <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isSecret"
                checked={formData.isSecret}
                onChange={(e) =>
                  handleInputChange("isSecret", e.target.checked)
                }
                className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-800 dark:bg-neutral-700 dark:border-neutral-600"
              />
              <label
                htmlFor="isSecret"
                className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                {formData.isSecret ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-600" />
                    비밀글로 작성
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 text-green-600" />
                    공개글로 작성
                  </>
                )}
              </label>
            </div>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              {formData.isSecret
                ? "작성자와 관리자만 볼 수 있는 비밀글입니다."
                : "모든 사용자가 볼 수 있는 공개글입니다."}
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
                onClick={() => navigate("/")}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditMode ? "수정 중..." : "등록 중..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditMode ? "수정하기" : "등록하기"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* 작성 가이드 */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
          💡 질문 작성 가이드
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• 구체적이고 명확한 제목을 작성해주세요.</li>
          <li>• 문제 상황을 자세히 설명해주세요.</li>
          <li>• 시도해본 해결 방법이 있다면 함께 적어주세요.</li>
          <li>• 개인정보가 포함된 내용은 비밀글로 작성해주세요.</li>
          <li>• 관리자가 빠른 시일 내에 답변드릴 예정입니다.</li>
        </ul>
      </Card>
    </motion.div>
  );
};

export default QnAForm;
