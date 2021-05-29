export interface IDraggable {
  dragStartHandler?(e: DragEvent): void;
  dragEndHandler?(e: DragEvent): void;
}
