import { CSSProperties, createElement } from "react";

type TipTapViewerProps = {
  style?: CSSProperties;
  className?: string;
  html?: string;
};

export const TipTapPreviewViewer = ({
  className,
  style,
  html,
}: TipTapViewerProps) => {
  return html
    ? createElement("div", {
        dangerouslySetInnerHTML: { __html: html },
        className: `ProseMirror ${className}`,
        style,
      })
    : null;
};
