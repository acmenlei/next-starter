import { mockValue } from "@/constants/mock";
import CommonPostLayout from "@/components/CommonPostLayout";

/**
 * 首页
 * @returns
 */
export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-112px)]flex-col items-center justify-between">
      <CommonPostLayout value={mockValue} />
    </main>
  );
}
