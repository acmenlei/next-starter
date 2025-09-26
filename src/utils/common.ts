/**
 * 判断文章中是否存在目录
 * @param content Markdown内容
 * @returns boolean
 */
export const hasCatalogue = (content: string): boolean => {
  // 匹配Markdown标题的正则表达式
  const markdownTitleRegex = /^(\s*)(#{1,6})\s+(.+)$/gm;
  // 匹配HTML标题标签的正则表达式
  const htmlTitleRegex = /<h[1-6][^>]*>.*?<\/h[1-6]>/gi;
  // 检查是否存在匹配的Markdown标题或HTML标题标签
  return markdownTitleRegex.test(content) || htmlTitleRegex.test(content);
};
