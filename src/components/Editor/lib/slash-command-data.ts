import { createElement } from "react";
import { Editor, Range } from "@tiptap/core";

interface Command {
  editor: Editor;
  range: Range;
}

function createElementNextImage(image: string, alt: string, sizes: number) {
  return createElement(
    // @ts-expect-error
    require.resolve("next/image").default,
    {
      src: `/images/commands/${image}`,
      alt,
      className: `w-[${sizes}px] h-[${sizes}px]`,
      width: sizes,
      height: sizes,
    },
    null
  );
}

export const slashNodes = [
  {
    title: "Text",
    description: "Just start typing with plain text.",
    icon: createElementNextImage("text.png", "text", 46),
    tooltipSrc: "/images/commands/tooltip-text.png",
    command: ({ editor, range }: Command) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    tooltipSrc: "/images/commands/tooltip-to-do.png",
    icon: createElementNextImage("to-do.png", "to-do list", 46),
    command: ({ editor, range }: Command) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    tooltipSrc: "/images/commands/tooltip-header.png",
    icon: createElementNextImage("header.png", "header", 46),
    command: ({ editor, range }: Command) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    tooltipSrc: "/images/commands/tooltip-subheader.png",
    icon: createElementNextImage("subheader.png", "subheader", 46),
    command: ({ editor, range }: Command) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    tooltipSrc: "/images/commands/tooltip-subsubheader.png",
    icon: createElementNextImage("subsubheader.png", "subsubheader", 46),
    command: ({ editor, range }: Command) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    tooltipSrc: "/images/commands/tooltip-bulleted-list.png",
    icon: createElementNextImage("bulleted-list.png", "bulleted list", 46),
    command: ({ editor, range }: Command) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    tooltipSrc: "/images/commands/tooltip-numbered-list.png",
    icon: createElementNextImage("numbered-list.png", "numbered list", 46),
    command: ({ editor, range }: Command) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    tooltipSrc: "/images/commands/tooltip-quote.png",
    icon: createElementNextImage("quote.png", "quote", 46),
    command: ({ editor, range }: Command) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
      editor.chain().focus().deleteRange(range).setBlockquote().run();
    },
  },
  {
    title: "Divider",
    description: "Visually divide blocks.",
    tooltipSrc: "/images/commands/tooltip-divider.png",
    icon: createElementNextImage("divider.png", "horizontal line", 46),
    command: ({ editor, range }: Command) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    tooltipSrc: "/images/commands/tooltip-code.png",
    icon: createElementNextImage("code.png", "code", 46),
    command: ({ editor, range }: Command) => {
      editor.chain().focus().deleteRange(range).setCodeBlock().run();
    },
  },
] as const;
