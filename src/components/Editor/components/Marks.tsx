import React from "react";
import { marks } from "../lib/data";
import { Editor } from "@tiptap/react";

interface MarksProps {
  editor: Editor;
}

const Marks: React.FC<MarksProps> = ({ editor }) => {
  return (
    <React.Fragment>
      {marks.map(({ type, icon: Icon, toggleKeyword }, idx) => (
        <button
          key={idx}
          type="button"
          className={"py-1 px-2 hover:bg-accent shrink-0"}
          onClick={() => editor.chain().focus()[toggleKeyword]().run()}
        >
          <Icon
            className={`pointer-events-none h-5 w-5 ${
              editor.isActive(type) ? "text-blue-400" : "text-primary"
            }`}
          />
        </button>
      ))}
    </React.Fragment>
  );
};

export default Marks;
