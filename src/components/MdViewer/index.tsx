import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "@/styles/css/markdown.css";
import { cn } from "@/lib/utils";

type MdViewerProps = {
  value?: string;
  className?: string;
};

/**
 * 面试问题回答展示
 * @param props
 * @returns
 */
export default function MdViewer({ value, className }: MdViewerProps) {
  return (
    <div
      className={cn(
        "markdown-body prose-sm prose-blockquote: prose-headings:mt-2.5 prose-ul:pl-0 prose-code:bg-primary/5 prose-code:text-primary prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-p:mb-0 prose-headings:font-semibold prose-hr:my-2 prose-pre:mt-2 prose-pre:border prose-pre:rounded-md prose-pre:p-0 prose-pre:overflow-hidden",
        className
      )}
    >
      <Markdown rehypePlugins={[rehypeHighlight]}>{value}</Markdown>
    </div>
  );
}
