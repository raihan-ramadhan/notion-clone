import { mergeAttributes } from "@tiptap/react";
import SlashCommand from "@/components/Editor/SlashCommand";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Heading from "@tiptap/extension-heading";

export const TiptapExtensions = [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "m-0 py-1",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-gray-300 pl-4",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-200 p-5 font-mono font-medium text-gray-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-gray-200 px-1.5 py-1 font-mono font-medium text-black",
      },
    },
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    horizontalRule: false,
    heading: false,
  }),
  Heading.configure({ levels: [1, 2, 3] }).extend({
    levels: [1, 2, 3],
    renderHTML({ node, HTMLAttributes }) {
      const headingClasses = {
        1: "text-4xl",
        2: "text-2xl",
        3: "text-xl",
        4: "text-lg",
        5: "text-sm",
      };

      type Level = keyof typeof headingClasses;

      const level = (
        this.options.levels.includes(node.attrs.level)
          ? node.attrs.level
          : this.options.levels[0]
      ) as Level;

      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${headingClasses[level]} !m-0 py-3`,
        }),
        0,
      ];
    },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose",
    },
  }),
  TaskItem.configure({}).extend({
    renderHTML({ node, HTMLAttributes }) {
      // console.log("this", this.parent);
      return [
        "li",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          "data-checked": HTMLAttributes["data-checked"] ? "true" : "false",
        }),
        [
          "label",
          [
            "input",
            {
              type: "checkbox",
              checked: node.attrs.checked ? "checked" : null,
            },
          ],
          ["span"],
        ],
        ["div", 0],
      ];
    },
  }),
];

export const TipTapEditorExtensions = [
  ...TiptapExtensions,
  Placeholder.configure({
    // Not sure what the type of node is, so I'm using any
    // eslint-disable-next-line no-unused-vars
    placeholder: ({ node }: any) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }

      return "Press '/' for commands, or enter some text...";
    },
  }),
  SlashCommand,
];
