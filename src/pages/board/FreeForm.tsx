/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import Button from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import {
  createFreePost,
  getFreePost,
  updateFreePost,
} from "../../services/freeService";
import type { FreeFormData } from "../../types";

const FreeForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FreeFormData>({
    title: "",
    content: "",
    category: "general",
  });

  const categories = [
    { value: "general", label: "자유" },
    { value: "tip", label: "팁" },
    { value: "review", label: "후기" },
    { value: "question", label: "질문" },
    { value: "discussion", label: "토론" },
  ];

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    if (!id) return;

    try {
      const post = await getFreePost(id);
      if (!post) {
        alert("게시글을 불러오는데 실패했습니다.");
        navigate("/");
        return;
      }

      if (post.authorId !== user?.uid && userData?.role !== "admin") {
        alert("수정 권한이 없습니다.");
        navigate("/");
        return;
      }
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category,
      });
    } catch (error) {
      console.error("게시글 조회 실패:", error);
      alert("게시글을 불러오는데 실패했습니다.");
      navigate("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !userData) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      if (id) {
        // 수정
        await updateFreePost(id, formData);
        alert("게시글이 수정되었습니다.");
        navigate(`/`);
      } else {
        // 작성
        const postId = await createFreePost({
          ...formData,
          authorId: user.uid,
          authorName: userData.displayName,
          authorEmail: userData.email,
          views: 0,
          likes: 0,
          comments: [],
        });
        alert("게시글이 작성되었습니다.");
        navigate(`/`);
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-primary-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* 헤더 */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Button>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
              {id ? "게시글 수정" : "게시글 작성"}
            </h1>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-premium p-8 space-y-6">
              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  카테고리 *
                </label>
                <select
                  value={formData.category}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as FreeFormData['category'],
                    })
                  }
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
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
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="제목을 입력하세요"
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  내용 *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="내용을 입력하세요"
                  rows={15}
                  className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 resize-none"
                  required
                />
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                취소
              </Button>
              <Button type="submit" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "저장 중..." : id ? "수정하기" : "작성하기"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FreeForm;
