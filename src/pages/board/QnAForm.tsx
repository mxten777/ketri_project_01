import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { createQna, updateQna, getQnaById } from '../../services/qnaService';
import { useAuth } from '../../contexts/AuthContext';
import type { QnA } from '../../types';

const QnAForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as 'general' | 'service' | 'technical' | 'account',
    isSecret: false,
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/auth/login');
      return;
    }

    if (isEditMode && id) {
      fetchQnA();
    }
  }, [id, user]);

  const fetchQnA = async () => {
    if (!id) return;

    try {
      const data = await getQnaById(id);
      if (!data) {
        alert('존재하지 않는 게시글입니다.');
        navigate('/board/qna');
        return;
      }

      // 작성자 또는 관리자만 수정 가능
      if (user?.uid !== data.authorId && user?.role !== 'admin') {
        alert('수정 권한이 없습니다.');
        navigate('/board/qna');
        return;
      }

      setFormData({
        title: data.title,
        content: data.content,
        category: data.category,
        isSecret: data.isSecret,
      });
    } catch (error) {
      console.error('Error fetching QnA:', error);
      alert('게시글을 불러오는 데 실패했습니다.');
      navigate('/board/qna');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      if (isEditMode && id) {
        // 수정
        await updateQna(id, {
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category,
          isSecret: formData.isSecret,
        });
        alert('게시글이 수정되었습니다.');
        navigate(`/board/qna/${id}`);
      } else {
        // 새 글 작성
        const qnaId = await createQna({
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category,
          authorId: user.uid,
          authorName: user.displayName || '익명',
          authorEmail: user.email || '',
          isSecret: formData.isSecret,
          isAnswered: false,
          views: 0,
          comments: [],
        });
        alert('게시글이 등록되었습니다.');
        navigate(`/board/qna/${qnaId}`);
      }
    } catch (error) {
      console.error('Error saving QnA:', error);
      alert(isEditMode ? '게시글 수정에 실패했습니다.' : '게시글 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="section container-custom max-w-4xl">
        <button
          onClick={() => navigate('/board/qna')}
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          목록으로
        </button>

        <div className="card p-8">
          <h1 className="text-3xl font-bold mb-8">
            {isEditMode ? 'Q&A 수정' : 'Q&A 작성'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 카테고리 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="general">일반문의</option>
                <option value="service">서비스문의</option>
                <option value="technical">기술문의</option>
                <option value="account">계정문의</option>
              </select>
            </div>

            {/* 제목 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {/* 내용 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="질문 내용을 상세히 입력해주세요"
                rows={15}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                required
              />
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                최소 10자 이상 입력해주세요.
              </p>
            </div>

            {/* 비밀글 설정 */}
            <div className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <input
                type="checkbox"
                id="isSecret"
                name="isSecret"
                checked={formData.isSecret}
                onChange={handleChange}
                className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isSecret" className="flex items-center gap-2 cursor-pointer">
                <Lock className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                <span className="font-medium">비밀글로 설정</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  (작성자와 관리자만 볼 수 있습니다)
                </span>
              </label>
            </div>

            {/* 버튼 */}
            <div className="flex items-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? '처리 중...' : isEditMode ? '수정하기' : '등록하기'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/board/qna')}
                className="btn btn-outline flex-1"
              >
                취소
              </button>
            </div>
          </form>
        </div>

        {/* 안내 사항 */}
        <div className="card p-6 mt-6 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600">
          <h3 className="font-bold mb-2">💡 작성 시 유의사항</h3>
          <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
            <li>• 구체적이고 명확한 질문을 작성해주세요.</li>
            <li>• 개인정보는 비밀글로 설정한 후 작성해주세요.</li>
            <li>• 관리자 답변은 영업일 기준 1-2일 소요됩니다.</li>
            <li>• 비방, 욕설 등 부적절한 내용은 삭제될 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QnAForm;
