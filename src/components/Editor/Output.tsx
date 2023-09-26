"use client";

import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import { useMemo } from "react";
import { TipTapPreviewViewer } from "./utils";
import { TipTapEditorProps } from "./props";

interface OutputProos {
  editorJson: JSONContent;
}

const Output: React.FC<OutputProos> = ({ editorJson }) => {
  const output = useMemo(() => {
    return generateHTML(editorJson, TiptapExtensions);
  }, [editorJson]);

  return (
    <div className="w-full cursor-text flex-1 px-10 md:px-24 pb-16">
      <div className="w-full max-w-[708px] mx-auto h-full">
        <TipTapPreviewViewer
          html={output}
          // @ts-ignore
          className={TipTapEditorProps.attributes.class}
        />
      </div>
    </div>
  );
};

export default Output;
