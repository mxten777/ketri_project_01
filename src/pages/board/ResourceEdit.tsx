import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/common/Button";
import {
  getResourceById,
  updateResource,
} from "../../services/resourceService";
import type { Resource } from "../../types";

const categoryOptions = [
  { value: "manual", label: "매뉴얼" },
  { value: "form", label: "신청서" },
  { value: "report", label: "보고서" },
  { value: "certificate", label: "성적서" },
  { value: "other", label: "기타" },
];

const ResourceEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "manual" as Resource["category"],
    isPublic: true,
  });

  useEffect(() => {
    if (!userData || userData.role !== "admin") {
      navigate("/board/resources");
      return;
    }

    if (id) {
      fetchResource();
    }
  }, [id, userData, navigate]);

  const fetchResource = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getResourceById(id);

      if (!data) {
        alert("존재하지 않는 자료입니다.");
        navigate("/admin/resources");
        return;
      }

      setResource(data);
      setFormData({
        title: data.title,
        description: data.description,
        category: data.category,
        isPublic: data.isPublic,
      });
    } catch (error) {
      console.error("Error fetching resource:", error);
      alert("자료를 불러오는데 실패했습니다.");
      navigate("/admin/resources");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !resource) return;

    // 유효성 검사
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.description.trim()) {
      alert("설명을 입력해주세요.");
      return;
    }

    try {
      setSaving(true);

      await updateResource(id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        isPublic: formData.isPublic,
      });

      alert("자료가 수정되었습니다.");
      navigate("/admin/resources");
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("자료 수정에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (!userData || userData.role !== "admin") {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            접근 권한이 없습니다
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            관리자만 접근할 수 있는 페이지입니다.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            자료를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            자료를 찾을 수 없습니다
          </h1>
          <Link to="/admin/resources" className="btn btn-primary">
            자료실 관리로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="section container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/admin/resources"
              className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <ArrowLeft className="w-5 h-5" />
              자료실 관리
            </Link>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600"></div>
            <h1 className="text-2xl font-bold">자료 수정</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 기본 정보 */}
            <div className="card p-8">
              <h2 className="text-xl font-bold mb-6">기본 정보</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="자료 제목을 입력하세요"
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    공개 설정
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isPublic"
                        value="true"
                        checked={formData.isPublic}
                        onChange={() =>
                          setFormData((prev) => ({ ...prev, isPublic: true }))
                        }
                        className="w-4 h-4 text-primary-600"
                      />
                      <span>공개</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isPublic"
                        value="false"
                        checked={!formData.isPublic}
                        onChange={() =>
                          setFormData((prev) => ({ ...prev, isPublic: false }))
                        }
                        className="w-4 h-4 text-primary-600"
                      />
                      <span>비공개</span>
                    </label>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    설명 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="자료에 대한 설명을 입력하세요"
                    rows={4}
                    className="input w-full resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 파일 정보 */}
            <div className="card p-8">
              <h2 className="text-xl font-bold mb-6">현재 파일 정보</h2>

              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                      파일명
                    </div>
                    <div className="font-medium">{resource.fileName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                      파일 크기
                    </div>
                    <div className="font-medium">
                      {(resource.fileSize / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                      파일 형식
                    </div>
                    <div className="font-medium">{resource.fileType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                      다운로드 수
                    </div>
                    <div className="font-medium">
                      {resource.downloads || 0}회
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    ※ 파일 자체는 수정할 수 없습니다. 파일을 변경하려면 새로
                    업로드해주세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 justify-end">
              <Link
                to="/admin/resources"
                className="btn btn-outline flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                취소
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    저장
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourceEdit;
