import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Pin, Eye, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { getNotices, deleteNotice } from '@/services/noticeService';
import { useAuth } from '@/contexts/AuthContext';
import { Notice } from '@/types';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const NoticeList = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();
  const navigate = useNavigate();
  const isAdmin = userData?.role === 'admin';

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await getNotices(20);
      setNotices(data);
    } catch (error) {
      console.error('Error loading notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteNotice(id);
      setNotices(notices.filter(notice => notice.id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 py-12">
      <div className="container-custom max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                공지사항
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                한국환경안전연구소의 새로운 소식을 확인하세요
              </p>
            </div>
            {isAdmin && (
              <Button onClick={() => navigate('/board/notice/create')}>
                <Plus className="w-5 h-5 mr-2" />
                글쓰기
              </Button>
            )}
          </div>

          {/* Notice List */}
          <div className="space-y-4">
            {notices.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-neutral-500 dark:text-neutral-400">
                  등록된 공지사항이 없습니다.
                </p>
              </Card>
            ) : (
              notices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className={`p-6 hover:shadow-premium transition-all duration-200 ${
                    notice.isPinned ? 'border-2 border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : ''
                  }`}>
                    <div className="flex items-start justify-between">
                      <Link 
                        to={`/board/notice/${notice.id}`}
                        className="flex-1 group"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          {notice.isPinned && (
                            <span className="flex items-center space-x-1 text-primary-500 text-sm font-medium">
                              <Pin className="w-4 h-4" />
                              <span>고정</span>
                            </span>
                          )}
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                            {notice.category}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                          {notice.title}
                        </h2>
                        
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                          {notice.content}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-500">
                          <span className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{notice.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(notice.createdAt)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{notice.views || 0}</span>
                          </span>
                        </div>
                      </Link>
                      
                      {isAdmin && (
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => navigate(`/board/notice/edit/${notice.id}`)}
                            className="p-2 text-neutral-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                            title="수정"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(notice.id!)}
                            className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="삭제"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoticeList;
