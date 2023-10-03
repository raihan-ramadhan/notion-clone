"use client";

import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";
import { TiptapExtensions } from "../lib/extensions";
import { useMemo } from "react";
import { TipTapPreviewViewer } from "../lib/utils";
import { TipTapEditorProps } from "../lib/props";

interface OutputProos {
  editorJson: JSONContent;
}

const EditorPreviewer: React.FC<OutputProos> = ({ editorJson }) => {
  const html = useMemo(() => {
    return generateHTML(editorJson, TiptapExtensions);
  }, [editorJson]);

  return (
    <div className="w-full cursor-text flex-1 px-10 md:px-24 pb-16">
      <div className="w-full max-w-[708px] mx-auto h-full">
        <TipTapPreviewViewer
          html={html}
          // @ts-ignore
          className={TipTapEditorProps.attributes.class}
        />
      </div>
    </div>
  );
};

export default EditorPreviewer;
