"use client";

import { Content, EditorContent, useEditor } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import { TipTapEditorProps } from "./props";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

interface OutputProos {
  editorJson: Content;
}

const Output: React.FC<OutputProos> = ({ editorJson }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);

  const editor = useEditor({
    editable: false,
    extensions: TiptapExtensions,
    editorProps: TipTapEditorProps,
    content: editorJson,
  });

  useEffect(() => {
    if (editor && !hydrated) {
      setHydrated(true);
    }
  }, [editor, hydrated]);

  if (!editorJson) return null;

  return (
    <div className="w-full cursor-text flex-1 px-10 md:px-24 pb-16">
      <div className="w-full max-w-[708px] mx-auto h-full">
        {hydrated ? <EditorContent editor={editor} /> : <Skeleton />}
      </div>
    </div>
  );
};

export default Output;
