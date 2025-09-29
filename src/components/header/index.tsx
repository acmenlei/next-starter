import * as React from "react";
import LoginTrigger from "./components/login";
import Navgation from "./components/nav";
import ThemeToggle from "../ThemeToggle";

type GlobalHeaderProps = {};

/**
 * 默认的头部导航
 * @param props
 * @returns
 */
export default function GlobalHeader(props: GlobalHeaderProps) {
  return (
    <div className="flex h-14 shadow py-1 px-4 justify-between items-center sticky top-0 z-10 bg-background">
      <Navgation />
      <div className="flex items-center gap-2">
        <LoginTrigger />
        <ThemeToggle />
      </div>
    </div>
  );
}
