import React, { useState } from "react";
import RenderNav from "./render";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import "./index.css";
import { hasCatalogue } from "@/utils/common";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Props {
  scroller?: React.RefObject<HTMLElement>;
  visible?: boolean;
  renderContainer?: string; // 渲染内容的容器
  data?: any;
  onVisibleChange?: (visible: boolean) => void;
}

/**
 * Markdown Toc 组件
 * @param props
 * @constructor
 */
const MarkdownNav: React.FC<Props> = (props) => {
  const { data, scroller, renderContainer, visible, onVisibleChange } = props;
  const [hoverStatus, setHoverStatus] = useState(false);
  // 仅展示markdown格式的文章，且有1~4级目录
  if (!data?.content) {
    return <></>;
  }

  if (!hasCatalogue(data?.content)) {
    return <></>;
  }

  const onMouseEnterHandler = () => {
    if (visible) {
      return;
    }
    setHoverStatus(true);
  };
  const onMouseLeaveHandler = () => {
    if (visible) {
      return;
    }
    setHoverStatus(false);
  };

  // 如果 visible 为 false，只显示切换按钮
  if (!visible) {
    return (
      <div className="fixed right-4 top-[100px] transform -translate-y-1/2 z-40">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => onVisibleChange?.(true)}
                className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <RiEyeLine className="text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>显示大纲</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div
      className={cn(
        !visible && !hoverStatus ? "w-[2px] cursor-pointer" : "w-[200px]"
      )}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className="text-sm flex items-center gap-1.5 ml-[18px] mb-2">
        <strong>大纲</strong>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => onVisibleChange?.(!visible)}
                className="p-1 rounded-sm hover:bg-black/5 cursor-pointer"
              >
                {!visible ? <RiEyeLine /> : <RiEyeOffLine />}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{visible ? "隐藏大纲" : "显示大纲"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative">
        {/* 空白 */}
        {!visible && !hoverStatus && (
          <div className="w-16 bg-transparent h-full top-0 absolute -left-16" />
        )}
        {/* 目录 */}
        <RenderNav
          data={data}
          renderContainer={renderContainer}
          scroller={scroller?.current}
        />
      </div>
    </div>
  );
};

export default MarkdownNav;
