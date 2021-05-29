export interface IDragTarget {
  dragOverHandler?(e: DragEvent): void;
  dropHandler?(e: DragEvent): void;
  dragLeaveHandler?(e: DragEvent): void;
}
