import { TiptapExtensions } from "./extensions";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import Dropcursor from "@tiptap/extension-dropcursor";
import History from "@tiptap/extension-history";
import Placeholder from "@tiptap/extension-placeholder";

import SlashCommand from "@/components/Editor/custom-extensions/SlashCommand";

export const TipTapEditorExtensions = [
  ...TiptapExtensions,
  History.configure({
    depth: 20,
  }),
  Dropcursor.configure({
    color: "#7dd3fc",
    width: 2,
  }),
  HorizontalRule,
  Placeholder.configure({
    placeholder: ({ node }: any) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }

      return "Press '/' for commands, or enter some text...";
    },
  }),
  SlashCommand,
];
