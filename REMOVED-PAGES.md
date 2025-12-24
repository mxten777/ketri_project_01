# REMOVED / BLOCKED PAGES (Phase 1)

이 파일은 라우터(`src/App.tsx`)에 더 이상 등록되지 않은 경로들에 대해 "접근 차단"(UI 네비게이션 제거/무력화)을 수행한 기록입니다.

원칙: 라우터가 Source of Truth입니다. 파일은 보존하되, UI/네비게이션에서 접근 불가하도록 조치했습니다.

- src/pages/board/QnAList.tsx
  - status: present (file kept)
  - action: 모든 `navigate("/board/qna*")` 호출 및 리스트 아이템 클릭 무력화 (noop) — 사용자가 접근 불가하도록 처리됨

- src/pages/board/QnAForm.tsx
  - status: present
  - action: `navigate("/board/qna")` 및 상세 리다이렉트 호출을 `/`로 대체

- src/pages/board/QnADetail.tsx
  - status: present
  - action: `navigate("/board/qna")` 및 관련 `Link to="/board/qna"`를 `/`로 대체

- src/pages/board/FreeList.tsx
  - status: present
  - action: 게시글 등록 버튼 및 아이템 클릭의 `navigate("/board/free*")` 호출을 noop 처리 (무력화)

- src/pages/board/FreeForm.tsx
  - status: present
  - action: `navigate("/board/free")` 및 작성 후 리다이렉트 호출을 `/`로 대체

- src/pages/board/FreeDetail.tsx
  - status: present
  - action: 모든 `navigate("/board/free")` 호출 및 편집 이동 호출을 `/`로 대체

- src/pages/board/Board.tsx
  - status: present
  - action: 파일 보존 (라우터에 미등록)

Notes:
- 검색 모달(`src/components/common/SearchModal.tsx`)에서 QnA 검색 결과 클릭 시 `/board/qna/:id`로 이동하던 동작을 `/`로 대체했습니다.
- `src/App.tsx` 라우터는 변경하지 않았습니다.
- 2단계(Phase 2)에서는 위 파일 중 실제 삭제 여부 또는 라우터 추가 여부를 검토할 예정입니다.

If you want these files deleted in a batch PR, tell me and I will prepare a PR (Phase 2 action).