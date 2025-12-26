import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Clock, User, Trash2, Send } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.core";
import { getQnAById, deleteQnA, addAnswer } from "../../services/qnaService";
import { QnA } from "../../types";

const QnADetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [qna, setQnA] = useState<QnA | null>(null);
  const [loading, setLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // QnA 데이터 로드
  useEffect(() => {
    const loadQnA = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const qnaData = await getQnAById(id);

        if (!qnaData) {
          return;
        }

        // 비밀글인 경우 권한 확인
        if (
          qnaData.isSecret &&
          qnaData.authorId !== user?.uid &&
          userData?.role !== "admin"
        ) {
          alert("비밀글입니다. 작성자와 관리자만 볼 수 있습니다.");
          navigate("/");
          return;
        }

        setQnA(qnaData);

        // 조회수는 자동으로 증가됨
      } catch (error) {
        console.error("QnA 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQnA();
  }, [id, user, userData, navigate]);

  const handleDelete = async () => {
    if (!qna || !user) return;

    // 권한 확인
    if (qna.authorId !== user.uid && userData?.role !== "admin") {
      alert("삭제 권한이 없습니다.");
      return;
    }

      if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteQnA(qna.id);
        navigate("/");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answerContent.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    if (!id || !user || userData?.role !== "admin") {
      alert("답변 권한이 없습니다.");
      return;
    }

    try {
      setSubmitting(true);
      await addAnswer(
        id,
        answerContent,
        user.uid,
        userData?.displayName || user.displayName || "관리자"
      );
      alert("답변이 등록되었습니다.");
      
      // QnA 데이터 다시 로드
      const updatedQnA = await getQnAById(id);
      if (updatedQnA) {
        setQnA(updatedQnA);
      }
      setAnswerContent("");
    } catch (error) {
      console.error("답변 등록 실패:", error);
      alert("답변 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateValue: string | Date) => {
    const date =
      typeof dateValue === "string" ? new Date(dateValue) : dateValue;
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "general":
        return "일반문의";
      case "technical":
        return "기술문의";
      case "account":
        return "계정문의";
      case "complaint":
        return "불만신고";
      default:
        return category;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!qna) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">
            게시글을 찾을 수 없습니다
          </h2>
          <Link to="/" className="text-primary-600 hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 상단 네비게이션 */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로 돌아가기
        </Link>
      </div>

      {/* QnA 상세 내용 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* 헤더 */}
        <div className="bg-neutral-50 dark:bg-neutral-800 p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
                  {getCategoryLabel(qna.category)}
                </span>
                {qna.isSecret && (
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                    비밀글
                  </span>
                )}
                {qna.status === "answered" && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    답변완료
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {qna.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{qna.authorName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(qna.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>조회 {qna.views || 0}</span>
                </div>
              </div>
            </div>

            {/* 관리 버튼 */}
            {(qna.authorId === user?.uid || userData?.role === "admin") && (
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 border border-neutral-300 dark:border-neutral-600 rounded hover:border-primary-600 transition-colors"
                >
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:border-red-600 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: qna.content.replace(/\n/g, "<br>"),
            }}
          />
        </div>

        {/* 답변 섹션 */}
        {qna.status === "answered" && qna.answerContent && (
          <div className="border-t border-neutral-200 dark:border-neutral-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                관리자 답변
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {qna.answeredBy || "관리자"}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatDate(qna.answeredAt || qna.createdAt)}
                    </span>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert">
                    <p>{qna.answerContent}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 관리자 답변 작성 폼 (답변 전에만 표시) */}
        {userData?.role === "admin" && qna.status !== "answered" && (
          <div className="border-t border-neutral-200 dark:border-neutral-700">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                관리자 답변 작성
              </h3>
              <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">
                고객 문의에 대한 답변을 작성해주세요
              </p>
            </div>
            <div className="p-6 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="답변 내용을 입력하세요..."
                className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none shadow-sm"
                rows={10}
                disabled={submitting}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setAnswerContent("")}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl transition-all"
                  disabled={submitting}
                >
                  초기화
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={submitting || !answerContent.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "답변 등록 중..." : "답변 등록"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QnADetail;
