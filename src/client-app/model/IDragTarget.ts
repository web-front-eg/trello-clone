export interface IDragTarget {
  onDragOver?(e: DragEvent): void;
  onDrop?(e: DragEvent): void;
  onDragLeave?(e: DragEvent): void;
}
