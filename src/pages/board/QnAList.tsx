import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, CheckCircle, Clock, Search } from 'lucide-react';
import { getQnAs } from '../../services/qnaService';
import { useAuth } from '../../contexts/AuthContext';
import type { QnA } from '../../types';

const QnAList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [qnas, setQnas] = useState<QnA[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'general', label: '일반문의' },
    { value: 'service', label: '서비스문의' },
    { value: 'technical', label: '기술문의' },
    { value: 'account', label: '계정문의' },
  ];

  useEffect(() => {
    fetchQnAs();
  }, [selectedCategory]);

  const fetchQnAs = async () => {
    try {
      setLoading(true);
      const data = await getQnAs(selectedCategory);
      setQnas(data);
    } catch (error) {
      console.error('Error fetching QnAs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQnAs = qnas.filter(qna =>
    qna.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qna.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      service: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      technical: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      account: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300';
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  const handleQnAClick = (qna: QnA) => {
    // 비밀글 체크
    if (qna.isSecret && !user) {
      alert('로그인이 필요한 게시글입니다.');
      navigate('/auth/login');
      return;
    }

    if (qna.isSecret && user?.uid !== qna.authorId && user?.role !== 'admin') {
      alert('작성자 또는 관리자만 볼 수 있는 게시글입니다.');
      return;
    }

    navigate(`/board/qna/${qna.id}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Q&A 게시판</h1>
          <p className="text-lg">궁금한 점을 질문하고 답변을 받아보세요</p>
        </div>
      </div>

      <div className="section container-custom">
        {/* 검색 및 필터 */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 카테고리 필터 */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 검색 */}
            <div className="flex-1 lg:max-w-md ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 글쓰기 버튼 */}
            {user && (
              <Link
                to="/board/qna/new"
                className="btn btn-primary whitespace-nowrap"
              >
                <MessageSquare className="w-5 h-5" />
                질문하기
              </Link>
            )}
          </div>
        </div>

        {/* QnA 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">게시글을 불러오는 중...</p>
          </div>
        ) : filteredQnAs.length === 0 ? (
          <div className="card p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 질문이 없습니다.'}
            </p>
            {user && !searchTerm && (
              <Link to="/board/qna/new" className="btn btn-primary">
                첫 질문 등록하기
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQnAs.map((qna) => (
              <div
                key={qna.id}
                onClick={() => handleQnAClick(qna)}
                className="card p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  {/* 상태 아이콘 */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    qna.isAnswered 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    {qna.isAnswered ? (
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    )}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(qna.category)}`}>
                        {getCategoryLabel(qna.category)}
                      </span>
                      {qna.isSecret && (
                        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          <Lock className="w-3 h-3" />
                          비밀글
                        </span>
                      )}
                      {qna.isAnswered && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 font-medium">
                          답변완료
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                      {qna.title}
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                      {qna.content}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <span>{qna.authorName}</span>
                      <span>•</span>
                      <span>{formatDate(qna.createdAt)}</span>
                      <span>•</span>
                      <span>조회 {qna.views || 0}</span>
                      {qna.comments && qna.comments.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {qna.comments.length}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 안내 메시지 */}
        {!user && (
          <div className="card p-6 mt-8 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
            <p className="text-neutral-700 dark:text-neutral-300">
              💡 질문을 등록하시려면 <Link to="/auth/login" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">로그인</Link>이 필요합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QnAList;
