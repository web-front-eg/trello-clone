export interface IDraggable {
  onDragStart?(e: DragEvent): void;
  onDragEnd?(e: DragEvent): void;
}
