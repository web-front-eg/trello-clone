import { DragDrop } from "./DragDrop.js";

/**
 * bind helper of added-card to drag functionality
 */
export class ListDragDrop {
  constructor(private readonly dropTargetAddedListEl: HTMLDivElement) {
    this.bind();
  }

  private bind() {
    this.dropTargetAddedListEl.addEventListener(
      "dragover",
      DragDrop.onDragOver
    );
    this.dropTargetAddedListEl.addEventListener("drop", DragDrop.onDrop);
  }
}
