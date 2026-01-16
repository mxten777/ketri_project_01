/**
 * PrintAllLayout - 인쇄 전용 레이아웃
 * 헤더/푸터 없이 순수 콘텐츠만 표시
 */

import { Outlet } from "react-router-dom";

export default function PrintAllLayout() {
  return (
    <div className="print-all-layout bg-white">
      <Outlet />
    </div>
  );
}
