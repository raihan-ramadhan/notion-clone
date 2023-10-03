"use client";

import React, { useRef } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import DropdownStyle from "../components/DropdownStyle";
import DropdownNode from "../components/DropdownNode";
import Marks from "../components/Marks";
import { TextSelection } from "prosemirror-state";

import "tippy.js/animations/scale-subtle.css";
import { NodeTypeEnum } from "../lib/data";
import DropdownLinkInput from "../components/DropdownLinkInput";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!editor) return null;
  // radix-dropdown-menu-content-transform-origin
  return (
    <React.Fragment>
      <BubbleMenu
        className="text-menu-shadow z-[999999] bg-background rounded-md w-max cursor-auto"
        editor={editor}
        tippyOptions={{
          popperOptions: {
            modifiers: [{ name: "eventListeners", options: { scroll: true } }],
          },
          duration: 100,
          animation: "scale-subtle",
        }}
        pluginKey={"TextMenu"}
        // eslint-disable-next-line no-unused-vars
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // return true or false to decide show BubbleMenu or not

          const selection = editor.state.selection;
          const isTextSelection = selection instanceof TextSelection;

          if (
            isTextSelection &&
            selection.ranges[0].$from.pos == selection.ranges[0].$to.pos
          ) {
            return false;
          }

          if (isTextSelection) {
            // *no need in order (i think.. i'm not sure, this is my first time using this library)*
            // prettier-ignore
            return (
                editor.isActive("heading") ||
                (!editor.isActive("figure") && editor.isActive(NodeTypeEnum.blockquote)) ||
                (!editor.isActive("figure") && editor.isActive(NodeTypeEnum.bulletList)) ||
                (!editor.isActive("figure") && editor.isActive(NodeTypeEnum.orderedList)) ||
                (!editor.isActive("figure") && editor.isActive(NodeTypeEnum.taskList)) ||
                editor.isActive(NodeTypeEnum.paragraph) ||
                editor.isActive(NodeTypeEnum.codeBlock)
              );
          } else {
            return false;
          }
        }}
      >
        <div ref={containerRef} className="cursor-auto z-10 w-fit relative">
          <div className="flex">
            <DropdownNode container={containerRef.current} editor={editor} />
            <div className="bg-accent w-[1px] shrink-0" />
            <DropdownLinkInput
              container={containerRef.current}
              editor={editor}
            />

            <div className="bg-accent w-[1px] shrink-0" />
            <Marks editor={editor} />
            <DropdownStyle container={containerRef.current} editor={editor} />
          </div>
        </div>
      </BubbleMenu>
    </React.Fragment>
  );
};

export default MenuBar;
