import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Filter,
  Trash2,
  Edit,
  Plus,
  FileIcon,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getResources, deleteResource } from "../../services/resourceService";
import { formatFirebaseTimestamp } from "../../utils/dateUtils";
import type { Resource } from "../../types";

import Button from "../../components/common/Button";

const ResourceAdmin = () => {
  const { userData } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "manual" | "form" | "report" | "certificate" | "other"
  >("all");

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await getResources(filter === "all" ? undefined : filter);
      setResources(data);
    } catch (error) {
      console.error("자료실 조회 실패:", error);
      alert("자료를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData || userData.role !== "admin") {
      return;
    }
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, filter]);

  const handleDeleteResource = async (resourceId: string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteResource(resourceId, "" /* filePath not needed */);
      setResources((prev) => prev.filter((res) => res.id !== resourceId));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("자료 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      manual: "매뉴얼",
      form: "신청서",
      report: "보고서",
      certificate: "성적서",
      other: "기타",
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      manual:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      form: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      report:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      certificate:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
    return colors[category] || colors.other;
  };

  if (!userData || userData.role !== "admin") {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          접근 권한이 없습니다
        </h2>
        <p className="text-gray-300">
          관리자만 접근할 수 있는 페이지입니다.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">자료실 관리</h2>
            <p className="text-gray-300">
              업로드된 자료를 관리하고 새로운 자료를 추가할 수 있습니다.
            </p>
          </div>

          <Link
            to="/admin/resources/create"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            자료 업로드
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8">
          <Filter className="w-5 h-5 text-neutral-400" />
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "all", label: "전체" },
              { value: "manual", label: "매뉴얼" },
              { value: "form", label: "신청서" },
              { value: "report", label: "보고서" },
              { value: "certificate", label: "성적서" },
              { value: "other", label: "기타" },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === cat.value
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {resources.length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  총 자료 수
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {resources.reduce((sum, r) => sum + (r.downloads || 0), 0)}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  총 다운로드
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {resources.reduce((sum, r) => sum + (r.views || 0), 0)}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  총 조회수
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {new Set(resources.map((r) => r.category)).size}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  카테고리 수
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resource List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              로딩 중...
            </p>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">
              자료가 없습니다.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">제목</th>
                    <th className="text-left py-4 px-6 font-semibold">
                      카테고리
                    </th>
                    <th className="text-left py-4 px-6 font-semibold">
                      파일정보
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      다운로드
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      조회수
                    </th>
                    <th className="text-left py-4 px-6 font-semibold">
                      업로드일
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {resources.map((resource) => (
                    <tr
                      key={resource.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium line-clamp-1 mb-1">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                            resource.category
                          )}`}
                        >
                          {getCategoryLabel(resource.category)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div className="font-medium">{resource.fileName}</div>
                          <div className="text-neutral-500 dark:text-neutral-400">
                            {formatFileSize(resource.fileSize)}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Download className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm">
                            {resource.downloads || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm">{resource.views || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar className="w-4 h-4" />
                          {formatFirebaseTimestamp(resource.createdAt)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            to={`/board/resources/edit/${resource.id}`}
                            className="p-1 text-neutral-400 hover:text-primary-500 transition-colors"
                            title="수정"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteResource(resource.id)}
                            className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
  );
};

export default ResourceAdmin;
