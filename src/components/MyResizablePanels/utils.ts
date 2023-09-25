import { InitialDragState, ResizeEvent } from "./types";

function isMouseEvent(event: ResizeEvent): event is MouseEvent {
  return event.type.startsWith("mouse");
}

function isTouchEvent(event: ResizeEvent): event is TouchEvent {
  return event.type.startsWith("touch");
}

function getResizeHandle(id: string): HTMLDivElement | null {
  const element = document.querySelector(
    `[data-panel-resize-handle-id="${id}"]`
  );
  if (element) {
    return element as HTMLDivElement;
  }
  return null;
}

function getDragOffset(
  event: ResizeEvent,
  id: string,
  initialOffset: number = 0,
  initialHandleElementRect: DOMRect | null = null
): number {
  const isHorizontal = true;

  let pointerOffset = 0;
  if (isMouseEvent(event)) {
    pointerOffset = event.clientX;
  } else if (isTouchEvent(event)) {
    const firstTouch = event.touches[0];
    pointerOffset = firstTouch.screenX;
  } else {
    return 0;
  }

  const handleElement = getResizeHandle(id)!;
  const rect =
    initialHandleElementRect || handleElement.getBoundingClientRect();
  const elementOffset = isHorizontal ? rect.left : rect.top;

  return pointerOffset - elementOffset - initialOffset;
}

export function getMovement(
  event: ResizeEvent,
  id: string,
  initialDragState: InitialDragState | null
): number {
  const { dragOffset = 0, dragHandleRect } = initialDragState || {};

  return getDragOffset(event, id, dragOffset, dragHandleRect);
}
