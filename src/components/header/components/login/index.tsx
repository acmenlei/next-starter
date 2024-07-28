"use client";

import { Button } from "@/components/ui/button";
import { showLogin } from "@/utils/modal";

type LoginTriggerProps = {};

/**
 * 登录触发按钮
 * @param props 
 * @returns 
 */
export default function LoginTrigger(props: LoginTriggerProps) {
  return <Button onClick={showLogin}>登录</Button>;
}
