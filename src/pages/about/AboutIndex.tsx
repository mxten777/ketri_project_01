import { Link } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { MENU_ITEMS } from "../../constants/menu";

export default function AboutIndex() {
  const group = MENU_ITEMS.find((g) => g.label === "연구소 소개");
  const items = group ? group.items : [];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <Container>
        <h1 className="text-display-sm font-bold mb-4">연구소 소개</h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6">연구소의 조직, 연혁, 보유장비 등을 한눈에 확인하실 수 있습니다.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <Link
              key={it.path}
              to={it.path}
              className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-md transition"
            >
              <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{it.label}</div>
              {it.description && <div className="text-xs text-neutral-500 mt-1">{it.description}</div>}
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
