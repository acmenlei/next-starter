import { cn } from "@/lib/utils";
import { useDebounceFn } from "ahooks";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

type MarkdownNavBarProps = {
  data?: any;
  // data?: API.CourseArticleVO;
  renderContainer?: string;
  scroller?: HTMLElement | null;
};

type HeadingItem = {
  level: number;
  text: string;
  hash: string;
  node: HTMLHeadingElement;
};

const GAP_DISTANCE = 60; // 距离

/**
 * markdown目录
 * @param props
 * @returns
 */
export default function MarkdownNavBar(props: MarkdownNavBarProps) {
  const { data, scroller, renderContainer } = props;
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [curHeading, setCurHeading] = useState<HeadingItem>();
  const [isClickScrolling, setIsClickScrolling] = useState(false);
  const clickLockTimerRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const maxLevel = headings.reduce(
    (min, heading) => Math.min(min, heading.level),
    Infinity
  ); // 最大的标题
  /**
   * 获取可以滚动的容器
   */
  const getCanScrollContainer = useCallback((): HTMLElement | Window | null => {
    if (scroller) {
      const inner = (scroller as HTMLElement).querySelector?.(
        ".scroll-container"
      ) as HTMLElement | null;
      return inner || scroller;
    }
    if (renderContainer) {
      const renderWrapper = document.querySelector(
        renderContainer as string
      ) as HTMLElement | null;
      let el: HTMLElement | null = renderWrapper;
      while (el) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          return el;
        }
        el = el.parentElement as HTMLElement | null;
      }
      // 兜底：尝试特定类名容器
      const courseContent = document.querySelector(
        ".course-content"
      ) as HTMLElement | null;
      if (courseContent) return courseContent;
    }
    return window;
  }, [scroller, renderContainer]);

  /**
   * 滚动到目标元素
   */
  const scrollTo = useCallback((heading: HeadingItem) => {
    // 点击滚动时短暂锁定，避免监听回写为上一个标题
    setIsClickScrolling(true);
    if (clickLockTimerRef.current) {
      window.clearTimeout(clickLockTimerRef.current);
    }
    heading.node.scrollIntoView();
    setCurHeading(heading);
    clickLockTimerRef.current = window.setTimeout(() => {
      setIsClickScrolling(false);
    }, 400);
  }, []);
  /**
   * 初始化目录结构
   */
  const initHeadings = useCallback(() => {
    // 设置渲染容器的对应标题
    setTimeout(() => {
      if (renderContainer) {
        const curHeadings: HeadingItem[] = [];
        const renderWrapper = document.querySelector(renderContainer as string);
        const allRenderHeadings =
          renderWrapper?.querySelectorAll("h1,h2,h3,h4");
        allRenderHeadings?.forEach((heading, idx) => {
          // 计算每个标题距离顶部的距离
          const level = parseInt(heading.tagName.slice(1));
          const text = heading.textContent ?? "";
          const hash = `heading-${idx}`;
          curHeadings.push({
            level,
            text,
            hash,
            node: heading as HTMLHeadingElement,
          });
        });
        setHeadings(curHeadings);
      } else {
        throw new Error("renderContainer is required");
      }
    });
  }, [renderContainer]);

  const { run: scrollListener } = useDebounceFn(
    () => {
      if (isClickScrolling) return;
      const entries: { node: HeadingItem; top: number }[] = headings.map(
        (heading) => ({
          node: heading,
          top: heading.node.getBoundingClientRect().top,
        })
      );

      // 优先选择视口内且距离顶部最近的标题
      const positiveSorted = entries
        .filter((e) => e.top >= 0)
        .sort((a, b) => a.top - b.top);

      let shouldFocusHeading =
        positiveSorted[0] && positiveSorted[0].top <= GAP_DISTANCE
          ? positiveSorted[0].node
          : undefined;

      // 若视口内没有满足阈值的标题，则退回到最近的上一个（top < 0 且最接近 0）
      if (!shouldFocusHeading) {
        const negativeSorted = entries
          .filter((e) => e.top < 0)
          .sort((a, b) => b.top - a.top);
        shouldFocusHeading =
          negativeSorted[0]?.node ??
          entries.sort((a, b) => Math.abs(a.top) - Math.abs(b.top))[0]?.node;
      }

      if (shouldFocusHeading?.hash === curHeading?.hash) {
        return;
      }
      setCurHeading(shouldFocusHeading);
    },
    { wait: 100 }
  );

  useEffect(() => {
    initHeadings();
    const target = getCanScrollContainer();
    target?.addEventListener("scroll", scrollListener as any);
    // 初始化时也计算一次，确保进入页面就高亮
    scrollListener();

    return () => {
      target?.removeEventListener("scroll", scrollListener as any);
      if (clickLockTimerRef.current) {
        window.clearTimeout(clickLockTimerRef.current);
        clickLockTimerRef.current = null;
      }
    };
  }, [
    data?.content,
    getCanScrollContainer,
    initHeadings,
    renderContainer,
    scrollListener,
    scroller,
  ]);

  useEffect(() => {
    setCurHeading(undefined);
  }, [data?.id]);

  // 目录项高亮变化时，让它滚动到可视区域
  useEffect(() => {
    if (!curHeading || !navRef.current) return;
    const activeEl = navRef.current.querySelector(
      `li[data-hash="${curHeading.hash}"]`
    ) as HTMLElement | null;
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [curHeading]);

  return (
    // 当前高亮的边框样式
    // after:absolute after:-left-[0px] after:h-full after:w-[2px] after:bg-primary after:top-0
    <nav
      ref={navRef}
      className={clsx(
        `markdown-navigation max-level-${maxLevel}`,
        headings.length && "pb-1"
      )}
    >
      <ul className="">
        {headings.map((heading) => {
          return (
            <li
              key={heading.hash}
              data-hash={heading.hash}
              className={cn(
                "text-sm pr-1.5 mb-1.5 last:mb-0 cursor-pointer relative "
              )}
              onClick={() => scrollTo(heading)}
            >
              <div
                className={cn(
                  `text-ellipsis-1 title-anchor title-level${
                    heading.level - maxLevel + 1
                  }`,
                  curHeading?.hash === heading.hash
                    ? "!text-primary font-bold"
                    : "!text-black/60",
                  "hover:!text-primary"
                )}
              >
                {heading.text}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
