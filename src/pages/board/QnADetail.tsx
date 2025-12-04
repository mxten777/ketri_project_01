import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Lock, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { getQnaById, deleteQna, addComment, deleteComment, toggleAnswered } from '../../services/qnaService';
import { useAuth } from '../../contexts/AuthContext';
import type { QnA } from '../../types';

const QnADetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [qna, setQna] = useState<QnA | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchQnA();
    }
  }, [id]);

  const fetchQnA = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getQnaById(id);
      
      if (!data) {
        alert('존재하지 않는 게시글입니다.');
        navigate('/board/qna');
        return;
      }

      // 비밀글 권한 체크
      if (data.isSecret && !user) {
        alert('로그인이 필요한 게시글입니다.');
        navigate('/auth/login');
        return;
      }

      if (data.isSecret && user?.uid !== data.authorId && user?.role !== 'admin') {
        alert('작성자 또는 관리자만 볼 수 있는 게시글입니다.');
        navigate('/board/qna');
        return;
      }

      setQna(data);
    } catch (error) {
      console.error('Error fetching QnA:', error);
      alert('게시글을 불러오는 데 실패했습니다.');
      navigate('/board/qna');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!qna || !id) return;
    
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteQna(id);
      alert('게시글이 삭제되었습니다.');
      navigate('/board/qna');
    } catch (error) {
      console.error('Error deleting QnA:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !user || !commentContent.trim()) return;

    try {
      setIsSubmitting(true);
      await addComment(id, {
        authorId: user.uid,
        authorName: user.displayName || '익명',
        content: commentContent,
        isAdmin: user.role === 'admin',
      });

      setCommentContent('');
      await fetchQnA();
      alert('댓글이 등록되었습니다.');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('댓글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!id || !window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await deleteComment(id, commentId);
      await fetchQnA();
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleToggleAnswered = async () => {
    if (!id || !qna) return;

    try {
      await toggleAnswered(id, !qna.isAnswered);
      await fetchQnA();
    } catch (error) {
      console.error('Error toggling answered status:', error);
      alert('답변 상태 변경에 실패했습니다.');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      general: '일반문의',
      service: '서비스문의',
      technical: '기술문의',
      account: '계정문의',
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      service: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      technical: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      account: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!qna) {
    return null;
  }

  const isAuthor = user?.uid === qna.authorId;
  const isAdmin = user?.role === 'admin';
  const canEdit = isAuthor || isAdmin;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="section container-custom max-w-4xl">
        {/* 뒤로 가기 */}
        <Link
          to="/board/qna"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          목록으로
        </Link>

        {/* 게시글 헤더 */}
        <div className="card p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(qna.category)}`}>
              {getCategoryLabel(qna.category)}
            </span>
            {qna.isSecret && (
              <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                <Lock className="w-3 h-3" />
                비밀글
              </span>
            )}
            {qna.isAnswered ? (
              <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                <CheckCircle className="w-4 h-4" />
                답변완료
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                <Clock className="w-4 h-4" />
                답변대기
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">{qna.title}</h1>

          <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 pb-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-4">
              <span className="font-medium">{qna.authorName}</span>
              <span>•</span>
              <span>{formatDate(qna.createdAt)}</span>
              <span>•</span>
              <span>조회 {qna.views || 0}</span>
            </div>

            {canEdit && (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={handleToggleAnswered}
                    className="btn btn-sm btn-outline"
                  >
                    {qna.isAnswered ? '답변대기로 변경' : '답변완료로 변경'}
                  </button>
                )}
                <Link
                  to={`/board/qna/edit/${id}`}
                  className="btn btn-sm btn-outline"
                >
                  <Edit2 className="w-4 h-4" />
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-sm btn-outline text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                  삭제
                </button>
              </div>
            )}
          </div>

          {/* 게시글 내용 */}
          <div className="prose dark:prose-invert max-w-none mt-6">
            <div className="whitespace-pre-wrap">{qna.content}</div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            댓글 {qna.comments?.length || 0}개
          </h2>

          {/* 댓글 목록 */}
          <div className="space-y-4 mb-8">
            {qna.comments && qna.comments.length > 0 ? (
              qna.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg ${
                    comment.isAdmin 
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600' 
                      : 'bg-neutral-100 dark:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{comment.authorName}</span>
                      {comment.isAdmin && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary-600 text-white">
                          관리자
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {formatDate(comment.createdAt)}
                      </span>
                      {(user?.uid === comment.authorId || isAdmin) && (
                        <button
                          onClick={() => handleCommentDelete(comment.id)}
                          className="text-red-600 dark:text-red-400 hover:underline text-sm"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
                아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
              </p>
            )}
          </div>

          {/* 댓글 작성 폼 */}
          {user ? (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !commentContent.trim()}
                  className="btn btn-primary"
                >
                  {isSubmitting ? '등록 중...' : '댓글 등록'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                댓글을 작성하시려면 로그인이 필요합니다.
              </p>
              <Link to="/auth/login" className="btn btn-primary">
                로그인하기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QnADetail;
