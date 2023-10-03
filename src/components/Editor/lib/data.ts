import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "@radix-ui/react-icons";

export const nodes = [
  { type: "paragraph", label: "Text" },
  { type: "h1", label: "Heading 1" },
  { type: "h2", label: "Heading 2" },
  { type: "h3", label: "Heading 3" },
  { type: "taskList", label: "To-do list" },
  { type: "bulletList", label: "Bulleted list" },
  { type: "orderedList", label: "Numbered list" },
  { type: "codeBlock", label: "Code" },
  { type: "blockquote", label: "Quote" },
] as const;

type NodeLabels = {
  // eslint-disable-next-line no-unused-vars
  [K in (typeof nodes)[number]["type"]]: (typeof nodes)[number]["label"];
};
export const EnumNodesTypeLabel: NodeLabels = nodes.reduce((acc, node) => {
  acc[node.type] = node.label;
  return acc;
}, {} as NodeLabels);

export type NodeType = (typeof nodes)[number]["type"];

export const NodeTypeEnum: { [key in NodeType]: key } = nodes.reduce(
  (acc, node) => {
    // @ts-ignore
    acc[node.type] = node.type;
    return acc;
  },
  {} as { [key in NodeType]: key }
);

export const marks = [
  { type: "bold", toggleKeyword: "toggleBold", icon: FontBoldIcon },
  { type: "italic", toggleKeyword: "toggleItalic", icon: FontItalicIcon },
  { type: "underline", toggleKeyword: "toggleUnderline", icon: UnderlineIcon },
  { type: "strike", toggleKeyword: "toggleStrike", icon: StrikethroughIcon },
  { type: "code", toggleKeyword: "toggleCode", icon: CodeIcon },
] as const;

export const colors = [
  { label: "Gray", value: "#6b7280" },
  { label: "Brown", value: "#7c2d12" },
  { label: "Orange", value: "#f97316" },
  { label: "Yellow", value: "#eab308" },
  { label: "Green", value: "#22c55e" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Purple", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
  { label: "Red", value: "#ef4444" },
] as const;

export type TextColor = (typeof colors)[number]["label"];
