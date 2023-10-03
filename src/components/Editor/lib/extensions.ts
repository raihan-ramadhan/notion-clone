import { mergeAttributes } from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";

import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

export const TiptapExtensions = [
  Document,
  Text,
  Bold,
  Italic,
  Underline,
  Strike,
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  Paragraph.configure({
    HTMLAttributes: {
      class: "m-0 py-1",
    },
  }),
  Heading.extend({
    levels: [1, 2, 3],
    renderHTML({ node, HTMLAttributes }) {
      const headingClasses = {
        1: "text-4xl",
        2: "text-2xl",
        3: "text-xl",
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
          level,
        }),
        0,
      ];
    },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: `not-prose list-none pl-0 m-0 
              [&>li]:x-[flex,items-center,m-0,h-10]
              [&>li>div]:x-[flex,m-0]
              [&>li>label]:x-[h-5,items-center,select-none,m-0,w-[28px],shrink-0,grow-0,basis-[auto]] 
              [&>li_input]:x-[appearance-none,w-5,h-5,cursor-pointer,bg-background,relative,flex,justify-center,items-center]
              [&>li_div_p]:x-[m-0,pl-2]
              [&>li_input]:after:x-[text-primary-foreground,font-bold,absolute,inset-0,scale-0,flex,justify-center,items-center,transition-transform,content-['✔']]`,
    },
  }),
  TaskItem.extend({
    addOptions() {
      return {
        nested: true,
        taskListTypeName: "taskItem",
        HTMLAttributes: {
          class: `[&_div_p]:data-[checked=true]:x-[text-primary/50,line-through]
                  [&_input]:data-[checked=true]:x-[bg-sky-600,relative]
                  [&_input]:data-[checked=false]:x-[border-2,border-accent-foreground]
                  [&_input]:data-[checked=true]:after:scale-[0.8]`,
        },
      };
    },

    renderHTML({ node, HTMLAttributes }) {
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
  Code.configure({
    HTMLAttributes: {
      class:
        "rounded-md bg-gray-200 px-1.5 py-1 font-mono font-medium text-black",
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc list-outside leading-3",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal list-outside leading-3",
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: "leading-normal",
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: "plaintext",
    HTMLAttributes: {
      class: "bg-secondary",
    },
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: "border-l-4 border-gray-300 pl-4",
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class:
        "!underline text-slate-500 dark:!text-slate-400 [&>*]:!text-slate-500 dark:[&>*]:!text-slate-400",
    },
    validate: (href) => /^https?:\/\//.test(href),
  }),
];
