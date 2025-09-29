import React from "react";
import MdViewer from "../MdViewer";
import Toc from "@/app/index/components/Toc";

type Props = {
  value: string;
};

/**
 * 通用文章布局
 * @param props
 * @returns
 */
const CommonPostLayout: React.FC<Props> = (props) => {
  const { value } = props;
  return (
    <div className="p-4 w-full flex items-start gap-4">
      <div className="max-w-3xl mx-auto course-container">
        <MdViewer value={value} className="prose-base" />
      </div>
      <div className="sticky right-0 top-20 shrink-0 md:block hidden">
        <Toc article={{ content: value }} />
      </div>
    </div>
  );
};

export default CommonPostLayout;
