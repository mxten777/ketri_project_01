import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Eye, 
  User, 
  Calendar,
  Filter,

  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getQnAs, deleteQna, toggleAnswered } from '../../services/qnaService';
import type { QnA } from '../../types';

const QnAAdmin = () => {
  const { user, userData } = useAuth();
  const [qnas, setQnas] = useState<QnA[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'answered' | 'pending'>('all');

  useEffect(() => {
    if (!userData || userData.role !== 'admin') {
      return;
    }
    fetchQnAs();
  }, [userData, filter]);

  const fetchQnAs = async () => {
    try {
      setLoading(true);
      const data = await getQnAs();
      
      let filteredData = data;
      if (filter === 'answered') {
        filteredData = data.filter(qna => qna.isAnswered);
      } else if (filter === 'pending') {
        filteredData = data.filter(qna => !qna.isAnswered);
      }
      
      setQnas(filteredData);
    } catch (error) {
      console.error('Error fetching QnAs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAnswered = async (qnaId: string, isAnswered: boolean) => {
    try {
      await toggleAnswered(qnaId, !isAnswered);
      fetchQnAs(); // 목록 새로고침
    } catch (error) {
      console.error('Error toggling answered status:', error);
      alert('답변 상태 변경에 실패했습니다.');
    }
  };

  const handleDeleteQnA = async (qnaId: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteQna(qnaId);
      fetchQnAs(); // 목록 새로고침
      alert('삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting QnA:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const formatDate = (timestamp: { seconds: number; nanoseconds: number } | null) => {
    if (!timestamp) return '';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">접근 권한이 없습니다</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            관리자만 접근할 수 있는 페이지입니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">QnA 관리</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              고객 문의사항을 관리하고 답변할 수 있습니다.
            </p>
          </div>
          
          {/* 필터 */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'answered' | 'pending')}
              className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
            >
              <option value="all">전체</option>
              <option value="pending">미답변</option>
              <option value="answered">답변완료</option>
            </select>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {qnas.length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">전체 문의</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {qnas.filter(q => !q.isAnswered).length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">미답변</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {qnas.filter(q => q.isAnswered).length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">답변완료</div>
              </div>
            </div>
          </div>
        </div>

        {/* QnA 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">로딩 중...</p>
          </div>
        ) : qnas.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">문의가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-600">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">제목</th>
                    <th className="text-left py-4 px-6 font-semibold">작성자</th>
                    <th className="text-left py-4 px-6 font-semibold">카테고리</th>
                    <th className="text-center py-4 px-6 font-semibold">상태</th>
                    <th className="text-center py-4 px-6 font-semibold">조회수</th>
                    <th className="text-left py-4 px-6 font-semibold">작성일</th>
                    <th className="text-center py-4 px-6 font-semibold">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {qnas.map((qna) => (
                    <tr key={qna.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-medium line-clamp-1 mb-1">
                              {qna.title}
                            </h3>
                            {qna.isSecret && (
                              <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full">
                                비밀글
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm">{qna.authorName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
                          {qna.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleToggleAnswered(qna.id, qna.isAnswered)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            qna.isAnswered
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200'
                          }`}
                        >
                          {qna.isAnswered ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              답변완료
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              미답변
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm">{qna.views || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(qna.createdAt)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => window.open(`/board/qna/${qna.id}`, '_blank')}
                            className="p-1 text-neutral-400 hover:text-primary-500 transition-colors"
                            title="상세보기"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQnA(qna.id)}
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
    </div>
  );
};

export default QnAAdmin;