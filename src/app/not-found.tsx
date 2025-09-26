import { Metadata } from "next";
import Link from "next/link";
import * as React from "react";

export const metadata: Metadata = {
  title: "页面走丢了 - 404",
  description: "抱歉，您访问的页面不存在",
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-112px)] flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
          页面走丢了
        </h2>
        <Link
          href="/"
          className="bg-primary text-white px-4 py-2 rounded-md hover:underline"
        >
          回到首页
        </Link>
      </div>
    </main>
  );
}
