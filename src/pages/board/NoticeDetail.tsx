import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Eye, Edit, Trash2, Pin } from 'lucide-react';
import { getNoticeById, deleteNotice } from '@/services/noticeService';
import { useAuth } from '@/contexts/AuthContext';
import { Notice } from '@/types';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const NoticeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();
  const navigate = useNavigate();
  const isAdmin = userData?.role === 'admin';

  useEffect(() => {
    if (id) {
      fetchNotice(id);
    }
  }, [id]);

  const fetchNotice = async (noticeId: string) => {
    try {
      setLoading(true);
      const data = await getNoticeById(noticeId);
      setNotice(data);
    } catch (error) {
      console.error('Error loading notice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteNotice(id!);
      navigate('/board/notice');
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            공지사항을 찾을 수 없습니다
          </h2>
          <Button onClick={() => navigate('/board/notice')}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            목록으로
          </Button>
        </div>
      </div>
    );
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
            {/* Header */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 pb-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                {notice.isPinned && (
                  <span className="flex items-center space-x-1 text-primary-500 text-sm font-medium">
                    <Pin className="w-4 h-4" />
                    <span>고정</span>
                  </span>
                )}
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                  {notice.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                {notice.title}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{notice.author}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(notice.createdAt)}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{notice.views || 0}</span>
                  </span>
                </div>

                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/board/notice/edit/${id}`)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDelete}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
                {notice.content}
              </div>
            </div>

            {/* Attachments */}
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  첨부파일
                </h3>
                <div className="space-y-2">
                  {notice.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {file.name}
                      </span>
                      <span className="text-xs text-neutral-500">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Navigation */}
          <div className="mt-6 flex justify-center">
            <Button onClick={() => navigate('/board/notice')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              목록으로
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoticeDetail;
