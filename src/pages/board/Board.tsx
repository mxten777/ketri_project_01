 
const Board = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-16 lg:py-24">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">회사소식</h1>
          <p className="text-lg">회사의 새로운 소식과 자료를 확인하세요</p>
        </div>
      </div>

      <div className="section container-custom">
        <div className="card p-8">
          <h2 className="heading-md mb-6">회사소식</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            회사의 최신 소식과 다양한 자료를 확인하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board;
