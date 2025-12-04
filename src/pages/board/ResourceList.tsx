import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Search,
  FileSpreadsheet,
  File,
  FilePlus,
  Eye,
} from 'lucide-react';
import { getResources, downloadFile } from '../../services/resourceService';
import { useAuth } from '../../contexts/AuthContext';
import type { Resource } from '../../types';

const categoryOptions = [
  { value: 'all', label: '전체', color: 'blue' },
  { value: 'manual', label: '매뉴얼', color: 'green' },
  { value: 'form', label: '신청서', color: 'purple' },
  { value: 'report', label: '보고서', color: 'orange' },
  { value: 'certificate', label: '성적서', color: 'pink' },
  { value: 'other', label: '기타', color: 'gray' },
];

const getFileIcon = (fileType: string) => {
  if (fileType.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
  if (fileType.includes('spreadsheet') || fileType.includes('excel')) return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
  if (fileType.includes('word') || fileType.includes('document')) return <FileText className="w-8 h-8 text-blue-500" />;
  if (fileType.includes('image')) return <File className="w-8 h-8 text-purple-500" />;
  return <File className="w-8 h-8 text-gray-500" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const ResourceList: React.FC = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchResources();
  }, [selectedCategory]);

  useEffect(() => {
    filterResources();
  }, [searchQuery, resources]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await getResources(selectedCategory === 'all' ? undefined : selectedCategory);
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    if (!searchQuery.trim()) {
      setFilteredResources(resources);
      return;
    }

    const filtered = resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResources(filtered);
  };

  const handleDownload = async (resource: Resource) => {
    try {
      await downloadFile(resource.fileUrl, resource.fileName, resource.id);
    } catch (error) {
      console.error('Failed to download file:', error);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  const getCategoryColor = (category: string) => {
    const option = categoryOptions.find((opt) => opt.value === category);
    return option?.color || 'gray';
  };

  const getCategoryLabel = (category: string) => {
    const option = categoryOptions.find((opt) => opt.value === category);
    return option?.label || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            자료실
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            분석 관련 자료를 다운로드하실 수 있습니다
          </p>
        </motion.div>

        {/* Filter & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedCategory(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === option.value
                    ? `bg-${option.color}-500 text-white shadow-md`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="제목 또는 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Admin Upload Button */}
          {user?.role === 'admin' && (
            <div className="mt-4 flex justify-end">
              <Link
                to="/board/resources/upload"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-md"
              >
                <FilePlus className="w-5 h-5" />
                <span>자료 업로드</span>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Resource List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">자료를 불러오는 중...</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {searchQuery ? '검색 결과가 없습니다.' : '등록된 자료가 없습니다.'}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
              >
                {/* File Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(resource.fileType)}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(
                      resource.category
                    )}-100 text-${getCategoryColor(resource.category)}-800`}
                  >
                    {getCategoryLabel(resource.category)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {resource.description}
                </p>

                {/* File Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>{formatFileSize(resource.fileSize)}</span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {resource.downloads}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {resource.views}
                  </span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(resource)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>다운로드</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
