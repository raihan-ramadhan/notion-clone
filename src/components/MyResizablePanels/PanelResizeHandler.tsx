import {
  ComponentPropsWithRef,
  useCallback,
  useState,
  useRef,
  useEffect,
  TouchEvent,
} from "react";
import { usePanelGroupContext } from "./PanelContext";
import { ResizeEvent, ResizeHandler } from "./types";

type PanelResizeHandlerProps = Omit<
  ComponentPropsWithRef<"div"> & {
    disabled?: boolean;
    onDragging?: () => void;
    id: string;
  },
  "children"
>;

const PanelResizeHandler: React.FC<PanelResizeHandlerProps> = ({
  className,
  disabled = false,
  onDragging,
  style,
  id,
}) => {
  const divElementRef = useRef<HTMLDivElement>(null);

  const { startDragging, stopDragging, isDragging, registerResizeHandle } =
    usePanelGroupContext();

  const [isFocused, setIsFocused] = useState(false);
  const [resizeHandler, setResizeHandler] = useState<ResizeHandler | null>(
    null
  );

  const stopDraggingAndBlur = useCallback(() => {
    // Clicking on the drag handle shouldn't leave it focused;
    // That would cause the PanelGroup to think it was still active.
    const div = divElementRef.current!;
    div.blur();

    stopDragging();

    const { onDragging } = callbacksRef.current;
    if (onDragging) onDragging();
  }, [stopDragging]);

  // Use a ref to guard against users passing inline props
  const callbacksRef = useRef<{
    onDragging: (() => void) | undefined;
  }>({ onDragging });
  useEffect(() => {
    callbacksRef.current.onDragging = onDragging;
  });

  useEffect(() => {
    if (disabled) {
      setResizeHandler(null);
    } else {
      const resizeHandler = registerResizeHandle(id);
      setResizeHandler(() => resizeHandler);
    }
  }, [disabled, registerResizeHandle, id]);

  useEffect(() => {
    if (disabled || resizeHandler == null || !isDragging) {
      return;
    }

    const onMove = (event: ResizeEvent) => {
      resizeHandler(event);
    };

    const onMouseLeave = (event: MouseEvent) => {
      resizeHandler(event);
    };

    const divElement = divElementRef.current!;
    const targetDocument = divElement.ownerDocument;

    targetDocument.body.addEventListener("contextmenu", stopDraggingAndBlur);
    targetDocument.body.addEventListener("mousemove", onMove);
    targetDocument.body.addEventListener("touchmove", onMove);
    targetDocument.body.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseup", stopDraggingAndBlur);
    window.addEventListener("touchend", stopDraggingAndBlur);

    return () => {
      targetDocument.body.removeEventListener(
        "contextmenu",
        stopDraggingAndBlur
      );
      targetDocument.body.removeEventListener("mousemove", onMove);
      targetDocument.body.removeEventListener("touchmove", onMove);
      targetDocument.body.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseup", stopDraggingAndBlur);
      window.removeEventListener("touchend", stopDraggingAndBlur);
    };
  }, [disabled, isDragging, resizeHandler, stopDraggingAndBlur]);

  return (
    <div
      data-panel-resize-handle-id={id}
      ref={divElementRef}
      data-resize-handle-active={
        isDragging ? "pointer" : isFocused ? "keyboard" : undefined
      }
      onMouseDown={(e) => {
        startDragging(e.nativeEvent);

        const { onDragging } = callbacksRef?.current;
        if (onDragging) onDragging();
      }}
      onMouseUp={stopDraggingAndBlur}
      onTouchEnd={stopDraggingAndBlur}
      onTouchCancel={stopDraggingAndBlur}
      onTouchStart={(event: TouchEvent) => {
        startDragging(event.nativeEvent);

        const { onDragging } = callbacksRef?.current;
        if (onDragging) onDragging();
      }}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      role="separator"
      tabIndex={0}
      className={className}
      style={{
        cursor: "e-resize",
        pointerEvents: disabled ? "none" : "auto",
        display: disabled ? "none" : undefined,
        touchAction: "none",
        userSelect: "none",
        ...style,
      }}
    />
  );
};

export default PanelResizeHandler;
