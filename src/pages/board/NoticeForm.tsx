import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { createNotice, updateNotice, getNoticeById } from '@/services/noticeService';
import { useAuth } from '@/contexts/AuthContext';
import { Notice } from '@/types';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const NoticeForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { userData } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '일반',
    isPinned: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      fetchNotice(id);
    }
  }, [id, isEditMode]);

  const fetchNotice = async (noticeId: string) => {
    try {
      const data = await getNoticeById(noticeId);
      if (data) {
        setFormData({
          title: data.title,
          content: data.content,
          category: data.category,
          isPinned: data.isPinned || false,
        });
      }
    } catch (error) {
      console.error('Error loading notice:', error);
      setError('공지사항을 불러오는데 실패했습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      setLoading(false);
      return;
    }

    if (!formData.content.trim()) {
      setError('내용을 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      const noticeData = {
        ...formData,
        author: userData?.displayName || '관리자',
        authorId: userData?.uid || '',
      };

      if (isEditMode && id) {
        await updateNotice(id, noticeData);
      } else {
        await createNotice(noticeData as Omit<Notice, 'id' | 'createdAt' | 'updatedAt' | 'views'>);
      }

      navigate('/board/notice');
    } catch (error) {
      console.error('Error saving notice:', error);
      setError('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 관리자가 아니면 접근 불가
  if (userData?.role !== 'admin') {
    navigate('/board/notice');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/board/notice')}
            className="mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            목록으로
          </Button>

          <Card className="p-8">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              {isEditMode ? '공지사항 수정' : '공지사항 작성'}
            </h1>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  카테고리
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="일반">일반</option>
                  <option value="중요">중요</option>
                  <option value="이벤트">이벤트</option>
                  <option value="시스템">시스템</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="제목을 입력하세요"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  내용
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="내용을 입력하세요"
                  required
                />
              </div>

              {/* Pin */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPinned"
                  name="isPinned"
                  checked={formData.isPinned}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="isPinned" className="ml-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  상단 고정
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center space-x-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <Button
                  type="submit"
                  isLoading={loading}
                  disabled={loading}
                  className="flex-1"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? '저장 중...' : isEditMode ? '수정하기' : '등록하기'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/board/notice')}
                  disabled={loading}
                >
                  취소
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NoticeForm;
