export type ResizeEvent = KeyboardEvent | MouseEvent | TouchEvent;
// eslint-disable-next-line no-unused-vars
export type ResizeHandler = (event: ResizeEvent) => void;

export type InitialDragState = {
  dragHandleRect: DOMRect;
  dragOffset: number;
  sizes: number[];
};
