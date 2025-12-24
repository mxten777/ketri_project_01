/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  Heart,
  Edit,
  Trash2,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import Button from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import {
  getFreePost,
  incrementFreePostViews,
  incrementFreePostLikes,
  deleteFreePost,
} from "../../services/freeService";
import type { FreePost } from "../../types";

const FreeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [post, setPost] = useState<FreePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getFreePost(id);
      setPost(data);
      await incrementFreePostViews(id);
      } catch (error) {
      console.error("게시글 조회 실패:", error);
      alert("게시글을 불러오는데 실패했습니다.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !post) return;
    if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
        await deleteFreePost(id);
        alert("게시글이 삭제되었습니다.");
        navigate("/");
      } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleLike = async () => {
    if (!id || hasLiked) return;

    try {
      await incrementFreePostLikes(id);
      setHasLiked(true);
      if (post) {
        setPost({ ...post, likes: (post.likes || 0) + 1 });
      }
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };

  const formatDate = (timestamp: unknown): string => {
    if (!timestamp) return "";
    try {
      const tsObj = timestamp as unknown;
      let date: Date;
      if (tsObj && typeof ((tsObj as { toDate?: unknown }).toDate) === "function") {
        date = ((tsObj as { toDate: () => Date }).toDate)();
      } else {
        date = new Date(String(timestamp));
      }
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      return "";
    }
  };

  const canEdit = user?.uid === post?.authorId || userData?.role === "admin";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다</h1>
        <Button onClick={() => navigate("/")}>목록으로</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-primary-900/20">
      <div className="container mx-auto px-4">
        <section className="pt-10 lg:pt-12 pb-12 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
          {/* 뒤로가기 */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>

          {/* 게시글 카드 */}
          <div data-has-hero className="bg-white dark:bg-neutral-800 rounded-2xl shadow-premium overflow-hidden">
            {/* 헤더 */}
            <div className="p-8 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      <span>{post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{post.views || 0}</span>
                    </div>
                  </div>
                </div>
                {canEdit && (
                  <div className="flex gap-2">
                    <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/`)}
                        >
                      <Edit className="w-4 h-4 mr-2" />
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDelete}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* 본문 */}
            <div className="p-8">
              <div
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* 액션 */}
            <div className="p-8 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handleLike}
                  disabled={hasLiked}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors ${
                    hasLiked
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                      : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`}
                  />
                  <span className="font-medium">
                    좋아요 {post.likes || 0}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 목록으로 버튼 */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="px-8"
            >
              목록으로
            </Button>
          </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default FreeDetail;
