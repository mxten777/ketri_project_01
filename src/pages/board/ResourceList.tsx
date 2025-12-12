import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Search,
  FileSpreadsheet,
  File,
  FilePlus,
  Eye,
  Filter,
  Upload,
  Calendar,
  User,
} from 'lucide-react';
import { getResources, downloadFile } from '../../services/resourceService';
import { useAuth } from '../../contexts/AuthContext';
import type { Resource } from '../../types';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const categories = [
  { value: 'all', label: '전체', icon: FileText },
  { value: 'manual', label: '매뉴얼', icon: FileText },
  { value: 'form', label: '신청서', icon: FileSpreadsheet },
  { value: 'report', label: '보고서', icon: FileText },
  { value: 'certificate', label: '성적서', icon: File },
  { value: 'other', label: '기타', icon: File },
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
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'downloads' | 'name'>('latest');

  // 데이터 로드
  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const data = await getResources(selectedCategory === 'all' ? undefined : selectedCategory);
        setResources(data);
      } catch (error) {
        console.error('자료실 로드 오류:', error);
        alert('자료를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [selectedCategory]);

  // 필터링 및 정렬
  const filteredAndSortedResources = React.useMemo(() => {
    let filtered = resources;

    // 검색 필터
    if (searchQuery.trim()) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return b.createdAt.seconds - a.createdAt.seconds;
        case 'oldest':
          return a.createdAt.seconds - b.createdAt.seconds;
        case 'downloads':
          return (b.downloads || 0) - (a.downloads || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [resources, searchQuery, sortBy]);

  // 파일 다운로드
  const handleDownload = async (resource: Resource) => {
    try {
      await downloadFile(resource.fileUrl, resource.fileName, resource.id);
    } catch (error) {
      console.error('파일 다운로드 오류:', error);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  // 날짜 포맷팅
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    } catch (error) {
      return '';
    }
  };

  // 카테고리 라벨 가져오기
  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 헤더 */}
      <Card className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              자료실
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              분석 관련 자료 및 문서를 다운로드하실 수 있습니다
            </p>
          </div>
          {userData?.role === 'admin' && (
            <Button 
              onClick={() => navigate('/board/resources/upload')}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              자료 업로드
            </Button>
          )}
        </div>
      </Card>

      {/* 필터 및 검색 */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 카테고리 필터 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* 정렬 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              정렬
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="downloads">다운로드순</option>
              <option value="name">이름순</option>
            </select>
          </div>

          {/* 검색 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              검색
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="제목 또는 설명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* 자료 목록 */}
      <div className="space-y-4">
        {loading ? (
          <Card className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">자료를 불러오는 중...</p>
          </Card>
        ) : filteredAndSortedResources.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              자료가 없습니다
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {searchQuery ? '검색 결과가 없습니다.' : '등록된 자료가 없습니다.'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAndSortedResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600">
                    <div className="flex flex-col h-full">
                      {/* 파일 아이콘 및 카테고리 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-shrink-0">
                          {getFileIcon(resource.fileType)}
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                          {getCategoryLabel(resource.category)}
                        </span>
                      </div>

                      {/* 제목 */}
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2 flex-grow">
                        {resource.title}
                      </h3>

                      {/* 설명 */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 flex-grow">
                        {resource.description}
                      </p>

                      {/* 메타 정보 */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                        <span>{formatFileSize(resource.fileSize)}</span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {resource.downloads || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {resource.views || 0}
                        </span>
                      </div>

                      {/* 업로드 정보 */}
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                        <User className="w-3 h-3" />
                        <span>{resource.uploadedBy?.name || '관리자'}</span>
                        <Calendar className="w-3 h-3 ml-2" />
                        <span>{formatDate(resource.createdAt)}</span>
                      </div>

                      {/* 다운로드 버튼 */}
                      <Button
                        onClick={() => handleDownload(resource)}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        다운로드
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResourceList;
