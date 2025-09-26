"use client";

import MarkdownNav from "@/components/MarkdownNav";
import React, { useState } from "react";

type Props = {
  article: any;
};

const Toc: React.FC<Props> = (props) => {
  const [showToc, setShowToc] = useState(true);
  const { article } = props;

  return (
    <MarkdownNav
      data={article}
      visible={showToc}
      renderContainer=".course-container"
      onVisibleChange={setShowToc}
    />
  );
};

export default Toc;
