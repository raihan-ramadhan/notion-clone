"use client";

import { preventBubbling } from "@/lib/utils";
import {
  Children,
  MouseEventHandler,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";

interface PreventBubblingClientProps {
  children:
    | ReactElement<{ onClick: MouseEventHandler<HTMLElement> | undefined }>
    | ReactElement<{
        onClick: MouseEventHandler<HTMLElement> | undefined;
      }>[];
}

const PreventBubblingClient: React.FC<PreventBubblingClientProps> = ({
  children,
}) => {
  const childrenWithOnClick = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        onClick: preventBubbling,
      });
    }
    return child;
  });

  return <>{childrenWithOnClick}</>;
};

export default PreventBubblingClient;
