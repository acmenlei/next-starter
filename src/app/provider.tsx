"use client";

import NiceModal from "@ebay/nice-modal-react";
import { ReactNode } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

/**
 * 全局的 Provider【可以将需要传递的数据放在此处，后续不需要写重复代码，比如弹框等】
 * @param param0 
 * @returns 
 */
export default function GlobalProvider({ children }: GlobalProviderProps) {
  /* children 为服务端渲染的产物 */
  return <NiceModal.Provider>{children}</NiceModal.Provider>;
}
