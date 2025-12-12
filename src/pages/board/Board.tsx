const Board = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">게시판</h1>
          <p className="text-lg">공지사항, 질문답변, 자료실</p>
        </div>
      </div>

      <div className="section container-custom">
        <div className="card p-8">
          <h2 className="heading-md mb-6">게시판</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            공지사항, 질문답변, 자료실 등을 이용하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board;
