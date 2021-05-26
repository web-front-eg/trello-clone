// Drag & Drop Interfaces
export interface IDraggable {
  dragStartHandler?(e: DragEvent): void;
  dragEndHandler?(e: DragEvent): void;
}

export interface IDragTarget {
  dragOverHandler?(e: DragEvent): void;
  dropHandler?(e: DragEvent): void;
  dragLeaveHandler?(e: DragEvent): void;
}
