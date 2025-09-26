import MdViewer from "@/components/MdViewer";
import { mockValue } from "@/constants/mock";
import Toc from "./index/components/Toc";

/**
 * 首页
 * @returns
 */
export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-112px)]flex-col items-center justify-between">
      <div className="p-4 w-full flex">
        <div className="max-w-3xl mx-auto course-container">
          <MdViewer value={mockValue} className="prose-base" />
        </div>
        <div className="fixed right-0 top-20">
          <Toc article={{ content: mockValue }} />
        </div>
      </div>
    </main>
  );
}
